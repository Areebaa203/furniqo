import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createAdminClient } from "@/utils/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  // In production, you'll need a STRIPE_WEBHOOK_SECRET in your .env.local
  // If not set, we'll bypass signature verification for local testing, 
  // but it's HIGHLY recommended to set it.
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  let event;

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // Fallback for local testing without webhook secret
      event = JSON.parse(body);
      console.warn("⚠️ Bypassing Stripe webhook signature verification because STRIPE_WEBHOOK_SECRET is not set.");
    }
  } catch (error) {
    console.error(`⚠️ Webhook Error: ${error.message}`);
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata?.orderId;
      console.log(`✅ Checkout Session completed for Order: ${orderId}`);
      
      if (orderId) {
        const supabase = await createAdminClient();
        
        // 1. Fetch current order to get checkout_details
        const { data: currentOrder } = await supabase
          .from('orders')
          .select('checkout_details, total')
          .eq('id', orderId)
          .single();

        const updatedDetails = currentOrder?.checkout_details || {};
        
        // Simplify payment display
        updatedDetails.paymentDisplay = `Card payment - $${Number(currentOrder?.total || 0).toFixed(2)}`;
        updatedDetails.statusMessage = "Payment confirmed. We're preparing your order for shipment.";
        updatedDetails.timelineDetail = `Updated ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

        // 2. Update the order status and JSONB details
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .update({ 
            payment_status: 'paid',
            status: 'processing',
            stripe_checkout_session_id: session.id,
            checkout_details: updatedDetails,
            updated_at: new Date().toISOString()
          })
          .eq('id', orderId)
          .select('customer_id, total')
          .single();

        if (orderError) {
          console.error(`❌ Error updating order ${orderId}:`, orderError);
        } else {
          console.log(`✅ Order ${orderId} marked as paid.`);
          
          // 3. Update customer stats if linked
          if (order.customer_id) {
            const { data: cust } = await supabase
              .from('customers')
              .select('total_spent, orders_count')
              .eq('id', order.customer_id)
              .single();
            
            if (cust) {
              await supabase
                .from('customers')
                .update({
                  total_spent: Number(cust.total_spent || 0) + Number(order.total),
                  orders_count: (cust.orders_count || 0) + 1
                })
                .eq('id', order.customer_id);
            }
          }
          
          // 4. Insert into transactions table
          const { error: trxError } = await supabase
            .from('transactions')
            .insert({
              transaction_number: `TRX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
              order_id: orderId,
              customer_id: order.customer_id,
              amount: order.total,
              type: 'sale',
              status: 'completed',
              method: session.payment_method_types?.[0] || 'card',
            });

          if (trxError) {
            console.error(`❌ Error creating transaction for order ${orderId}:`, trxError);
          }
        }
      }
      break;
    }

    case "checkout.session.async_payment_failed":
      const failedSession = event.data.object;
      console.log(`❌ Checkout Session payment failed: ${failedSession.id}`);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
