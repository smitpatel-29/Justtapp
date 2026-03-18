"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Plus, Trash2, Calendar } from "lucide-react";
import styles from "./AdminsPage.module.css";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await fetch("/api/admins");
      if (res.ok) {
        const data = await res.json();
        setAdmins(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await fetch(`/api/admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        setAdmins(admins.filter((a) => a.id !== id));
      } else {
        alert(data.error || "Failed to delete admin");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting admin");
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({ username: "", password: "" });
        setShowModal(false);
        fetchAdmins(); // refresh list
      } else {
        setError(data.error || "Failed to create admin");
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong");
    }
  };

  return (
    <AdminLayout
      title="Manage Admins"
      actions={
        <div className={styles.actions}>
          <button onClick={() => setShowModal(true)} className={styles.addBtn}>
            <Plus size={20} /> Add Admin
          </button>
        </div>
      }
    >
      {loading ? (
        <div style={{ color: "white", textAlign: "center", marginTop: "2rem" }}>
          Loading admins...
        </div>
      ) : (
        <div className={styles.grid}>
          {admins.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No admins found.</p>
            </div>
          ) : (
            admins.map((admin) => (
              <div key={admin.id} className={styles.adminCard}>
                <div className={styles.details}>
                  <h3>{admin.username}</h3>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    Added: {new Date(admin.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.cardActions}>
                  <button
                    className={`${styles.iconBtn} ${styles.btnDelete}`}
                    onClick={() => handleDelete(admin.id)}
                    title="Delete Admin"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Add New Admin</h2>
            {error && <p style={{ color: "#ef4444", marginBottom: "1rem" }}>{error}</p>}
            <form onSubmit={handleAddAdmin}>
              <div className={styles.formGroup}>
                <label>Username</label>
                <input
                  type="text"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Password</label>
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => {setShowModal(false); setError("");}}>
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
