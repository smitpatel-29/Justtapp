"use client";
import React from "react";
import { AlertCircle, Lock } from "lucide-react";

export default function SubscriptionExpired() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(239, 68, 68, 0.1)",
          padding: "2rem",
          borderRadius: "100%",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lock size={64} color="#ef4444" />
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "700" }}>
        Profile Suspended
      </h1>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "1.1rem",
          maxWidth: "500px",
          lineHeight: "1.6",
          marginBottom: "2.5rem",
        }}
      >
        This digital business card subscription has expired. <br />
        To reactivate this profile, please contact the Just Tapp team or renew
        your subscription.
      </p>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.5)",
          padding: "1.5rem",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <p style={{ margin: "0 0 0.5rem 0", color: "#cbd5e1" }}>
          Contact Support
        </p>
        <a
          href="mailto:support@justtapp.in"
          style={{
            color: "#60a5fa",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "600",
            display: "block",
            marginBottom: "0.25rem",
          }}
        >
          support@justtapp.in
        </a>
        <a
          href="tel:+911234567890"
          style={{
            color: "#60a5fa",
            textDecoration: "none",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          +91 12345 67890
        </a>
      </div>
    </div>
  );
}
