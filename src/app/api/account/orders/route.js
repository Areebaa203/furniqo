import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { createAccountOrderSchema } from "@/lib/validations/accountOrders";
import { generatePublicOrderNumber, mapOrderRowWithItems } from "@/lib/account/mapOrder";

/**
 * GET  — list orders for the signed-in storefront user (with line items)
 * POST — persist a new order + order_items (checkout)
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("[GET /api/account/orders] orders", ordersError);
      return NextResponse.json(
        { success: false, message: ordersError.message || "Failed to load orders" },
        { status: 500 }
      );
    }

    if (!orders?.length) {
      return NextResponse.json({ success: true, data: [] });
    }

    const ids = orders.map((o) => o.id);
    const { data: allItems, error: itemsError } = await supabase
      .from("order_items")
      .select("*")
      .in("order_id", ids);

    if (itemsError) {
      console.error("[GET /api/account/orders] items", itemsError);
      return NextResponse.json(
        { success: false, message: itemsError.message || "Failed to load order items" },
        { status: 500 }
      );
    }

    const byOrder = new Map();
    for (const row of allItems ?? []) {
      const list = byOrder.get(row.order_id) ?? [];
      list.push(row);
      byOrder.set(row.order_id, list);
    }

    const data = orders.map((o) => mapOrderRowWithItems(o, byOrder.get(o.id) ?? []));

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("[GET /api/account/orders]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createAccountOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 422 }
      );
    }

    const {
      lines,
      total,
      itemsCount,
      shippingCost = 0,
      discountAmount = 0,
      checkoutDetails = {},
    } = parsed.data;

    let orderNumber = generatePublicOrderNumber();
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data: existing } = await supabase
        .from("orders")
        .select("id")
        .eq("order_number", orderNumber)
        .maybeSingle();
      if (!existing) break;
      orderNumber = generatePublicOrderNumber();
    }

    // --- Link or Create Customer ---
    let customerId = null;
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", user.email)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      // Create a new customer row
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      const { data: newCustomer, error: custError } = await supabase
        .from("customers")
        .insert({
          name: profile?.full_name || user.email.split('@')[0],
          email: user.email,
          avatar_url: profile?.avatar_url || null,
          total_spent: 0,
          total_orders: 0,
          status: 'active'
        })
        .select("id")
        .single();
      
      if (!custError && newCustomer) {
        customerId = newCustomer.id;
      }
    }
    // --------------------------------

    const { data: orderRow, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        customer_id: customerId,
        status: "processing",
        payment_status: "pending",
        total,
        items_count: itemsCount,
        shipping_cost: shippingCost,
        discount_amount: discountAmount,
        checkout_details: checkoutDetails,
      })
      .select("*")
      .single();

    if (orderError || !orderRow) {
      console.error("[POST /api/account/orders] insert order", orderError);
      return NextResponse.json(
        { success: false, message: orderError?.message || "Could not create order" },
        { status: 500 }
      );
    }

    const itemPayload = lines.map((line) => ({
      order_id: orderRow.id,
      product_id: null,
      quantity: line.qty,
      unit_price: line.price,
      product_slug: line.slug,
      product_name: line.name,
      image_url: line.image,
      variant_label: line.variantLabel ?? null,
      compare_at_price: line.compareAt ?? null,
    }));

    const { error: itemsErr } = await supabase.from("order_items").insert(itemPayload);

    if (itemsErr) {
      console.error("[POST /api/account/orders] insert items", itemsErr);
      await supabase.from("orders").delete().eq("id", orderRow.id);
      return NextResponse.json(
        { success: false, message: itemsErr.message || "Could not save order lines" },
        { status: 500 }
      );
    }

    const { data: itemRows } = await supabase.from("order_items").select("*").eq("order_id", orderRow.id);

    return NextResponse.json({
      success: true,
      data: mapOrderRowWithItems(orderRow, itemRows ?? []),
    });
  } catch (err) {
    console.error("[POST /api/account/orders]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
