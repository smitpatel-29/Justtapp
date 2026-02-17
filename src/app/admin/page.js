import { getClients } from "@/lib/db";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "Admin Panel - Just Tapp",
};

export default async function AdminPage() {
  const clients = await getClients();
  const safeClients = Array.isArray(clients) ? clients : [];
  return <AdminDashboard initialClients={safeClients} />;
}
