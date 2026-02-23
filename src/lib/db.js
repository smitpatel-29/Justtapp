import Client from "@/models/Client";
import crypto from "crypto";

// Automatically sync database schema on import (safe for production if alter: true)
// This avoids needing complex migration steps for simple deployments
Client.sync({ alter: true }).catch((err) =>
  console.error("Database sync error:", err),
);

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
