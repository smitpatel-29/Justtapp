"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  RotateCcw,
  Archive,
} from "lucide-react";
import styles from "./ClientsPage.module.css";

export default function OldClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTrash, setShowTrash] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [showTrash]);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const url = showTrash
        ? "/api/clients?deleted=true&old=true"
        : "/api/clients?old=true";
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error("API response is not an array:", data);
          setClients([]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to move this client to trash?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await fetch(`/api/clients/${id}/restore`, { method: "POST" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      } else {
        alert("Failed to restore client");
      }
    } catch (e) {
      console.error(e);
      alert("Error restoring client");
    }
  };

  const handlePermanentDelete = async (id) => {
    if (
      !confirm(
        "Are you sure you want to PERMANENTLY delete this client? This cannot be undone.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/clients/${id}?permanent=true`, {
        method: "DELETE",
      });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      } else {
        alert("Failed to permanently delete client");
      }
    } catch (e) {
      console.error(e);
      alert("Error permanently deleting client");
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AdminLayout
      title={showTrash ? "Deleted Old Clients" : "Old Clients"}
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
          <button
            onClick={() => setShowTrash(!showTrash)}
            className={styles.addBtn}
            style={{
              background: showTrash ? "#64748b" : "#475569",
              marginRight: "0.5rem",
            }}
          >
            {showTrash ? (
              <>
                <Archive size={20} /> View Active
              </>
            ) : (
              <>
                <Trash2 size={20} /> View Trash
              </>
            )}
          </button>
          {!showTrash && (
            <Link href="/admin/old-clients/add" className={styles.addBtn}>
              <Plus size={20} /> Add Client
            </Link>
          )}
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
              <p>
                {showTrash
                  ? "No deleted clients found."
                  : "No clients found matching your search."}
              </p>
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
                    {client.customSlug && (
                      <span className={styles.nfcId}>
                        URL: /{client.customSlug}
                      </span>
                    )}
                    {/* Status Badge logic */}
                    {!showTrash &&
                      (client.active === false ? (
                        <span
                          className={styles.nfcId}
                          style={{
                            marginLeft: "0.5rem",
                            background: "rgba(239, 68, 68, 0.2)",
                            color: "#fca5a5",
                            border: "1px solid rgba(239, 68, 68, 0.2)",
                          }}
                        >
                          INACTIVE
                        </span>
                      ) : (
                        client.subscriptionType === "limited" &&
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
                        })()
                      ))}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  {!showTrash && (
                    <Link
                      href={`/${client.customSlug || client.nfcId || `c/${client.id}`}`}
                      target="_blank"
                      className={styles.previewLink}
                    >
                      View Profile{" "}
                      <ExternalLink size={14} style={{ display: "inline" }} />
                    </Link>
                  )}

                  <div className={styles.btnGroup}>
                    {showTrash ? (
                      <>
                        <button
                          className={`${styles.iconBtn} ${styles.btnEdit}`}
                          onClick={() => handleRestore(client.id)}
                          title="Restore Client"
                          style={{ width: "auto", padding: "0.5rem 1rem" }}
                        >
                          <RotateCcw
                            size={18}
                            style={{ marginRight: "0.5rem" }}
                          />{" "}
                          Restore
                        </button>
                        <button
                          className={`${styles.iconBtn} ${styles.btnDelete}`}
                          onClick={() => handlePermanentDelete(client.id)}
                          title="Permanently Delete Client"
                          style={{
                            width: "auto",
                            padding: "0.5rem 1rem",
                            marginLeft: "0.5rem",
                          }}
                        >
                          <Trash2 size={18} style={{ marginRight: "0.5rem" }} />{" "}
                          Delete
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          href={`/admin/old-clients/edit/${client.id}`}
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
                      </>
                    )}
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
