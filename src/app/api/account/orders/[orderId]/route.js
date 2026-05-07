import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { mapOrderRowWithItems } from "@/lib/account/mapOrder";

export async function GET(_request, { params }) {
  try {
    const { orderId } = await params;
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing order id" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { data: orderRow, error: oErr } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .eq("user_id", user.id)
      .maybeSingle();

    if (oErr) {
      return NextResponse.json({ success: false, message: oErr.message }, { status: 500 });
    }
    if (!orderRow) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const { data: itemRows } = await supabase.from("order_items").select("*").eq("order_id", orderId);

    return NextResponse.json({
      success: true,
      data: mapOrderRowWithItems(orderRow, itemRows ?? []),
    });
  } catch (err) {
    console.error("[GET /api/account/orders/[orderId]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

/** Simulate payment / progress (demo UI) or cancel order */
export async function PATCH(request, { params }) {
  try {
    const { orderId } = await params;
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing order id" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const markPaid = Boolean(body.markPaid);

    if (!markPaid) {
      return NextResponse.json({ success: false, message: "Unsupported update" }, { status: 400 });
    }

    const fulfillment = Math.random() > 0.5 ? "delivered" : "shipped";

    const { data: updated, error: uErr } = await supabase
      .from("orders")
      .update({
        payment_status: "paid",
        status: fulfillment,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)
      .eq("user_id", user.id)
      .select("*")
      .maybeSingle();

    if (uErr) {
      return NextResponse.json({ success: false, message: uErr.message }, { status: 500 });
    }
    if (!updated) {
      return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    const { data: itemRows } = await supabase.from("order_items").select("*").eq("order_id", orderId);

    return NextResponse.json({
      success: true,
      data: mapOrderRowWithItems(updated, itemRows ?? []),
    });
  } catch (err) {
    console.error("[PATCH /api/account/orders/[orderId]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  try {
    const { orderId } = await params;
    if (!orderId) {
      return NextResponse.json({ success: false, message: "Missing order id" }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { error: dErr } = await supabase.from("orders").delete().eq("id", orderId).eq("user_id", user.id);

    if (dErr) {
      return NextResponse.json({ success: false, message: dErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/account/orders/[orderId]]", err);
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
