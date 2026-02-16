"use client";

import { useState } from "react";
import styles from "@/components/AdminDashboard.module.css"; // Reuse styles for consistency

export default function ClientDashboard() {
  const [email, setEmail] = useState("");
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Fetch all clients and find by email (Mock auth)
    try {
      const res = await fetch("/api/clients");
      const clients = await res.json();
      const found = clients.find((c) => c.email === email);
      if (found) {
        setClient(found);
      } else {
        alert("Client not found with that email");
      }
    } catch (err) {
      alert("Error logging in");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedClient = { ...client }; // Form handling logic needed here
    // For simplicity, reusing the logic from Admin helper would be best, but let's just minimal implement here.

    try {
      const res = await fetch(`/api/clients/${client.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      });
      if (res.ok) {
        alert("Profile updated successfully!");
      }
    } catch (err) {
      alert("Error updating profile");
    }
  };

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  if (!client) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            padding: "2rem",
            background: "#1e293b",
            borderRadius: "12px",
            border: "1px solid #334155",
          }}
        >
          <h2 style={{ color: "white", marginBottom: "1rem" }}>Client Login</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "250px",
              marginBottom: "1rem",
              display: "block",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p
            style={{ marginTop: "1rem", color: "#64748b", fontSize: "0.8rem" }}
          >
            Try: alex@example.com
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Dashboard</h1>
        <a
          href={`/c/${client.id}`}
          target="_blank"
          className={styles.btnPrimary}
          style={{
            textDecoration: "none",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          View My Profile
        </a>
      </header>

      <div
        className={styles.card}
        style={{ maxWidth: "800px", margin: "0 auto" }}
      >
        <form onSubmit={handleSave}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Full Name</label>
              <input
                name="name"
                value={client.name}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Job Title</label>
              <input
                name="title"
                value={client.title}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Company</label>
              <input
                name="company"
                value={client.company}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Bio</label>
              <textarea
                name="bio"
                value={client.bio}
                onChange={handleChange}
                rows={4}
                className={styles.textarea}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                name="email"
                value={client.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone</label>
              <input
                name="phone"
                value={client.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            style={{ marginTop: "2rem" }}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
