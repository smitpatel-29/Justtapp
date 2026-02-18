"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ClientForm from "@/components/ClientForm";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function EditClientPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/clients`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((c) => c.id == id);
          if (found) {
            setLoading(false);
            setClient(found);
          } else {
            console.error("Client not found with ID:", id);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [id]);

  const handleUpdate = async (data) => {
    const res = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/clients");
    } else {
      throw new Error("Failed to update client");
    }
  };

  return (
    <AdminLayout title={client ? `Edit ${client.name}` : "Edit Client"}>
      {loading ? (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Loading...
        </div>
      ) : client ? (
        <ClientForm initialData={client} onSubmit={handleUpdate} />
      ) : (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Client not found
        </div>
      )}
    </AdminLayout>
  );
}
