"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import styles from "./ClientsPage.module.css";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        setClients(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AdminLayout
      title="All Clients"
      actions={
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search clients..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/admin/clients/add" className={styles.addBtn}>
            <Plus size={20} /> Add Client
          </Link>
        </div>
      }
    >
      {loading ? (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Loading clients...
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredClients.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No clients found matching your search.</p>
            </div>
          ) : (
            filteredClients.map((client) => (
              <div key={client.id} className={styles.clientCard}>
                <div className={styles.info}>
                  <img
                    src={
                      client.avatar ||
                      `https://ui-avatars.com/api/?name=${client.name}`
                    }
                    alt={client.name}
                    className={styles.avatar}
                    width={60}
                    height={60}
                  />
                  <div className={styles.details}>
                    <h3>{client.name}</h3>
                    <p>
                      {client.title} | {client.company}
                    </p>
                    {client.nfcId && (
                      <span className={styles.nfcId}>TAG: {client.nfcId}</span>
                    )}
                    {client.subscriptionType === "limited" &&
                      (() => {
                        const start = new Date(
                          client.subscriptionStart || Date.now(),
                        );
                        const duration = parseInt(
                          client.subscriptionDuration || "1",
                          10,
                        );
                        const expiry = new Date(start);
                        expiry.setFullYear(expiry.getFullYear() + duration);
                        const isExpired = Date.now() > expiry.getTime();

                        return (
                          <span
                            className={styles.nfcId}
                            style={{
                              marginLeft: "0.5rem",
                              background: isExpired
                                ? "rgba(239, 68, 68, 0.2)"
                                : "rgba(34, 197, 94, 0.2)",
                              color: isExpired ? "#fca5a5" : "#86efac",
                              border: isExpired
                                ? "1px solid rgba(239, 68, 68, 0.2)"
                                : "1px solid rgba(34, 197, 94, 0.2)",
                            }}
                          >
                            {isExpired ? "EXPIRED" : "ACTIVE"}
                          </span>
                        );
                      })()}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={`/c/${client.id}`}
                    target="_blank"
                    className={styles.previewLink}
                  >
                    View Profile{" "}
                    <ExternalLink size={14} style={{ display: "inline" }} />
                  </Link>

                  <div className={styles.btnGroup}>
                    <Link
                      href={`/admin/clients/edit/${client.id}`}
                      className={`${styles.iconBtn} ${styles.btnEdit}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        textDecoration: "none",
                      }}
                    >
                      <Edit2 size={18} />
                    </Link>
                    <button
                      className={`${styles.iconBtn} ${styles.btnDelete}`}
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </AdminLayout>
  );
}
