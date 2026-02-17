import { DataTypes } from "sequelize";
import sequelize from "@/lib/sequelize";

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
    // Individual social fields for convenience/searchability if needed, matching JSON structure
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

export default Client;
