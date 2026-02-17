"use client";

import AdminLayout from "@/components/AdminLayout";
import ClientForm from "@/components/ClientForm";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const router = useRouter();

  const handleSave = async (data) => {
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/clients");
    } else {
      throw new Error("Failed to create client");
    }
  };

  return (
    <AdminLayout title="Add New Client">
      <ClientForm onSubmit={handleSave} />
    </AdminLayout>
  );
}
