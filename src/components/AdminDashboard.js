"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Upload } from "lucide-react";
import styles from "./AdminDashboard.module.css";
import AdminLayout from "./AdminLayout";

export default function AdminDashboard({ initialClients = [] }) {
  const [clients, setClients] = useState(initialClients);
  // We keep fetch logic to show accurate stats
  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setClients(d);
        } else {
          console.error("API response is not an array:", d);
          setClients([]);
        }
      })
      .catch((err) => {
        console.error(err);
        setClients([]);
      });
  }, []);

  // Stats Calculations
  const totalClients = clients.length;
  const activeClientsCount = clients.filter((c) => c.active !== false).length;
  const activeTags = clients.filter(
    (c) => c.active !== false && c.nfcId && c.nfcId.length > 0,
  ).length;
  const uniqueCompanies = new Set(clients.map((c) => c.company).filter(Boolean))
    .size;

  return (
    <AdminLayout title="Dashboard Overview">
      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Total Clients</span>
          <span className={styles.statValue}>{totalClients}</span>
          <span className={styles.statSub}>
            {activeClientsCount} Active / {totalClients - activeClientsCount}{" "}
            Inactive
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Active NFC Tags</span>
          <span className={styles.statValue}>{activeTags}</span>
          <span className={styles.statSub}>Linked & Active</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Companies</span>
          <span className={styles.statValue}>{uniqueCompanies}</span>
          <span className={styles.statSub}>Unique organizations</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>System Status</span>
          <span
            className={`${styles.statValue} ${styles.statValueSuccess}`}
            style={{ fontSize: "1.5rem" }}
          >
            Operational
          </span>
          <span className={styles.statSub}>All systems normal</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link
          href="/admin/clients"
          className={`${styles.actionCard} ${styles.actionCreate}`}
          style={{ textDecoration: "none" }}
        >
          <div className={styles.actionIcon}>
            <UserPlus size={24} />
          </div>
          <span className={styles.actionTitle}>Create New Client</span>
          <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
            Add a new profile to the system
          </span>
        </Link>

        <Link
          href="/admin/media"
          className={`${styles.actionCard} ${styles.actionUpload}`}
          style={{ textDecoration: "none" }}
        >
          <div className={styles.actionIcon}>
            <Upload size={24} />
          </div>
          <span className={styles.actionTitle}>Upload Media</span>
          <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>
            Manage images and assets
          </span>
        </Link>
      </div>
    </AdminLayout>
  );
}
