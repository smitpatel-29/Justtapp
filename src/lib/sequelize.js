import { Sequelize } from "sequelize";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

// Allow SQLite fallback if no DB credentials provided
const dialect = process.env.DB_DIALECT || "sqlite";
const storage =
  dialect === "sqlite"
    ? path.join(process.cwd(), "database.sqlite")
    : undefined;

const sequelize = new Sequelize(
  process.env.DB_NAME || "database",
  process.env.DB_USER || "user",
  process.env.DB_PASS || "password",
  {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    dialect: dialect,
    storage: storage,
    logging: isProduction ? false : console.log,
    dialectOptions: {
      connectTimeout: 30000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

// Test the connection and log result for debugging
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connection established successfully.");
  })
  .catch((err) => {
    console.error("❌ Unable to connect to the database:", err.message);
  });

export default sequelize;
