"use client";
import styles from "./AdminLayout.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Image as ImageIcon,
  Settings,
  Archive,
} from "lucide-react";

export default function AdminLayout({ children, title, actions }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const isLinkActive = (path) => pathname === path;

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <img
            src="/assets/logo-white.png"
            alt="Just Tapp"
            style={{ height: "60px", maxWidth: "100%", width: "auto" }}
          />
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
