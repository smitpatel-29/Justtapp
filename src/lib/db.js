import Client from "@/models/Client";

export async function getClients() {
  try {
    const clients = await Client.findAll();
    return clients.map((c) => c.toJSON());
  } catch (error) {
    console.error("Error fetching clients:", error);
    return [];
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
    const newClient = await Client.create({
      ...clientData,
      id: clientData.id || Date.now().toString(), // Fallback ID generation if none provided
    });
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
