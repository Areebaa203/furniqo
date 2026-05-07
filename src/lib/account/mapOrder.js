/**
 * Map Supabase `orders` + `order_items` rows to the UI shape used by account/checkout components.
 */

export function mapOrderRowWithItems(orderRow, itemRows) {
  const items = Array.isArray(itemRows) ? itemRows : [];
  return {
    id: orderRow.id,
    orderNumber: orderRow.order_number,
    createdAt: orderRow.created_at,
    updatedAt: orderRow.updated_at,
    paymentStatus: orderRow.payment_status,
    fulfillmentStatus: orderRow.status,
    lines: items.map((i) => ({
      slug: i.product_slug ?? "",
      name: i.product_name ?? "Item",
      image: i.image_url || "/furniqo-logo.svg",
      price: Number(i.unit_price),
      compareAt: i.compare_at_price != null ? Number(i.compare_at_price) : undefined,
      variantLabel: i.variant_label ?? null,
      qty: i.quantity,
    })),
    total: Number(orderRow.total),
    itemsCount: orderRow.items_count,
    shippingCost: Number(orderRow.shipping_cost ?? 0),
    discountAmount: Number(orderRow.discount_amount ?? 0),
    checkoutDetails:
      orderRow.checkout_details && typeof orderRow.checkout_details === "object"
        ? orderRow.checkout_details
        : {},
  };
}

export function generatePublicOrderNumber() {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `FNQ-${n}`;
}
