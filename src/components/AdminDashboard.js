"use client";

import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  QrCode,
  X,
  Image,
} from "lucide-react";
import styles from "./AdminDashboard.module.css";
import MediaManager from "./MediaManager";

export default function AdminDashboard({ initialClients }) {
  const [clients, setClients] = useState(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this client?")) return;

    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete client");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (client = null) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingClient(null);
    setIsModalOpen(false);
  };

  const handleSave = async (data) => {
    const isEdit = !!editingClient;
    const url = isEdit ? `/api/clients/${editingClient.id}` : "/api/clients";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const savedClient = await res.json();
        if (isEdit) {
          setClients(
            clients.map((c) => (c.id === savedClient.id ? savedClient : c)),
          );
        } else {
          setClients([...clients, savedClient]);
        }
        closeModal();
      } else {
        alert("Failed to save client");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving client");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src="https://justtapp.in/logo/Just%20Tap%20White%20Logo.png"
            alt="Just Tapp"
            style={{ height: "32px" }}
          />
          <h1 className={styles.title} style={{ margin: 0 }}>
            Admin Panel
          </h1>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => setShowMediaLibrary(true)}
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <Image size={20} />
            Media Library
          </button>
          <button
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={() => openModal()}
          >
            <Plus size={20} />
            Add Client
          </button>
        </div>
      </header>

      {/* Main Media Manager Modal */}
      <MediaManager
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
      />

      <div className={styles.grid}>
        {clients.map((client) => (
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
                  {client.title} @ {client.company}
                </p>
                {client.nfcId && (
                  <span className={styles.nfcId}>TAG: {client.nfcId}</span>
                )}
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href={`/c/${client.id}`}
                target="_blank"
                className={styles.previewLink}
              >
                View Profile{" "}
                <ExternalLink size={12} style={{ display: "inline" }} />
              </a>
              <div className={styles.btnGroup}>
                <button
                  className={`${styles.btn} ${styles.btnEdit}`}
                  onClick={() => openModal(client)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className={`${styles.btn} ${styles.btnDanger}`}
                  onClick={() => handleDelete(client.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <ClientForm
            client={editingClient}
            onSave={handleSave}
            onClose={closeModal}
          />
        </div>
      )}
    </div>
  );
}

function ClientForm({ client, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    title: client?.title || "",
    company: client?.company || "",
    bio: client?.bio || "",
    email: client?.email || "",
    phone: client?.phone || "",
    website: client?.website || "",
    avatar: client?.avatar || "",
    coverImage: client?.coverImage || "",
    address: client?.address || "",
    nfcId: client?.nfcId || "",
    theme: client?.theme || "dark",
    customTheme: client?.customTheme || {
      background: "#0f172a",
      textPrimary: "#ffffff",
      accentColor: "#60a5fa",
      buttonBg: "#3b82f6",
    },
    // Socials
    linkedin:
      client?.socials?.find((s) => s.platform === "LinkedIn")?.url || "",
    instagram:
      client?.socials?.find((s) => s.platform === "Instagram")?.url || "",
    facebook:
      client?.socials?.find((s) => s.platform === "Facebook")?.url || "",
    youtube: client?.socials?.find((s) => s.platform === "Youtube")?.url || "",
    whatsapp:
      client?.socials?.find((s) => s.platform === "WhatsApp")?.url || "",
    telegram:
      client?.socials?.find((s) => s.platform === "Telegram")?.url || "",
    // tiktok: client?.socials?.find((s) => s.platform === "TikTok")?.url || "", // Removed
    twitter: client?.socials?.find((s) => s.platform === "Twitter")?.url || "", // Added
    snapchat:
      client?.socials?.find((s) => s.platform === "Snapchat")?.url || "",
    map: client?.socials?.find((s) => s.platform === "Map")?.url || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reconstruct socials array
    const socials = [];
    const pushSocial = (platform, url) => {
      if (url) socials.push({ platform, url });
    };

    pushSocial("LinkedIn", formData.linkedin);
    pushSocial("Instagram", formData.instagram);
    pushSocial("Facebook", formData.facebook);
    pushSocial("Youtube", formData.youtube);
    pushSocial("WhatsApp", formData.whatsapp);
    pushSocial("Telegram", formData.telegram);
    // pushSocial("TikTok", formData.tiktok); // Removed
    pushSocial("Twitter", formData.twitter); // Added
    pushSocial("Snapchat", formData.snapchat);
    pushSocial("Map", formData.map);

    const payload = {
      ...formData,
      socials,
    };
    onSave(payload);
  };

  const [showMedia, setShowMedia] = useState(false);
  const [mediaTarget, setMediaTarget] = useState(null); // 'avatar' | 'coverImage' | null

  const openMedia = (target) => {
    setMediaTarget(target);
    setShowMedia(true);
  };

  const handleMediaSelect = (url) => {
    setFormData({ ...formData, [mediaTarget]: url });
    setShowMedia(false);
  };

  return (
    <div className={styles.modalContent}>
      <header className={styles.modalHeader}>
        <h2>{client ? "Edit Client" : "New Client"}</h2>
        <button onClick={onClose} className={styles.closeBtn}>
          <X size={24} />
        </button>
      </header>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* ... existing fields ... */}
          <div className={styles.inputGroup}>
            <label className={styles.label}>Full Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Job Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Company</label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>NFC ID (Tag Serial)</label>
            <input
              name="nfcId"
              value={formData.nfcId}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Business Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Cover Image URL</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className={styles.input}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => openMedia("coverImage")}
                className={styles.btn}
                style={{ padding: "0 1rem", background: "#334155" }}
              >
                <Image size={18} />
              </button>
            </div>
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className={styles.textarea}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Website URL</label>
            <input
              name="website"
              value={formData.website}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label className={styles.label}>Photo URL</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://..."
                className={styles.input}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                onClick={() => openMedia("avatar")}
                className={styles.btn}
                style={{ padding: "0 1rem", background: "#334155" }}
              >
                <Image size={18} />
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>LinkedIn URL</label>
            <input
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Instagram URL</label>
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Facebook URL</label>
            <input
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>YouTube URL</label>
            <input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>WhatsApp (Number/Link)</label>
            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={styles.input}
              placeholder="wa.me/..."
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Telegram URL</label>
            <input
              name="telegram"
              value={formData.telegram}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Twitter URL</label>
            <input
              name="twitter"
              value={formData.twitter}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Snapchat URL</label>
            <input
              name="snapchat"
              value={formData.snapchat}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Map Location URL</label>
            <input
              name="map"
              value={formData.map}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          {/* Theme Selection */}
          <div
            className={`${styles.inputGroup} ${styles.fullWidth}`}
            style={{
              marginTop: "1rem",
              borderTop: "1px solid #334155",
              paddingTop: "1rem",
            }}
          >
            <label
              className={styles.label}
              style={{ fontSize: "1.1rem", color: "#60a5fa" }}
            >
              Profile Theme
            </label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className={styles.input}
              style={{ background: "#1e293b" }}
            >
              <option value="dark">Dark Theme (Default)</option>
              <option value="light">Light Theme</option>
              <option value="blue">Blue Corporate</option>
              <option value="custom">Custom Theme</option>
            </select>
          </div>

          {formData.theme === "custom" && (
            <div
              className={styles.formGrid}
              style={{
                gridColumn: "1 / -1",
                background: "rgba(255,255,255,0.05)",
                padding: "1rem",
                borderRadius: "12px",
              }}
            >
              <div className={styles.inputGroup}>
                <label className={styles.label}>Background Color</label>
                <input
                  type="color"
                  value={formData.customTheme.background}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customTheme: {
                        ...formData.customTheme,
                        background: e.target.value,
                      },
                    })
                  }
                  className={styles.input}
                  style={{ height: 40, padding: 2 }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Text Color</label>
                <input
                  type="color"
                  value={formData.customTheme.textPrimary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customTheme: {
                        ...formData.customTheme,
                        textPrimary: e.target.value,
                      },
                    })
                  }
                  className={styles.input}
                  style={{ height: 40, padding: 2 }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Accent Color</label>
                <input
                  type="color"
                  value={formData.customTheme.accentColor}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customTheme: {
                        ...formData.customTheme,
                        accentColor: e.target.value,
                      },
                    })
                  }
                  className={styles.input}
                  style={{ height: 40, padding: 2 }}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Button Color</label>
                <input
                  type="color"
                  value={formData.customTheme.buttonBg}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customTheme: {
                        ...formData.customTheme,
                        buttonBg: e.target.value,
                      },
                    })
                  }
                  className={styles.input}
                  style={{ height: 40, padding: 2 }}
                />
              </div>
            </div>
          )}
        </div>
        <button type="submit" className={styles.submitBtn}>
          Save Client
        </button>
      </form>

      <MediaManager
        isOpen={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
