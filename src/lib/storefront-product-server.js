import { createClient } from "@/utils/supabase/server";
import { resolveStorefrontProductSync, buildPdpFromDb } from "./storefront-product";

export async function resolveStorefrontProduct(slug) {
  // First try the sync version (mock data)
  const mockProduct = resolveStorefrontProductSync(slug);
  if (mockProduct) return mockProduct;

  // Then try Supabase
  try {
    const supabase = await createClient();
    const { data: product } = await supabase
      .from("products")
      .select("*")
      .or(`id.eq.${slug}`)
      .maybeSingle();

    if (product) {
      return buildPdpFromDb(product);
    }
  } catch (error) {
    console.error("Failed to resolve DB product:", error);
  }

  return null;
}
