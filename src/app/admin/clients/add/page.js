"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import ClientForm from "@/components/ClientForm";
import { useRouter } from "next/navigation";

export default function AddClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async (data) => {
    setSaving(true);
    try {
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
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="Add New Client">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            form="clientForm"
            type="submit"
            disabled={saving}
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              opacity: saving ? 0.7 : 1,
            }}
          >
            {saving ? "Saving..." : "Create Client"}
          </button>
        </div>
      </div>
      <ClientForm onSubmit={handleSave} />
    </AdminLayout>
  );
}
