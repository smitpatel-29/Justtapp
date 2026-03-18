import { Sequelize } from "sequelize";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

// Allow SQLite fallback if no DB credentials provided
const dialect = process.env.DB_DIALECT || "sqlite";
const storage =
  dialect === "sqlite"
    ? path.join(process.cwd(), "database.sqlite")
    : undefined;

let sequelize;

if (!global.__db__) {
  global.__db__ = new Sequelize(
    process.env.DB_NAME || "database",
    process.env.DB_USER || "user",
    process.env.DB_PASS || "password",
    {
      host: process.env.DB_HOST || "localhost",
      port: parseInt(process.env.DB_PORT || "3306"),
      dialect: dialect,
      dialectModule: dialect === "mysql" ? require("mysql2") : undefined,
      storage: storage,
      logging: isProduction ? false : console.log,
      dialectOptions: {
        connectTimeout: 30000,
      },
      pool: {
        max: 3, // Very low max to prevent choking low-resource hostinger
        min: 0,
        acquire: 30000,
        idle: 5000, // Drop idle connections quickly to free up RAM
      },
    }
  );

  // Quick connectivity test
  global.__db__
    .authenticate()
    .then(() => console.log("✅ Database connected."))
    .catch((err) => console.error("❌ DB connection error:", err.message));
}

sequelize = global.__db__;

export default sequelize;
