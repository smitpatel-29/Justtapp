"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Image as ImageIcon,
  User,
  Briefcase,
  Share2,
  Lock,
  Palette,
  LayoutTemplate,
} from "lucide-react";
import styles from "./ClientForm.module.css";
import MediaManager from "@/components/MediaManager";

export default function ClientForm({ initialData = null, onSubmit }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showMedia, setShowMedia] = useState(false);
  const [mediaTarget, setMediaTarget] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  const [formData, setFormData] = useState({
    active: initialData?.active !== false,
    name: initialData?.name || "",
    title: initialData?.title || "",
    company: initialData?.company || "",
    bio: initialData?.bio || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "+91 ",
    website: initialData?.website || "",
    avatar: initialData?.avatar || "",
    coverImage: initialData?.coverImage || "",
    address: initialData?.address || "",
    nfcId:
      initialData?.nfcId ||
      Math.random().toString(36).substr(2, 8).toUpperCase(),
    theme: initialData?.theme || "dark",
    layout: initialData?.layout || "classic",
    customTheme: initialData?.customTheme || {
      background: "#0f172a",
      textPrimary: "#ffffff",
      accentColor: "#60a5fa",
      buttonBg: "#3b82f6",
    },
    subscriptionType: initialData?.subscriptionType || "limited",
    subscriptionDuration: initialData?.subscriptionDuration || "1",
    subscriptionStart:
      initialData?.subscriptionStart || new Date().toISOString(),
    // Socials
    linkedin:
      initialData?.socials?.find((s) => s.platform === "LinkedIn")?.url || "",
    instagram:
      initialData?.socials?.find((s) => s.platform === "Instagram")?.url || "",
    facebook:
      initialData?.socials?.find((s) => s.platform === "Facebook")?.url || "",
    youtube:
      initialData?.socials?.find((s) => s.platform === "Youtube")?.url || "",
    whatsapp:
      initialData?.socials?.find((s) => s.platform === "WhatsApp")?.url ||
      "+91 ",
    telegram:
      initialData?.socials?.find((s) => s.platform === "Telegram")?.url || "",
    twitter:
      initialData?.socials?.find((s) => s.platform === "Twitter")?.url || "",
    snapchat:
      initialData?.socials?.find((s) => s.platform === "Snapchat")?.url || "",
    map: initialData?.socials?.find((s) => s.platform === "Map")?.url || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const payload = { ...formData, socials };

    try {
      await onSubmit(payload);
    } catch (error) {
      console.error(error);
      alert("Error saving client");
    } finally {
      setLoading(false);
    }
  };

  const openMedia = (target) => {
    setMediaTarget(target);
    setShowMedia(true);
  };

  const handleMediaSelect = (url) => {
    setFormData({ ...formData, [mediaTarget]: url });
    setShowMedia(false);
  };

  return (
    <>
      <form
        id="clientForm"
        onSubmit={handleSubmit}
        className={styles.formContainer}
      >
        {/* Tabs */}
        <div className={styles.tabContainer}>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "details" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("details")}
          >
            <User size={18} /> Profile Details
          </button>
          <button
            type="button"
            className={`${styles.tabButton} ${activeTab === "appearance" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("appearance")}
          >
            <LayoutTemplate size={18} /> Appearance & Layout
          </button>
        </div>

        {/* Tab 1: Profile Details */}
        {activeTab === "details" && (
          <>
            {/* Visuals & Subscription */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <ImageIcon size={20} /> Visuals & Status
              </h3>
              <div className={styles.formGrid}>
                {/* Visuals */}
                <div className={styles.inputGroup}>
                  <label>Profile Photo</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      name="avatar"
                      value={formData.avatar}
                      onChange={handleChange}
                      placeholder="https://..."
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => openMedia("avatar")}
                      className={styles.btnSmall}
                    >
                      <ImageIcon size={18} />
                    </button>
                  </div>
                  {formData.avatar && (
                    <img
                      src={formData.avatar}
                      alt="Preview"
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        marginTop: "0.5rem",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label>Cover Image</label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      name="coverImage"
                      value={formData.coverImage}
                      onChange={handleChange}
                      placeholder="https://..."
                      className={styles.input}
                    />
                    <button
                      type="button"
                      onClick={() => openMedia("coverImage")}
                      className={styles.btnSmall}
                    >
                      <ImageIcon size={18} />
                    </button>
                  </div>
                </div>

                {/* Subscription / Status */}
                <div className={styles.inputGroup}>
                  <label>Account Status</label>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, active: !formData.active })
                    }
                    style={{
                      background: formData.active
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(239, 68, 68, 0.2)",
                      color: formData.active ? "#4ade80" : "#f87171",
                      border: `1px solid ${
                        formData.active
                          ? "rgba(34, 197, 94, 0.3)"
                          : "rgba(239, 68, 68, 0.3)"
                      }`,
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontWeight: "600",
                    }}
                  >
                    {formData.active ? "Active" : "Deactivated"}
                    <span style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                      {formData.active
                        ? "Click to Deactivate"
                        : "Click to Activate"}
                    </span>
                  </button>
                </div>

                <div className={styles.inputGroup}>
                  <label>Current Layout</label>
                  <div
                    style={{
                      padding: "0.6rem 0.8rem",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      color: "#94a3b8",
                      fontSize: "0.9rem",
                    }}
                  >
                    {formData.layout
                      ? formData.layout.charAt(0).toUpperCase() +
                        formData.layout.slice(1)
                      : "Classic"}
                    <span
                      style={{
                        marginLeft: "10px",
                        fontSize: "0.8rem",
                        color: "#64748b",
                      }}
                    >
                      (Edit in Appearance tab)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <User size={20} /> Personal Details
              </h3>
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
                  <label>Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                  <label>Bio / About</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className={styles.textarea}
                  />
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Briefcase size={20} /> Professional Info
              </h3>
              <div className={styles.formGrid}>
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
                  <label>Company Name</label>
                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Business Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Website URL</label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Share2 size={20} /> Social Media Links
              </h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>LinkedIn</label>
                  <input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Instagram</label>
                  <input
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>WhatsApp</label>
                  <input
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Facebook</label>
                  <input
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>YouTube</label>
                  <input
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Telegram</label>
                  <input
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Twitter / X</label>
                  <input
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Map Location URL</label>
                  <input
                    name="map"
                    value={formData.map}
                    onChange={handleChange}
                    className={styles.input}
                  />
                </div>
              </div>
            </div>

            {/* Admin / Plan (Optional, put at bottom of details) */}
            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Lock size={20} /> Admin & Plan
              </h3>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>NFC Tag ID</label>
                  <input
                    name="nfcId"
                    value={formData.nfcId}
                    onChange={handleChange}
                    placeholder="Unique Tag Serial"
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Plan Type</label>
                  <select
                    name="subscriptionType"
                    value={formData.subscriptionType || "unlimited"}
                    onChange={handleChange}
                    className={styles.select}
                    style={{ background: "#0f172a" }}
                  >
                    <option value="unlimited">
                      Lifetime Access (Unlimited)
                    </option>
                    <option value="limited">Limited Duration</option>
                  </select>
                </div>
                {formData.subscriptionType === "limited" && (
                  <>
                    <div className={styles.inputGroup}>
                      <label>Duration</label>
                      <select
                        name="subscriptionDuration"
                        value={formData.subscriptionDuration || "1"}
                        onChange={handleChange}
                        className={styles.select}
                        style={{ background: "#0f172a" }}
                      >
                        <option value="1">1 Year</option>
                        <option value="2">2 Years</option>
                        <option value="3">3 Years</option>
                        <option value="4">4 Years</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Start Date</label>
                      <input
                        type="date"
                        name="subscriptionStart"
                        value={
                          formData.subscriptionStart
                            ? formData.subscriptionStart.split("T")[0]
                            : new Date().toISOString().split("T")[0]
                        }
                        onChange={handleChange}
                        className={styles.input}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* Tab 2: Appearance */}
        {activeTab === "appearance" && (
          <>
            {/* Profile Layout Section */}
            <div className={styles.formSection}>
              <h3 className={styles.sectionTitle}>
                <LayoutTemplate size={20} /> Profile Layout
              </h3>

              <div className={styles.inputGroup}>
                <select
                  name="layout"
                  value={formData.layout || "classic"}
                  onChange={handleChange}
                  className={styles.select}
                  style={{ background: "#0f172a" }}
                >
                  <option value="classic">Classic Layout</option>
                  <option value="modern">Modern Layout</option>
                  <option value="minimal">Minimal Layout</option>
                  <option value="custom">Custom Layout</option>
                </select>
              </div>

              {formData.layout === "custom" && (
                <div
                  style={{
                    marginTop: "1rem",
                    padding: "1.25rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      marginBottom: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Custom HTML Override
                  </h4>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Provide full custom HTML to completely override the default
                    client profile template.
                  </p>

                  <div className={styles.inputGroup}>
                    <label>Custom HTML Code</label>
                    <textarea
                      value={formData.customTheme?.customHtml || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customTheme: {
                            ...formData.customTheme,
                            customHtml: e.target.value,
                          },
                        })
                      }
                      className={styles.textarea}
                      rows={12}
                      placeholder="<!-- Paste your full custom HTML layout here -->"
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.85rem",
                        whiteSpace: "pre",
                        overflowX: "auto",
                      }}
                    />
                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "0.8rem",
                        marginTop: "0.5rem",
                        lineHeight: "1.4",
                      }}
                    >
                      Note: You must manually enter the client's information
                      inside your custom HTML as this completely overrides the
                      template.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className={`${styles.formSection} ${styles.themeSection}`}>
              <h3 className={styles.sectionTitle}>
                <Palette size={20} /> Color Theme
              </h3>
              <div
                className={styles.inputGroup}
                style={{
                  opacity: formData.layout === "custom" ? 0.5 : 1,
                  pointerEvents: formData.layout === "custom" ? "none" : "auto",
                }}
              >
                <select
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  className={styles.select}
                  style={{ background: "#0f172a" }}
                  disabled={formData.layout === "custom"}
                >
                  <option value="dark">Dark Theme (Default)</option>
                  <option value="light">Light Theme</option>
                  <option value="blue">Blue Corporate</option>
                  <option value="custom">Custom Theme</option>
                </select>
                {formData.layout === "custom" && (
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.8rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Color theme is overridden by your custom layout settings.
                  </p>
                )}
              </div>

              {/* Custom Theme Colors block (for Custom Theme or Custom Layout) */}
              {(formData.theme === "custom" ||
                formData.layout === "custom") && (
                <div
                  style={{
                    marginTop: "1.5rem",
                    padding: "1.25rem",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                  }}
                >
                  <h4
                    style={{
                      color: "white",
                      marginBottom: "0.5rem",
                      fontSize: "1rem",
                    }}
                  >
                    Custom Theme Colors
                  </h4>
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "0.85rem",
                      marginBottom: "1rem",
                    }}
                  >
                    Define specific colors and stylesheet for this specific
                    client.
                  </p>

                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label>Background Color</label>
                      <input
                        type="color"
                        value={formData.customTheme?.background || "#0f172a"}
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
                        style={{
                          padding: "0.2rem",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Text Color</label>
                      <input
                        type="color"
                        value={formData.customTheme?.textPrimary || "#ffffff"}
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
                        style={{
                          padding: "0.2rem",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Accent Color</label>
                      <input
                        type="color"
                        value={formData.customTheme?.accentColor || "#60a5fa"}
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
                        style={{
                          padding: "0.2rem",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Button Background</label>
                      <input
                        type="color"
                        value={formData.customTheme?.buttonBg || "#3b82f6"}
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
                        style={{
                          padding: "0.2rem",
                          height: "45px",
                          cursor: "pointer",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className={styles.inputGroup}
                    style={{ marginTop: "1rem" }}
                  >
                    <label>Custom CSS (Optional)</label>
                    <textarea
                      value={formData.customTheme?.customCss || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          customTheme: {
                            ...formData.customTheme,
                            customCss: e.target.value,
                          },
                        })
                      }
                      className={styles.textarea}
                      rows={4}
                      placeholder="/* Add client-specific custom CSS styles here */"
                      style={{ fontFamily: "monospace", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </form>

      <MediaManager
        isOpen={showMedia}
        onClose={() => setShowMedia(false)}
        onSelect={handleMediaSelect}
      />
    </>
  );
}
