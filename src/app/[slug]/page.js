import { notFound } from "next/navigation";
import ProfileView from "@/components/ProfileView";
import SubscriptionExpired from "@/components/SubscriptionExpired";
import { headers } from "next/headers";

async function getClient(slug) {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";

    // Fetch from our own API to share the in-memory cache of the server process
    const res = await fetch(`${protocol}://${host}/api/clients?old=true`, {
      cache: "no-store", // Ensure we always get fresh data
      next: { tags: ["clients"] },
    });

    if (!res.ok) return null;

    const clients = await res.json();
    if (!Array.isArray(clients)) return null;
    return clients.find((c) => c.customSlug === slug);
  } catch (error) {
    console.error("Failed to fetch client:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const client = await getClient(slug);

  if (!client) return { title: "Client Not Found" };

  return {
    title: `${client.name} - Just Tapp`,
    description: client.bio,
    openGraph: {
      images: [client.avatar],
    },
  };
}

export default async function ClientPage({ params }) {
  const { slug } = await params;
  const client = await getClient(slug);

  if (!client) {
    notFound();
  }

  // Check subscription status
  if (
    client.active === false ||
    (client.subscriptionType === "limited" &&
      (() => {
        const startDate = new Date(client.subscriptionStart || Date.now());
        const durationYears = parseInt(client.subscriptionDuration || "1", 10);
        const expiryDate = new Date(startDate);
        expiryDate.setFullYear(expiryDate.getFullYear() + durationYears);
        return Date.now() > expiryDate.getTime();
      })())
  ) {
    return <SubscriptionExpired />;
  }

  return <ProfileView client={client} />;
}
