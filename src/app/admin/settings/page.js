"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { User, Lock, Globe, Database, Save, Plus, Trash2, Calendar, Users } from "lucide-react";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Just Tapp Admin",
    supportEmail: "support@justtapp.in",
    maintenanceMode: false,
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
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

  const handleSiteChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSiteSettings({ ...siteSettings, [e.target.name]: value });
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

  const handleSaveSite = (e) => {
    e.preventDefault();
    alert("Site settings saved! (Demo)");
  };

  return (
    <AdminLayout title="Settings">
      {/* Manage Admins Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "space-between", width: "100%" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Users size={24} color="#60a5fa" />
              <div>
                <h2 className={styles.sectionTitle}>Manage Admins</h2>
                <p className={styles.sectionDesc}>
                  Add or remove admin users who have access to this dashboard.
                </p>
              </div>
            </div>
            <button onClick={() => setShowModal(true)} className={styles.addBtn}>
              <Plus size={20} /> Add Admin
            </button>
          </div>
        </div>

        {loading ? (
          <div style={{ color: "white", textAlign: "center", margin: "2rem 0" }}>
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
      </div>

      {/* Site Settings Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Globe size={24} color="#34d399" />
            <div>
              <h2 className={styles.sectionTitle}>General Settings</h2>
              <p className={styles.sectionDesc}>
                Manage global site configuration.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveSite} className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Site Title</label>
            <input
              name="siteTitle"
              value={siteSettings.siteTitle}
              onChange={handleSiteChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Support Email</label>
            <input
              name="supportEmail"
              type="email"
              value={siteSettings.supportEmail}
              onChange={handleSiteChange}
              className={styles.input}
            />
          </div>
        </form>
        <button className={styles.btnSave} onClick={handleSaveSite}>
          Save Settings
        </button>
      </div>

      {/* System Info Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <Database size={24} color="#a78bfa" />
            <div>
              <h2 className={styles.sectionTitle}>System Information</h2>
              <p className={styles.sectionDesc}>
                Technical details about the application environment.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Version</span>
            <span className={styles.infoValue}>1.0.0</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Environment</span>
            <span className={styles.infoValue}>{process.env.NODE_ENV}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Database</span>
            <span className={styles.infoValue}>MySQL connected</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Server Time</span>
            <span className={styles.infoValue}>
              {currentTime || "Loading..."}
            </span>
          </div>
        </div>
      </div>

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
