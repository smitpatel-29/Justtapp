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

// Define Client Model explicitly for migration script (avoiding import issues with ES modules)
// Define Client Model explicitly for migration script (avoiding import issues with ES modules)
const Client = sequelize.define(
  "Client",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,   
    },
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
    nfcId: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    theme: {
      type: DataTypes.STRING,
      defaultValue: "dark",
    },
    customTheme: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    subscriptionType: {
      type: DataTypes.STRING,
      defaultValue: "limited",
    },
    subscriptionDuration: {
      type: DataTypes.STRING,
      defaultValue: "1",
    },
    subscriptionStart: DataTypes.STRING,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    socials: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
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
  {
    timestamps: true,
  },
);

async function migrate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync database (force: true drops existing tables)
    await sequelize.sync({ force: true });
    console.log("Database synced.");

    // Load data from JSON
    const dataPath = path.join(__dirname, "../src/data/clients.json");
    if (fs.existsSync(dataPath)) {
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      if (data.length > 0) {
        await Client.bulkCreate(data);
        console.log(`Migrated ${data.length} clients successfully.`);
      } else {
        console.log("No clients found in JSON to migrate.");
      }
    } else {
      console.log("No clients.json file found to migrate.");
    }
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sequelize.close();
  }
}

migrate();
