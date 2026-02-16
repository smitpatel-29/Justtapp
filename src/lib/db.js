import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src/data/clients.json");

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

// Initial seed data
const initialData = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Senior Developer",
    company: "Tech Solutions Inc.",
    bio: "Passionate about building scalable web applications and exploring new technologies.",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=0D8ABC&color=fff",
    coverImage:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80",
    email: "alex@example.com",
    address: "123 Business Park, Tech City, TC 50001",
    phone: "+1 (555) 123-4567",
    website: "https://alex.dev",
    socials: [
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
      { platform: "GitHub", url: "#" },
    ],
    nfcId: "nfc-001",
    password: "password", // In a real app, hash this!
  },
  {
    id: "2",
    name: "Sarah Smith",
    title: "Creative Director",
    company: "Design Studio",
    bio: "Creating visual experiences that matter.",
    avatar:
      "https://ui-avatars.com/api/?name=Sarah+Smith&background=E53935&color=fff",
    email: "sarah@design.studio",
    phone: "+1 (555) 987-6543",
    website: "https://sarah.design",
    socials: [
      { platform: "Instagram", url: "#" },
      { platform: "Dribbble", url: "#" },
    ],
    nfcId: "nfc-002",
    password: "password",
  },
];

export function getClients() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const fileData = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading DB:", error);
    return [];
  }
}

export function getClientById(id) {
  const clients = getClients();
  return clients.find((c) => c.id === id);
}

export function saveClient(client) {
  const clients = getClients();
  const index = clients.findIndex((c) => c.id === client.id);

  if (index !== -1) {
    // Update existing client
    clients[index] = { ...clients[index], ...client }; // Merge
  } else {
    // Add new client
    client.id = Date.now().toString(); // Simple ID generation
    clients.push(client);
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(clients, null, 2));
  return client;
}

export function deleteClient(id) {
  let clients = getClients();
  clients = clients.filter((c) => c.id !== id);
  fs.writeFileSync(DB_PATH, JSON.stringify(clients, null, 2));
  return true;
}
