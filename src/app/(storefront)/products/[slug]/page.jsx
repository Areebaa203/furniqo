import { notFound } from "next/navigation";
import ProductDetailView from "@/components/products/ProductDetailView";
import { resolveStorefrontProduct } from "@/lib/storefront-product-server";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = await resolveStorefrontProduct(slug);
  return {
    title: p ? `${p.name} · Furniqo` : "Product",
    description: p ? `Shop ${p.name} at Furniqo.` : undefined,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await resolveStorefrontProduct(slug);
  if (!product) notFound();
  return <ProductDetailView key={product.slug} product={product} />;
}
