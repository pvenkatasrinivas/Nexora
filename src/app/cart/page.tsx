import type { Metadata } from "next";
import CartView from "@/components/cart/CartView";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Shopping cart" };

export default function CartPage() {
  return (
    <div className="container-page">
      <PageHeader title="Shopping cart" />
      <CartView />
    </div>
  );
}
