import Link from "next/link";
import {
  Smartphone,
  Zap,
  Share2,
  ShieldCheck,
  TreePine,
  CreditCard,
  ChevronRight,
  Wifi,
  Globe,
  Repeat,
  Layout,
} from "lucide-react";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img
            src="/assets/logo-white.png"
            alt="Just Tapp"
            className={styles.logo}
          />
        </div>
        <div className={styles.navLinks}>
          <Link href="/c/1" className={styles.navLink}>
            Demo Profile
          </Link>
          <Link href="/admin" className={styles.navBtn}>
            Login / Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>
            <Wifi size={14} className={styles.pulseIcon} />
            The Future of Networking is Here
          </div>

          <h1 className={styles.heroTitle}>
            Share Who You Are <br />
            <span className={styles.gradientText}>With Just One Tap.</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Upgrade to the smart business card that instantly shares your
            contact info, social media, and portfolio. No app needed. Works on
            iPhone & Android.
          </p>

          <div className={styles.heroButtons}>
            <Link href="/shop" className={styles.ctaBtn}>
              Get Your Card <ChevronRight size={18} />
            </Link>
            <Link href="/c/1" className={styles.secondaryBtn}>
              See How It Works
            </Link>
          </div>
        </div>

        {/* 3D Visual / Hero Image */}
        <div className={styles.heroVisual}>
          <div className={styles.glowingOrb}></div>
          <div className={styles.cardMockup}>
            <div className={styles.cardChip}></div>
            <div className={styles.cardLogo}>Just Tapp</div>
            <div className={styles.cardNfcIcon}>
              <Wifi size={24} color="white" />
            </div>
          </div>
        </div>
      </section>

      {/* Why NFC? Benefits Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Why Switch to <span className={styles.highlight}>NFC?</span>
          </h2>
          <p className={styles.sectionSub}>
            Paper cards are outdated. Here is why professionals are switching to
            Just Tapp.
          </p>
        </div>

        <div className={styles.grid}>
          {[
            {
              title: "Instant Sharing",
              desc: "Zero friction. Tap your card on any phone and your profile opens instantly in their browser.",
              icon: Zap,
              color: "#eab308", // Yellow
            },
            {
              title: "Works Everywhere",
              desc: "No app required for you or the receiver. Compatible with all modern iPhones and Androids.",
              icon: Globe,
              color: "#3b82f6", // Blue
            },
            {
              title: "Always Up-to-Date",
              desc: "Changed jobs or phone number? Update your profile anytime from your dashboard. No re-printing.",
              icon: Repeat,
              color: "#a855f7", // Purple
            },
            {
              title: "Digital Portfolio",
              desc: "Share more than just a number. Link your website, LinkedIn, Instagram, and files in one place.",
              icon: Layout,
              color: "#ec4899", // Pink
            },
            {
              title: "Eco-Friendly",
              desc: "One smart card replaces thousands of paper cards. Save trees and reduce waste.",
              icon: TreePine,
              color: "#22c55e", // Green
            },
            {
              title: "Secure & Private",
              desc: "You control your data. Choose to share your full profile or just save a contact directly.",
              icon: ShieldCheck,
              color: "#06b6d4", // Cyan
            },
          ].map((f, i) => (
            <div key={i} className={styles.featureCard}>
              <div
                className={styles.iconWrapper}
                style={{ background: `${f.color}20` }}
              >
                <f.icon size={28} color={f.color} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.steps}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>01</div>
            <h3>Order Your Card</h3>
            <p>
              Choose from our premium matte, metal, or wood finishes. Custom
              branding available.
            </p>
          </div>
          <div className={styles.stepConnector}>
            <ChevronRight size={32} color="#475569" />
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>02</div>
            <h3>Create Profile</h3>
            <p>
              Scan the code to set up your account. Add your photo, bio, and
              social links in minutes.
            </p>
          </div>
          <div className={styles.stepConnector}>
            <ChevronRight size={32} color="#475569" />
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>03</div>
            <h3>Tap & Connect</h3>
            <p>
              You are ready! Tap your card on any phone to share your digital
              identity instantly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2>Ready to upgrade your networking game?</h2>
          <p>Join thousands of professionals using Just Tapp today.</p>
          <Link href="/shop" className={styles.primaryBtn}>
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span
              style={{ color: "white", fontWeight: "700", fontSize: "1.2rem" }}
            >
              Just Tapp
            </span>
            <p>The last business card you will ever need.</p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="#">Features</Link>
            <Link href="#">Pricing</Link>
            <Link href="#">Support</Link>
            <Link href="/admin">Admin Login</Link>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Just Tapp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
