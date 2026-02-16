import { getClients } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Panel - Just Tapp",
};

export default function AdminPage() {
  const clients = getClients();
  return <AdminDashboard initialClients={clients} />;
}
