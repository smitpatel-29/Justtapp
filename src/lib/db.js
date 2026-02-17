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

// In-memory cache for production (Vercel) where FS is read-only
let memoryClients = [...initialData];
let isLoaded = false;

export function getClients() {
  // If we already loaded into memory, use that (serves as cache)
  if (isLoaded) return memoryClients;

  // Try to load from file system (works in local dev)
  try {
    if (fs.existsSync(DB_PATH)) {
      const fileData = fs.readFileSync(DB_PATH, "utf-8");
      memoryClients = JSON.parse(fileData);
      isLoaded = true;
      return memoryClients;
    }
  } catch (error) {
    console.warn(
      "Could not read from FS (likely production environment), using initial/memory data:",
      error,
    );
  }

  // Fallback to initial data if file doesn't exist or can't be read
  return memoryClients;
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

  // Update memory
  memoryClients = clients;
  isLoaded = true;

  // Try to write to FS (will fail in production/Vercel)
  try {
    // Ensure dir exists before writing
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(DB_PATH, JSON.stringify(clients, null, 2));
  } catch (error) {
    // Ignore write errors in production (Read-only FS)
    console.warn(
      "Failed to write to DB file (expected in Vercel):",
      error.message,
    );
  }

  return client;
}

export function deleteClient(id) {
  let clients = getClients();
  clients = clients.filter((c) => c.id !== id);

  // Update memory
  memoryClients = clients;
  isLoaded = true;

  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(clients, null, 2));
  } catch (error) {
    console.warn(
      "Failed to delete from DB file (expected in Vercel):",
      error.message,
    );
  }
  return true;
}
