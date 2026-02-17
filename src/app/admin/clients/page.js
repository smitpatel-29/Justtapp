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
  X,
  Image as ImageIcon,
} from "lucide-react";
import styles from "./ClientsPage.module.css";
import MediaManager from "@/components/MediaManager";

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
    // Socials simplifed extraction
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
    twitter: client?.socials?.find((s) => s.platform === "Twitter")?.url || "",
    snapchat:
      client?.socials?.find((s) => s.platform === "Snapchat")?.url || "",
    map: client?.socials?.find((s) => s.platform === "Map")?.url || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
    pushSocial("Twitter", formData.twitter);
    pushSocial("Snapchat", formData.snapchat);
    pushSocial("Map", formData.map);

    onSave({ ...formData, socials });
  };

  // Media picker logic
  const [showMedia, setShowMedia] = useState(false);
  const [mediaTarget, setMediaTarget] = useState(null);

  const openMedia = (target) => {
    setMediaTarget(target);
    setShowMedia(true);
  };

  const handleMediaSelect = (url) => {
    setFormData({ ...formData, [mediaTarget]: url });
    setShowMedia(false);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{client ? "Edit Client" : "New Client"}</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div className={styles.formGrid}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Job Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Company</label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>NFC ID (Tag Serial)</label>
              <input
                name="nfcId"
                value={formData.nfcId}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Business Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Cover Image URL</label>
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
                  className={styles.btnSmall}
                  title="Pick from Library"
                >
                  <ImageIcon size={18} />
                </button>
              </div>
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={3}
                className={styles.textarea}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Website URL</label>
              <input
                name="website"
                value={formData.website}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Photo URL</label>
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
                  className={styles.btnSmall}
                >
                  <ImageIcon size={18} />
                </button>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>LinkedIn URL</label>
              <input
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://linkedin.com/..."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Instagram URL</label>
              <input
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className={styles.input}
                placeholder="https://instagram.com/..."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Facebook URL</label>
              <input
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>YouTube URL</label>
              <input
                name="youtube"
                value={formData.youtube}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>WhatsApp (Number/Link)</label>
              <input
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                className={styles.input}
                placeholder="wa.me/..."
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Telegram URL</label>
              <input
                name="telegram"
                value={formData.telegram}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Twitter URL</label>
              <input
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Snapchat URL</label>
              <input
                name="snapchat"
                value={formData.snapchat}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
            <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
              <label>Map Location URL</label>
              <input
                name="map"
                value={formData.map}
                onChange={handleChange}
                className={styles.input}
              />
            </div>

            <div
              className={`${styles.inputGroup} ${styles.fullWidth}`}
              style={{
                marginTop: "1rem",
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "1rem",
              }}
            >
              <label style={{ color: "#60a5fa", fontSize: "1.1rem" }}>
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
          </div>
          <div className={styles.formActions}>
            <button
              type="button"
              onClick={onClose}
              className={styles.btnCancel}
            >
              Cancel
            </button>
            <button type="submit" className={styles.btnSave}>
              Save Client
            </button>
          </div>
        </form>

        <MediaManager
          isOpen={showMedia}
          onClose={() => setShowMedia(false)}
          onSelect={handleMediaSelect}
        />
      </div>
    </div>
  );
}

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch("/api/clients");
      if (res.ok) {
        setClients(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
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
        fetchClients(); // Refresh list
        closeModal();
      } else {
        alert("Failed to save");
      }
    } catch (e) {
      console.error(e);
      alert("Error saving");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      }
    } catch (e) {
      console.error(e);
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

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.company?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <AdminLayout
      title="All Clients"
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
          <button className={styles.addBtn} onClick={() => openModal()}>
            <Plus size={20} /> Add Client
          </button>
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
              <p>No clients found matching your search.</p>
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
                    {client.nfcId && (
                      <span className={styles.nfcId}>TAG: {client.nfcId}</span>
                    )}
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <Link
                    href={`/c/${client.id}`}
                    target="_blank"
                    className={styles.previewLink}
                  >
                    View Profile{" "}
                    <ExternalLink size={14} style={{ display: "inline" }} />
                  </Link>

                  <div className={styles.btnGroup}>
                    <button
                      className={`${styles.iconBtn} ${styles.btnEdit}`}
                      onClick={() => openModal(client)}
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      className={`${styles.iconBtn} ${styles.btnDelete}`}
                      onClick={() => handleDelete(client.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {isModalOpen && (
        <ClientForm
          client={editingClient}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </AdminLayout>
  );
}
