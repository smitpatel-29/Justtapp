"use client";

import {
  Mail,
  Phone,
  Globe,
  Linkedin,
  Github,
  Download,
  Share2,
  Instagram,
  Twitter,
  MapPin,
  CheckCircle,
  ExternalLink,
  QrCode,
  Facebook,
  Youtube,
  MessageCircle,
  Send,
  Video,
  Map,
  Languages,
} from "lucide-react";
import styles from "./ProfileView.module.css";
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

// Language Dictionary
const translations = {
  en: {
    saveContact: "Save Contact",
    email: "Email",
    phone: "Phone",
    website: "Website",
    address: "Address",
    visitWebsite: "Visit Website",
    contact: "Contact",
    connect: "Connect",
    shareProfile: "Share Profile",
    scanToView: "Scan to view",
    close: "Close",
    createdWith: "Created with",
    profileLinkCopied: "Profile link copied!",
  },
  hi: {
    saveContact: "संपर्क सहेजें",
    email: "ईमेल",
    phone: "फ़ोन",
    website: "वेबसाइट",
    address: "पता",
    visitWebsite: "वेबसाइट पर जाएं",
    contact: "संपर्क",
    connect: "जुड़ें",
    shareProfile: "प्रोफ़ाइल साझा करें",
    scanToView: "स्कैन करें",
    close: "बंद करें",
    createdWith: "के साथ बनाया गया",
    profileLinkCopied: "लिंक कॉपी किया गया!",
  },
  gu: {
    saveContact: "સંપર્ક સાચવો",
    email: "ઇમેઇલ",
    phone: "ફોન",
    website: "વેબસાઇટ",
    address: "સરનામું",
    visitWebsite: "વેબસાઇટ જુઓ",
    contact: "સંપર્ક",
    connect: "જોડાવો",
    shareProfile: "પ્રોફાઇલ શેર કરો",
    scanToView: "સ્કેન કરો",
    close: "બંધ કરો",
    createdWith: "દ્વારા બનાવેલ",
    profileLinkCopied: "લિંક કોપી થઈ!",
  },
  mr: {
    saveContact: "संपर्क जतन करा",
    email: "ईमेल",
    phone: "फोन",
    website: "वेबसाइट",
    address: "पत्ता",
    visitWebsite: "वेबसाइटला भेट द्या",
    contact: "संपर्क",
    connect: "जोडा",
    shareProfile: "प्रोफाइल शेअर करा",
    scanToView: "स्कॅन करा",
    close: "बंद करा",
    createdWith: "सह तयार केले",
    profileLinkCopied: "लिंक कॉपी केली!",
  },
  ta: {
    saveContact: "தொடர்பை சேமி",
    email: "மின்னஞ்சல்",
    phone: "தொலைபேசி",
    website: "இணையதளம்",
    address: "முகவரி",
    visitWebsite: "இணையதளத்தைப் பார்வையிடவும்",
    contact: "தொடர்பு",
    connect: "இணைக்கவும்",
    shareProfile: "சுயவிவரத்தைப் பகிரவும்",
    scanToView: "ஸ்கேன் செய்யவும்",
    close: "மூடு",
    createdWith: "உருவாக்கப்பட்டது",
    profileLinkCopied: "இணைப்பு நகலெடுக்கப்பட்டது!",
  },
  te: {
    saveContact: "కాంటాక్ట్ సేవ్ చేయండి",
    email: "ఇమెయిల్",
    phone: "ఫోన్",
    website: "వెబ్‌సైట్",
    address: "చిరునామా",
    visitWebsite: "వెబ్‌సైట్‌ను సందర్శించండి",
    contact: "సంప్రదించండి",
    connect: "కనెక్ట్",
    shareProfile: "ప్రొఫైల్ షేర్ చేయండి",
    scanToView: "స్కాన్ చేయండి",
    close: "మూసివేయండి",
    createdWith: "తో సృష్టించబడింది",
    profileLinkCopied: "లింక్ కాపీ చేయబడింది!",
  },
  bn: {
    saveContact: "যোগাযোগ সংরক্ষণ করুন",
    email: "ইমেল",
    phone: "ফোন",
    website: "ওয়েবসাইট",
    address: "ঠিকানা",
    visitWebsite: "ওয়েবসাইট দেখুন",
    contact: "যোগাযোগ",
    connect: "সংযোগ",
    shareProfile: "প্র প্রোফাইল শেয়ার করুন",
    scanToView: "স্ক্যান করুন",
    close: "বন্ধ করুন",
    createdWith: "দ্বারা তৈরি",
    profileLinkCopied: "লিঙ্ক কপি করা হয়েছে!",
  },
  kn: {
    saveContact: "ಸಂಪರ್ಕ ಉಳಿಸಿ",
    email: "ಇಮೇಲ್",
    phone: "ದೂರವಾಣಿ",
    website: "ವೆಬ್‌ಸೈಟ್",
    address: "ವಿಳಾಸ",
    visitWebsite: "ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ",
    contact: "ಸಂಪರ್ಕಿಸಿ",
    connect: "ಸಂಪರ್ಕ",
    shareProfile: "ಪ್ರೊಫೈಲ್ ಹಂಚಿಕೊಳ್ಳಿ",
    scanToView: "ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    close: "ಮುಚ್ಚಿ",
    createdWith: "ರಚಿಸಲಾಗಿದೆ",
    profileLinkCopied: "ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!",
  },
  ml: {
    saveContact: "കോൺടാക്റ്റ് സേവ് ചെയ്യുക",
    email: "ഇമെയിൽ",
    phone: "ഫോൺ",
    website: "വെബ്സൈറ്റ്",
    address: "വിലാസം",
    visitWebsite: "വെബ്സൈറ്റ് സന്ദർശിക്കുക",
    contact: "ബന്ധപ്പെടുക",
    connect: "ബന്ധിപ്പിക്കുക",
    shareProfile: "പ്രൊഫൈൽ പങ്കിടുക",
    scanToView: "സ്കാൻ ചെയ്യുക",
    close: "അടയ്ക്കുക",
    createdWith: "രൂപകൽപ്പന ചെയ്തത്",
    profileLinkCopied: "ലിങ്ക് പകർത്തി!",
  },
};

const languageNames = {
  en: "English",
  hi: "हिन्दी", // Hindi
  gu: "ગુજરાતી", // Gujarati
  mr: "मराठी", // Marathi
  ta: "தமிழ்", // Tamil
  te: "తెలుగు", // Telugu
  bn: "বাংলা", // Bengali
  kn: "ಕನ್ನಡ", // Kannada
  ml: "മലയാളം", // Malayalam
};

export default function ProfileView({ client }) {
  const [showQr, setShowQr] = useState(false);
  const [lang, setLang] = useState("en");
  const [showLangMenu, setShowLangMenu] = useState(false);

  if (!client) return null;

  const t = translations[lang] || translations["en"];

  const handleSaveContact = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${client.name}
TITLE:${client.title}
ORG:${client.company}
EMAIL:${client.email}
TEL:${client.phone}
URL:${client.website}
ADR:;;${client.address || ""};;;;
NOTE:${client.bio}
END:VCARD`;

    const blob = new Blob([vCard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${client.name.replace(" ", "_")}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: client.name,
          text: `Connect with ${client.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t.profileLinkCopied);
    }
  };

  const getSocialIcon = (platform) => {
    if (!platform) return Globe;
    const p = platform.toLowerCase();
    if (p.includes("linkedin")) return Linkedin;
    if (p.includes("github")) return Github;
    if (p.includes("instagram")) return Instagram;
    if (p.includes("twitter") || p.includes("x")) return Twitter;
    if (p.includes("facebook")) return Facebook;
    if (p.includes("youtube")) return Youtube;
    if (p.includes("whatsapp")) return MessageCircle;
    if (p.includes("telegram")) return Send;
    if (p.includes("tiktok")) return Video;
    if (p.includes("snapchat")) return MessageCircle;
    if (p.includes("map") || p.includes("location")) return Map;

    return Globe;
  };

  // Theme Logic
  const theme = client.theme || "dark";
  const customTheme = client.customTheme || {};

  const defaultGradient = `linear-gradient(135deg, hsl(${client.name.length * 20}, 70%, 50%), hsl(${client.name.length * 20 + 40}, 80%, 60%))`;
  const coverStyle = client.coverImage
    ? { backgroundImage: `url(${client.coverImage})` }
    : { background: defaultGradient };

  const getThemeStyles = () => {
    const baseStyles = {};

    if (theme === "light") {
      return {
        "--background": "#f1f5f9",
        "--container-bg": "white",
        "--text-primary": "#0f172a",
        "--text-secondary": "#64748b",
        "--card-bg": "#e2e8f0",
        "--card-hover": "#cbd5e1",
        "--button-text": "white",
        "--header-gradient-end": "rgba(255,255,255,1)",
      };
    } else if (theme === "blue") {
      return {
        "--background": "#0f172a",
        "--container-bg": "linear-gradient(to bottom, #1e3a8a, #172554)",
        "--text-primary": "white",
        "--text-secondary": "#bfdbfe",
        "--card-bg": "rgba(255,255,255,0.1)",
        "--card-hover": "rgba(255,255,255,0.2)",
        "--header-gradient-end": "rgba(30, 58, 138, 0)",
      };
    } else if (theme === "custom") {
      return {
        "--background": customTheme.background || "#0f172a",
        "--container-bg": customTheme.containerBg || "#0f172a",
        "--text-primary": customTheme.textPrimary || "white",
        "--text-secondary": customTheme.textSecondary || "#94a3b8",
        "--card-bg": customTheme.cardBg || "rgba(255,255,255,0.05)",
        "--accent-color": customTheme.accentColor || "#60a5fa",
        "--button-bg": customTheme.buttonBg || "#3b82f6",
        "--header-gradient-end": "rgba(0,0,0,0)",
      };
    }
    // Default Dark
    return {
      "--background": "#0f172a",
      "--container-bg": "#000000",
      "--text-primary": "white",
      "--text-secondary": "#94a3b8",
      "--card-bg": "rgba(255,255,255,0.05)",
      "--header-gradient-end": "rgba(0,0,0,1)",
    };
  };

  useEffect(() => {
    if (showQr) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showQr]);

  return (
    <div className={styles.wrapper} style={getThemeStyles()}>
      <div className={styles.mobileContainer}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.coverImage} style={coverStyle}>
            <button className={styles.qrBtn} onClick={() => setShowQr(!showQr)}>
              <QrCode size={20} />
            </button>
            {/* Language Switcher Button */}
            <button
              className={styles.langBtn}
              onClick={() => setShowLangMenu(!showLangMenu)}
            >
              <Languages size={20} />
            </button>
          </div>

          {/* Language Menu */}
          {showLangMenu && (
            <div
              className={styles.langMenuOverlay}
              onClick={() => setShowLangMenu(false)}
            >
              <div className={styles.langMenu}>
                {Object.entries(languageNames).map(([code, name]) => (
                  <button
                    key={code}
                    className={`${styles.langOption} ${lang === code ? styles.activeLang : ""}`}
                    onClick={() => {
                      setLang(code);
                      setShowLangMenu(false);
                    }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.profileSection}>
            <div className={styles.avatarWrapper}>
              <img
                src={client.avatar}
                alt={client.name}
                className={styles.avatar}
              />
              <div className={styles.verifiedBadge}>
                <CheckCircle size={16} fill="#3b82f6" color="white" />
              </div>
            </div>

            <div className={styles.info}>
              <h1 className={styles.name}>{client.name}</h1>
              <p className={styles.title}>{client.title}</p>
              <p className={styles.company}>{client.company}</p>
              <p className={styles.bio}>{client.bio}</p>
            </div>

            <div className={styles.headerActions}>
              <button onClick={handleSaveContact} className={styles.primaryBtn}>
                {t.saveContact}
              </button>
              <button onClick={handleShare} className={styles.iconBtn}>
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Bento Grid Content */}
        <div className={styles.content}>
          <div className={styles.sectionLabel}>{t.contact}</div>
          <div className={styles.grid}>
            {client.email && (
              <a
                href={`mailto:${client.email}`}
                className={`${styles.card} ${styles.contactCard}`}
              >
                <div
                  className={styles.iconBox}
                  style={{
                    background: "rgba(59, 130, 246, 0.2)",
                    color: "#60a5fa",
                  }}
                >
                  <Mail size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{t.email}</span>
                  <span className={styles.cardValue}>{client.email}</span>
                </div>
              </a>
            )}

            {client.phone && (
              <a
                href={`tel:${client.phone}`}
                className={`${styles.card} ${styles.contactCard}`}
              >
                <div
                  className={styles.iconBox}
                  style={{
                    background: "rgba(16, 185, 129, 0.2)",
                    color: "#34d399",
                  }}
                >
                  <Phone size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{t.phone}</span>
                  <span className={styles.cardValue}>{client.phone}</span>
                </div>
              </a>
            )}

            {client.address && (
              <div className={`${styles.card} ${styles.contactCard}`}>
                <div
                  className={styles.iconBox}
                  style={{
                    background: "rgba(236, 72, 153, 0.2)",
                    color: "#f472b6",
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{t.address}</span>
                  <span
                    className={styles.cardValue}
                    style={{ fontSize: "0.9rem" }}
                  >
                    {client.address}
                  </span>
                </div>
              </div>
            )}

            {client.website && (
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div
                  className={styles.iconBox}
                  style={{
                    background: "rgba(139, 92, 246, 0.2)",
                    color: "#a78bfa",
                  }}
                >
                  <Globe size={20} />
                </div>
                <div className={styles.cardText}>
                  <span className={styles.cardLabel}>{t.website}</span>
                  <span className={styles.cardValue}>
                    {client.website
                      .replace(/^https?:\/\//, "")
                      .replace(/\/$/, "")}
                  </span>
                </div>
                <div style={{ marginLeft: "auto", opacity: 0.5 }}>
                  <ExternalLink size={16} />
                </div>
              </a>
            )}
          </div>

          <div className={styles.sectionLabel}>{t.connect}</div>
          <div className={styles.socialGrid}>
            {client.socials?.map((social, idx) => {
              const Icon = getSocialIcon(social.platform);
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialCard}
                >
                  <Icon size={24} />
                  <span>{social.platform}</span>
                </a>
              );
            })}
          </div>
        </div>

        <footer className={styles.footer}>
          <a href="/" className={styles.branding}>
            <span style={{ opacity: 0.7 }}>{t.createdWith}</span>{" "}
            <img
              src="https://justtapp.in/logo/Just%20Tap%20White%20Logo.png"
              alt="Just Tapp"
              style={{
                height: "24px",
                verticalAlign: "middle",
                marginLeft: "5px",
              }}
            />
          </a>
        </footer>

        {/* QR Code Modal Overlay */}
        {showQr && (
          <div className={styles.modalOverlay} onClick={() => setShowQr(false)}>
            <div className={styles.qrCard} onClick={(e) => e.stopPropagation()}>
              <h3>{t.shareProfile}</h3>
              <div className={styles.qrPlaceholder}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <QRCodeCanvas
                    value={
                      typeof window !== "undefined" ? window.location.href : ""
                    }
                    size={200}
                    bgColor={"#ffffff"}
                    fgColor={"#000000"}
                    level={"L"}
                  />
                </div>
              </div>
              <p>
                {t.scanToView} {client.name}
              </p>
              <button
                className={styles.closeBtn}
                onClick={() => setShowQr(false)}
              >
                {t.close}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
