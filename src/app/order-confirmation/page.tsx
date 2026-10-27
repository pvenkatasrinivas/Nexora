import type { Metadata } from "next";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Order confirmation" };

export default function OrderConfirmationPage() {
  return (
    <div className="container-page">
      <PageHeader title="Order confirmation" />
      <OrderConfirmation />
    </div>
  );
}
