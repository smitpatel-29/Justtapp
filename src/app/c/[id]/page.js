import { notFound } from "next/navigation";
import { getClientById } from "@/lib/db";
import ProfileView from "@/components/ProfileView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const client = getClientById(id);

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
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    notFound();
  }

  return <ProfileView client={client} />;
}
