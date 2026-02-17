import { Sequelize } from "sequelize";
import path from "path";

// Note: In Next.js, process.env is automatically loaded for variables starting with NEXT_PUBLIC_.
// For server-side only variables (like DB credentials), they are also available if defined in .env
// No need for explicit dotenv.config() in Next.js usually, but good to have if running standalone scripts.

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
    dialect: dialect,
    storage: storage,
    logging: false,
  },
);

export default sequelize;
