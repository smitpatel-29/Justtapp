"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { User, Lock, Globe, Database, Save } from "lucide-react";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  const [adminProfile, setAdminProfile] = useState({
    username: "Admin",
    email: "admin@justtapp.in",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [siteSettings, setSiteSettings] = useState({
    siteTitle: "Just Tapp Admin",
    supportEmail: "support@justtapp.in",
    maintenanceMode: false,
  });

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const handleProfileChange = (e) => {
    setAdminProfile({ ...adminProfile, [e.target.name]: e.target.value });
  };

  const handleSiteChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setSiteSettings({ ...siteSettings, [e.target.name]: value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (adminProfile.newPassword !== adminProfile.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile updated successfully! (Demo)");
  };

  const handleSaveSite = (e) => {
    e.preventDefault();
    alert("Site settings saved! (Demo)");
  };

  return (
    <AdminLayout title="Settings">
      {/* Admin Profile Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <User size={24} color="#60a5fa" />
            <div>
              <h2 className={styles.sectionTitle}>Admin Profile</h2>
              <p className={styles.sectionDesc}>
                Update your account information and password.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Username</label>
            <input
              name="username"
              value={adminProfile.username}
              onChange={handleProfileChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              name="email"
              type="email"
              value={adminProfile.email}
              onChange={handleProfileChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Current Password</label>
            <input
              name="currentPassword"
              type="password"
              value={adminProfile.currentPassword}
              onChange={handleProfileChange}
              className={styles.input}
              placeholder="••••••••"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>New Password</label>
            <input
              name="newPassword"
              type="password"
              value={adminProfile.newPassword}
              onChange={handleProfileChange}
              className={styles.input}
              placeholder="New password"
            />
          </div>
        </form>
        <button className={styles.btnSave} onClick={handleSaveProfile}>
          Update Profile
        </button>
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
            <span className={styles.infoValue}>1.0.0-beta</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Environment</span>
            <span className={styles.infoValue}>{process.env.NODE_ENV}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Database</span>
            <span className={styles.infoValue}>JSON (File System)</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Server Time</span>
            <span className={styles.infoValue}>
              {currentTime || "Loading..."}
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
