const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "user",
  process.env.DB_PASS || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
  }
);

const Client = sequelize.define("Client", {
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
  name: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING },
  company: { type: DataTypes.STRING },
  bio: { type: DataTypes.TEXT },
  avatar: { type: DataTypes.STRING },
  coverImage: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  website: { type: DataTypes.STRING },
  socials: { type: DataTypes.TEXT },
  nfcId: { type: DataTypes.STRING, unique: true },
  isOldClient: { type: DataTypes.BOOLEAN, defaultValue: false },
  customSlug: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  theme: { type: DataTypes.STRING, defaultValue: "dark" },
  layout: { type: DataTypes.STRING, defaultValue: "classic" },
  customTheme: { type: DataTypes.TEXT },
});

const dummyClients = [
  {
    name: "Alex Johnson",
    title: "Senior Executive",
    company: "Global Tech Solutions",
    bio: "Passionate about innovation and sustainable tech. Over 15 years in software architecture.",
    email: "alex.j@example.com",
    phone: "+91 9876543210",
    website: "https://example.com",
    theme: "dark",
    layout: "executive",
    nfcId: "EX-DARK-001",
    socials: JSON.stringify([
      { platform: "LinkedIn", url: "https://linkedin.com/alex" },
      { platform: "Twitter", url: "https://twitter.com/alex" }
    ])
  },
  {
    name: "Sarah Miller",
    title: "Creative Director",
    company: "Design Studio",
    bio: "Minimalism is the ultimate sophistication. Crafting digital experiences since 2012.",
    email: "sarah@design.studio",
    phone: "+91 9876543211",
    website: "https://design.studio",
    theme: "light",
    layout: "minimal",
    nfcId: "MIN-LIGHT-002",
    socials: JSON.stringify([
      { platform: "Instagram", url: "https://instagram.com/sarah" },
      { platform: "Facebook", url: "https://facebook.com/sarah" }
    ])
  },
  {
    name: "Rahul Sharma",
    title: "Project Manager",
    company: "BuildCorp Inc.",
    bio: "Bridging the gap between business and technology with efficient workflows.",
    email: "rahul@buildcorp.in",
    phone: "+91 9876543212",
    website: "https://buildcorp.in",
    theme: "blue",
    layout: "bento",
    nfcId: "BEN-BLUE-003",
    socials: JSON.stringify([
      { platform: "WhatsApp", url: "https://wa.me/919876543212" },
      { platform: "LinkedIn", url: "https://linkedin.com/rahul" }
    ])
  },
  {
    name: "Elena Petrova",
    title: "UX Researcher",
    company: "UserFirst Labs",
    bio: "User behavior enthusiast. Finding the stories behind the data.",
    email: "elena@userfirst.io",
    phone: "+91 9876543213",
    website: "https://userfirst.io",
    theme: "dark",
    layout: "modern",
    nfcId: "MOD-DARK-004",
    socials: JSON.stringify([
      { platform: "LinkedIn", url: "https://linkedin.com/elena" },
      { platform: "Youtube", url: "https://youtube.com/elena" }
    ])
  },
  {
    name: "Michael Chen",
    title: "Full Stack Developer",
    company: "Innovate.io",
    bio: "Building robust applications with modern stacks. Obsessed with clean code.",
    email: "michael@innovate.io",
    phone: "+91 9876543214",
    website: "https://innovate.io",
    theme: "custom",
    layout: "classic",
    nfcId: "CLA-CUST-005",
    customTheme: JSON.stringify({
      background: "#1a1a1a",
      containerBg: "#2d3436",
      textPrimary: "#fab1a0",
      accentColor: "#e17055",
      buttonBg: "#d63031"
    }),
    socials: JSON.stringify([
      { platform: "Github", url: "https://github.com/michael" },
      { platform: "X", url: "https://x.com/michael" }
    ])
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database.");
    
    // Sync without dropping existing data
    // await Client.sync({ alter: true });
    
    for (const data of dummyClients) {
      const [client, created] = await Client.findOrCreate({
        where: { nfcId: data.nfcId },
        defaults: data
      });
      
      if (created) {
        console.log(`Created client: ${data.name}`);
      } else {
        console.log(`Client ${data.name} already exists.`);
        // Update to ensure theme/layout are applied
        await client.update(data);
      }
    }
    
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await sequelize.close();
  }
}

seed();
