import Link from "next/link";
import {
  Smartphone,
  Zap,
  Share2,
  ShieldCheck,
  TreePine,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <img
          src="https://justtapp.in/logo/Just%20Tap%20White%20Logo.png"
          alt="Just Tapp"
          className={styles.logo}
        />
        <div className={styles.navLinks}>
          <Link href="/admin" className={styles.navLink}>
            Admin
          </Link>
          <Link href="/c/1" className={styles.navLink}>
            Demo
          </Link>
          <Link href="/dashboard" className={styles.navBtn}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroTag}>The Future of Networking</div>

        <h1 className={styles.heroTitle}>
          Just Tap to Share
          <br /> Your Contact & Profile
        </h1>

        <p className={styles.heroSubtitle}>
          InfyTap cards are a showcase of every person for a professional
          networking. Tap & leave your contact profile in style, right where it
          belongs.
        </p>

        <div className={styles.heroButtons}>
          <Link href="/dashboard" className={styles.ctaBtn}>
            Create Your Card
          </Link>
          <Link href="/c/1" className={styles.secondaryBtn}>
            View Demo
          </Link>
        </div>

        {/* 3D Visual */}
        <div className={styles.cardShowcase}>
          <div className={styles.floatingCard}>Just Tapp</div>
          {/* Simple Phone Mockup */}
          <div className={styles.phoneMockup}>
            <div className={styles.phoneContent}>
              {/* Mimic a profile screen */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "#3b82f6",
                  marginBottom: 20,
                }}
              ></div>
              <div
                style={{
                  width: 120,
                  height: 16,
                  borderRadius: 8,
                  background: "#cbd5e1",
                  marginBottom: 10,
                }}
              ></div>
              <div
                style={{
                  width: 200,
                  height: 12,
                  borderRadius: 6,
                  background: "#64748b",
                  marginBottom: 40,
                }}
              ></div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  padding: 20,
                  width: "100%",
                }}
              >
                <div
                  style={{
                    height: 80,
                    background: "#1e293b",
                    borderRadius: 12,
                  }}
                ></div>
                <div
                  style={{
                    height: 80,
                    background: "#1e293b",
                    borderRadius: 12,
                  }}
                ></div>
                <div
                  style={{
                    height: 80,
                    background: "#1e293b",
                    borderRadius: 12,
                  }}
                ></div>
                <div
                  style={{
                    height: 80,
                    background: "#1e293b",
                    borderRadius: 12,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Cards */}
      <section className={styles.featuresSection}>
        <div className={styles.grid}>
          {[
            {
              title: "No App Required",
              desc: "Your clients don't need any app to view your profile. Just tap and share instantly.",
              icon: Smartphone,
              color: "#3b82f6",
            },
            {
              title: "Update Anytime",
              desc: "Change your details in real-time without re-printing your card. Always up to date.",
              icon: Zap,
              color: "#a855f7",
            },
            {
              title: "Secure & Private",
              desc: "You control what you share. Enable direct link mode or show your full profile.",
              icon: ShieldCheck,
              color: "#10b981",
            },
          ].map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <f.icon
                size={32}
                color={f.color}
                style={{ marginBottom: "1rem" }}
              />
              <h3
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "0.5rem",
                  fontWeight: 700,
                }}
              >
                {f.title}
              </h3>
              <p style={{ color: "#94a3b8" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepNum}>1</div>
            <h3>Order Card</h3>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
              Customize and order your NFC card from our store.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>2</div>
            <h3>Create Profile</h3>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
              Setup your digital profile with contact info, social links, and
              more.
            </p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNum}>3</div>
            <h3>Tap & Share</h3>
            <p style={{ color: "#94a3b8", marginTop: "0.5rem" }}>
              Tap your card on any smartphone to instantly share your profile.
            </p>
          </div>
        </div>
      </section>

      {/* Sustainability Section aligned with ref content */}
      <section
        style={{
          padding: "6rem 2rem",
          background: "linear-gradient(to bottom, #0b1120, #0f172a)",
          textAlign: "center",
        }}
      >
        <TreePine size={48} color="#4ade80" style={{ marginBottom: "1rem" }} />
        <h2 className={styles.sectionTitle} style={{ marginBottom: "1rem" }}>
          Saving the Planet
        </h2>
        <p
          style={{
            color: "#94a3b8",
            maxWidth: "600px",
            margin: "0 auto",
            fontSize: "1.1rem",
          }}
        >
          With every Tap, you take one step toward saving 7.2 million trees cut
          down for paper business cards every year.
        </p>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link href="#" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="#" className={styles.footerLink}>
            Terms of Service
          </Link>
          <Link href="#" className={styles.footerLink}>
            Support
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Just Tapp. All rights reserved.</p>
      </footer>
    </div>
  );
}
