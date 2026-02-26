"use client";
import Link from "next/link";
import { motion } from "framer-motion";
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
      {/* Global Glowing Background */}
      <div className={styles.globalGlow}>
        <div className={styles.ambientCircle1}></div>
        <div className={styles.ambientCircle2}></div>
        <div className={styles.ambientCircle3}></div>
        <div className={styles.ambientCircle4}></div>
      </div>

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
          <Link href="/admin" className={styles.navBtn}>
            Login / Admin
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.heroWrapper}>
        {/* Geometric Decorative Background */}
        <div className={styles.bgGlowArea}>
          <div className={styles.glowCircle1}></div>
          <div className={styles.glowCircle2}></div>
          <div className={styles.glowCircle3}></div>
        </div>
        <div className={styles.heroSection}>
          <motion.div
            className={styles.heroContent}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={styles.heroTag}>
              <Wifi size={14} className={styles.pulseIcon} />
              The Future of Networking is Here
            </div>

            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Share Who You Are <br />
              <span className={styles.gradientText}>With Just One Tap.</span>
            </motion.h1>

            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Upgrade to the smart business card that instantly shares your
              contact info, social media, and portfolio. No app needed. Works on
              iPhone & Android.
            </motion.p>

            <motion.div
              className={styles.heroButtons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/shop" className={styles.ctaBtn}>
                Get Your Card <ChevronRight size={18} />
              </Link>
              <a href="#how-it-works" className={styles.secondaryBtn}>
                See How It Works
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Visual / Hero Image */}
          <motion.div
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className={styles.glowingOrb}></div>
            <motion.div
              className={styles.floatingShape1}
              animate={{ y: [0, -20, 0], rotate: [15, 20, 15] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <motion.div
              className={styles.floatingShape2}
              animate={{ y: [0, 15, 0], rotate: [-10, -5, -10] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>

            <motion.div
              className={styles.cardMockup}
              animate={{
                y: [0, -15, 0],
                rotateX: [15, 10, 15],
                rotateY: [-15, -10, -15],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className={styles.cardGlassmorphism}></div>
              <div className={styles.cardChip}></div>
              <div className={styles.cardLogo}>Just Tapp</div>
              <div className={styles.cardNfcIcon}>
                <Wifi size={24} color="rgba(255,255,255,0.7)" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why NFC? Benefits Section */}
      <section className={styles.featuresSection}>
        <motion.div
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h2 className={styles.sectionTitle}>
            Why Switch to <span className={styles.highlight}>NFC?</span>
          </h2>
          <p className={styles.sectionSub}>
            Paper cards are outdated. Here is why professionals are switching to
            Just Tapp.
          </p>
        </motion.div>

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
              desc: "Changed jobs or phone number? Let us know, and we instantly update your card. No re-printing ever.",
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
              title: "Professionally Managed",
              desc: "Skip the technical hassle. Our team handles your profile updates securely so it always looks perfect.",
              icon: ShieldCheck,
              color: "#06b6d4", // Cyan
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className={styles.featureCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: i * 0.1 },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className={styles.featureCardBorder}></div>
              <div className={styles.featureCardContent}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    background: `${f.color}20`,
                    boxShadow: `0 0 20px ${f.color}40`,
                  }}
                >
                  <f.icon
                    size={28}
                    color={f.color}
                    className={styles.featureIcon}
                  />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className={styles.howItWorks}>
        <motion.h2
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <div className={styles.steps}>
          <motion.div
            className={styles.stepCard}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className={styles.stepCardGlowBorder}></div>
            <div className={styles.stepCardContent}>
              <div className={styles.stepIconContainer}>
                <CreditCard size={32} color="#60a5fa" />
              </div>
              <div className={styles.stepNumBg}>01</div>
              <h3 className={styles.stepTitle}>Order Your Card</h3>
              <p className={styles.stepDesc}>
                Choose from our premium matte, metal, or wood finishes. Custom
                branding available.
              </p>
            </div>
          </motion.div>

          <div className={styles.stepConnector}>
            <div className={styles.connectorLine}></div>
            <div className={styles.connectorDot}></div>
          </div>

          <motion.div
            className={styles.stepCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className={styles.stepCardGlowBorder}></div>
            <div className={styles.stepCardContent}>
              <div className={styles.stepIconContainer}>
                <Layout size={32} color="#a855f7" />
              </div>
              <div className={styles.stepNumBg}>02</div>
              <h3 className={styles.stepTitle}>We Setup Your Profile</h3>
              <p className={styles.stepDesc}>
                Submit your details to us, and our team will build your custom
                profile. We manage updates so you do not have to.
              </p>
            </div>
          </motion.div>

          <div className={styles.stepConnector}>
            <div className={styles.connectorLine}></div>
            <div className={styles.connectorDot}></div>
          </div>

          <motion.div
            className={styles.stepCard}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <div className={styles.stepCardGlowBorder}></div>
            <div className={styles.stepCardContent}>
              <div className={styles.stepIconContainer}>
                <Wifi size={32} color="#ec4899" />
              </div>
              <div className={styles.stepNumBg}>03</div>
              <h3 className={styles.stepTitle}>Tap & Connect</h3>
              <p className={styles.stepDesc}>
                You are ready! Tap your card on any phone to share your digital
                identity instantly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to upgrade your networking game?</h2>
          <p>Join thousands of professionals using Just Tapp today.</p>
          <Link href="/shop" className={styles.primaryBtn}>
            Get Started Now
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGlow}></div>
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogoWrapper}>
              <img
                src="/assets/logo-white.png"
                alt="Just Tapp"
                className={styles.footerLogo}
              />
            </div>
            <p>
              The last business card you will ever need. Empowering
              professionals to connect seamlessly in a digital world.
            </p>
          </div>

          <div className={styles.footerNav}>
            <div className={styles.footerColumn}>
              <h4>Company</h4>
              <Link href="/admin">Admin Login</Link>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Just Tapp. All rights reserved.</p>
          <div className={styles.footerLinksRow}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
