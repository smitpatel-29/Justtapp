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
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState("");

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
    setSaving(true);
    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setNotification("Client updated successfully!");
        setTimeout(() => setNotification(""), 3000);
      } else {
        setNotification("Failed to update client");
        setTimeout(() => setNotification(""), 3000);
        throw new Error("Failed to update client");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title={client ? `Edit ${client.name}` : "Edit Client"}>
      {loading ? (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Loading...
        </div>
      ) : client ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            {notification ? (
              <div
                style={{
                  background: notification.includes("Failed")
                    ? "rgba(239, 68, 68, 0.2)"
                    : "rgba(16, 185, 129, 0.2)",
                  color: notification.includes("Failed")
                    ? "#f87171"
                    : "#34d399",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  fontWeight: "600",
                  border: `1px solid ${notification.includes("Failed") ? "#ef4444" : "#10b981"}`,
                  display: "inline-block",
                }}
              >
                {notification}
              </div>
            ) : (
              <div></div>
            )}
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
                {saving ? "Saving..." : "Update Client"}
              </button>
              <button
                onClick={() =>
                  window.open(`/${client.customSlug || ""}`, "_blank")
                }
                style={{
                  background: "rgba(59, 130, 246, 0.2)",
                  color: "#60a5fa",
                  border: "1px solid #3b82f6",
                  padding: "0.5rem 1rem",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                View Client Profile
              </button>
            </div>
          </div>
          <ClientForm
            initialData={client}
            onSubmit={handleUpdate}
            isOldClient={true}
          />
        </>
      ) : (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Client not found
        </div>
      )}
    </AdminLayout>
  );
}
