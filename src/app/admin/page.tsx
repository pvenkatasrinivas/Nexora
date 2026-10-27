import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Admin dashboard",
  // Keep the demo admin page out of search engines.
  robots: { index: false },
};

export default function AdminPage() {
  return (
    <div className="container-page">
      <PageHeader title="Admin dashboard" description="Add, edit and delete the products shown in the store." />
      <AdminDashboard />
    </div>
  );
}
