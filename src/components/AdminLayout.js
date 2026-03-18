"use client";
import React, { useState } from "react";
import styles from "./AdminLayout.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Settings,
  Archive,
  Menu,
  X
} from "lucide-react";

export default function AdminLayout({ children, title, actions }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const isLinkActive = (path) => pathname === path;

  return (
    <div className={styles.layout}>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileOverlay} 
          onClick={() => setIsMobileMenuOpen(false)} 
        />
      )}

      <aside className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarHeader}>
          <div className={styles.logo}>
            <img
              src="/assets/logo-white.png"
              alt="Just Tapp"
              style={{ height: "60px", maxWidth: "100%", width: "auto" }}
            />
          </div>
          <button 
            className={styles.mobileCloseBtn}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <nav className={styles.nav}>
          <Link
            href="/admin"
            className={`${styles.navItem} ${
              pathname === "/admin" ? styles.navItemActive : ""
            }`}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            href="/admin/clients"
            className={`${styles.navItem} ${
              pathname.startsWith("/admin/clients") ? styles.navItemActive : ""
            }`}
          >
            <Users size={20} />
            Clients
          </Link>
          <Link
            href="/admin/old-clients"
            className={`${styles.navItem} ${
              pathname.startsWith("/admin/old-clients")
                ? styles.navItemActive
                : ""
            }`}
          >
            <Archive size={20} />
            Old Clients
          </Link>

          <Link
            href="/admin/media"
            className={`${styles.navItem} ${
              pathname.startsWith("/admin/media") ? styles.navItemActive : ""
            }`}
          >
            <ImageIcon size={20} />
            Media Library
          </Link>
          <Link
            href="/admin/settings"
            className={`${styles.navItem} ${
              pathname.startsWith("/admin/settings") ? styles.navItemActive : ""
            }`}
          >
            <Settings size={20} />
            Settings
          </Link>
        </nav>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.mobileNavHeader}>
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          {/* Add a tiny logo or title for the mobile bar if desired */}
          <div className={styles.mobileTitle}>Just Tapp Admin</div>
        </div>

        {title && (
          <header className={styles.header}>
            <h1 className={styles.pageTitle}>{title}</h1>
            <div className={styles.headerActions}>
              {actions}
              <div className={styles.userProfileContainer}>
                <div className={styles.userProfile}>
                  <div className={styles.profileAvatar}>A</div>
                  <span className={styles.profileName}>Admin</span>
                </div>
                <div className={styles.logoutMenu}>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </header>
        )}
        {children}
      </main>
    </div>
  );
}
