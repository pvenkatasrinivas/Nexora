import type { Metadata } from "next";
import CheckoutView from "@/components/checkout/CheckoutView";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <div className="container-page">
      <PageHeader title="Checkout" description="Enter your details and review your order." />
      <CheckoutView />
    </div>
  );
}
