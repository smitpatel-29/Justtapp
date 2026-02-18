const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env") });

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  },
);

// Define Client Model explicitly
const Client = sequelize.define(
  "Client",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    bio: DataTypes.TEXT,
    avatar: DataTypes.STRING,
    coverImage: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    website: DataTypes.STRING,
    nfcId: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    theme: { type: DataTypes.STRING, defaultValue: "dark" },
    customTheme: { type: DataTypes.JSON, defaultValue: {} },
    subscriptionType: { type: DataTypes.STRING, defaultValue: "limited" },
    subscriptionDuration: { type: DataTypes.STRING, defaultValue: "1" },
    subscriptionStart: DataTypes.STRING,
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    socials: { type: DataTypes.JSON, defaultValue: [] },
    linkedin: DataTypes.STRING,
    instagram: DataTypes.STRING,
    facebook: DataTypes.STRING,
    youtube: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
    telegram: DataTypes.STRING,
    tiktok: DataTypes.STRING,
    snapchat: DataTypes.STRING,
    map: DataTypes.STRING,
    twitter: DataTypes.STRING,
  },
  { timestamps: true, paranoid: true },
);

const dummyClients = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Senior Developer",
    company: "Tech Solutions",
    bio: "Full stack developer passionate about scalable systems.",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=1000",
    email: "alex@techsolutions.com",
    address: "123 Tech Blvd, Austin, TX",
    phone: "+15125550101",
    website: "https://alex.dev",
    nfcId: "nfc-001",
    active: true,
    socials: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: 2,
    name: "Sarah Smith",
    title: "UX Designer",
    company: "Creative Studio",
    bio: "Designing clean and intuitive user experiences.",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Smith&background=E53935&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000",
    email: "sarah@creative.com",
    phone: "+15125550102",
    website: "https://sarah.design",
    nfcId: "nfc-002",
    active: true,
    socials: [{ platform: "Instagram", url: "https://instagram.com" }],
  },
  {
    id: 3,
    name: "Michael Chen",
    title: "Product Manager",
    company: "Innovate Inc",
    bio: "Building products that users love.",
    avatar:
      "https://ui-avatars.com/api/?name=Michael+Chen&background=2E7D32&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000",
    email: "mike@innovate.com",
    phone: "+15125550103",
    website: "https://innovate.inc",
    nfcId: "nfc-003",
    active: true,
    socials: [{ platform: "Twitter", url: "https://twitter.com" }],
  },
  {
    id: 4,
    name: "Emily Davis",
    title: "Marketing Lead",
    company: "Growth Hackers",
    bio: "Driving growth through data-driven marketing.",
    avatar:
      "https://ui-avatars.com/api/?name=Emily+Davis&background=9C27B0&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000",
    email: "emily@growth.com",
    phone: "+15125550104",
    active: true,
    nfcId: "nfc-004",
    socials: [],
  },
  {
    id: 5,
    name: "David Wilson",
    title: "CTO",
    company: "Future Tech",
    bio: "Leading technology strategy for the future.",
    avatar:
      "https://ui-avatars.com/api/?name=David+Wilson&background=F57C00&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c54be3852f92?w=1000",
    email: "david@futuretech.com",
    phone: "+15125550105",
    active: false, // Testing deactivated status
    nfcId: "nfc-005",
    socials: [],
  },
  {
    id: 6,
    name: "Robert Brown",
    title: "Sales Director",
    company: "Global Corp",
    bio: "Driving revenue and building lasting partnerships.",
    avatar:
      "https://ui-avatars.com/api/?name=Robert+Brown&background=795548&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1000",
    email: "robert@globalcorp.com",
    phone: "+15125550106",
    active: true,
    nfcId: "nfc-006",
    socials: [{ platform: "LinkedIn", url: "https://linkedin.com" }],
  },
  {
    id: 7,
    name: "Jennifer Lee",
    title: "Content Strategist",
    company: "Media Buzz",
    bio: "Creating compelling narratives for brands.",
    avatar:
      "https://ui-avatars.com/api/?name=Jennifer+Lee&background=E91E63&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=1000",
    email: "jennifer@mediabuzz.com",
    phone: "+15125550107",
    active: true,
    nfcId: "nfc-007",
    socials: [
      { platform: "Instagram", url: "https://instagram.com" },
      { platform: "Twitter", url: "https://twitter.com" },
    ],
  },
  {
    id: 8,
    name: "William Taylor",
    title: "Operations Manager",
    company: "FastTrack Logistics",
    bio: "Optimizing workflows for maximum efficiency.",
    avatar:
      "https://ui-avatars.com/api/?name=William+Taylor&background=607D8B&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000",
    email: "william@fasttrack.com",
    phone: "+15125550108",
    active: true,
    nfcId: "nfc-008",
    socials: [{ platform: "WhatsApp", url: "https://whatsapp.com" }],
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB.");

    console.log("Connected to DB.");

    // Force sync to recreate table with correct schema (Integer ID + AutoIncrement)
    await sequelize.sync({ force: true });
    console.log("Database synced (force: true). Tables recreated.");

    // Use bulkCreate for faster seeding
    await Client.bulkCreate(dummyClients);

    console.log("Seeded 5 dummy clients successfully.");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await sequelize.close();
  }
}

seed();
// Trigger deployment: Wed Feb 18 12:19:07 IST 2026
