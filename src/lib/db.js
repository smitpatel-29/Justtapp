import Client from "@/models/Client";
import crypto from "crypto";

// Sync database: creates table if not exists, does NOT alter existing tables
// (avoids "too many keys" errors on production with pre-created tables)
Client.sync({ force: false }).catch((err) =>
  console.error("Database sync error:", err),
);

import Admin from "@/models/Admin";

export function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

Admin.sync({ force: false }).then(async () => {
  try {
    const admin = await Admin.findOne({ where: { username: "Admin" } });
    if (!admin) {
      await Admin.create({
        username: "Admin",
        password: hashPassword("Admin123"),
      });
      console.log("Default Admin created.");
    }
  } catch (err) {
    if (err.name !== 'SequelizeUniqueConstraintError') {
      console.error("Admin sync error:", err);
    }
  }
});

import { Op } from "sequelize";

export async function getClients(isOldClient = false) {
  try {
    const clients = await Client.findAll({
      where: {
        isOldClient: isOldClient ? true : { [Op.not]: true },
      },
    });
    return clients.map((c) => c.toJSON());
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
  }
}

export async function getDeletedClients(isOldClient = false) {
  try {
    const clients = await Client.findAll({
      where: {
        deletedAt: { [Op.ne]: null },
        isOldClient: isOldClient ? true : { [Op.not]: true },
      },
      paranoid: false,
    });
    return clients.map((c) => c.toJSON());
  } catch (error) {
    console.error("Error fetching deleted clients:", error);
    return [];
  }
}

export async function restoreClient(id) {
  try {
    await Client.restore({ where: { id } });
    return true;
  } catch (error) {
    console.error("Error restoring client:", error);
    return false;
  }
}

export async function permanentDeleteClient(id) {
  try {
    // Force delete (hard delete)
    const deleted = await Client.destroy({
      where: { id },
      force: true,
    });
    return deleted > 0;
  } catch (error) {
    console.error("Error permanently deleting client:", error);
    return false;
  }
}

export async function getClientById(id) {
  try {
    const client = await Client.findByPk(id);
    return client ? client.toJSON() : null;
  } catch (error) {
    console.error("Error fetching client:", error);
    return null;
  }
}

export async function saveClient(clientData) {
  try {
    // Handle empty nfcId or slug as null to avoid unique constraint violations
    if (!clientData.nfcId) {
      clientData.nfcId = null;
    }
    if (!clientData.customSlug) {
      clientData.customSlug = null;
    }

    if (clientData.id) {
      // Update existing
      const [updated] = await Client.update(clientData, {
        where: { id: clientData.id },
      });
      if (updated) {
        return await getClientById(clientData.id);
      }
    }

    // Create new
    // If id is not provided, let the database auto-increment it
    const createData = { ...clientData };
    if (!createData.id) {
      delete createData.id;
    }

    const newClient = await Client.create(createData);
    return newClient.toJSON();
  } catch (error) {
    console.error("Error saving client:", error);
    throw error;
  }
}

export async function deleteClient(id) {
  try {
    const deleted = await Client.destroy({
      where: { id },
    });
    return deleted > 0;
  } catch (error) {
    console.error("Error deleting client:", error);
    return false;
  }
}

export async function loginAdmin(username, password) {
  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return false;
    
    // In db.js hashPassword handles the plain text password
    const hashed = hashPassword(password);
    return admin.password === hashed;
  } catch (error) {
    console.error("Error logging in admin:", error);
    return false;
  }
}

export async function getAdmins() {
  try {
    const admins = await Admin.findAll({
      attributes: ["id", "username", "createdAt"],
    });
    return admins.map((a) => a.toJSON());
  } catch (error) {
    console.error("Error fetching admins:", error);
    return [];
  }
}

export async function createAdmin(username, password) {
  try {
    const existing = await Admin.findOne({ where: { username } });
    if (existing) throw new Error("Username already exists");

    const newAdmin = await Admin.create({
      username,
      password: hashPassword(password),
    });
    return { id: newAdmin.id, username: newAdmin.username };
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
}

export async function deleteAdmin(id) {
  try {
    const count = await Admin.count();
    if (count <= 1) {
      throw new Error("Cannot delete the last admin");
    }
    const deleted = await Admin.destroy({ where: { id } });
    return deleted > 0;
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
}
