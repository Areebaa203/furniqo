import { z } from "zod";

const decimal = z.coerce.number().nonnegative();

export const accountOrderLineSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  price: decimal,
  compareAt: decimal.optional(),
  variantLabel: z.string().nullable().optional(),
  qty: z.number().int().positive(),
});

export const createAccountOrderSchema = z.object({
  lines: z.array(accountOrderLineSchema).min(1, "Cart must contain at least one item"),
  total: decimal,
  itemsCount: z.number().int().positive(),
  shippingCost: decimal.optional(),
  discountAmount: decimal.optional(),
  checkoutDetails: z.any().optional(),
});
