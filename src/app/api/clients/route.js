import { NextResponse } from "next/server";
import { getClients, saveClient, getDeletedClients } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const showDeleted = searchParams.get("deleted") === "true";

  if (showDeleted) {
    const deletedClients = await getDeletedClients();
    return NextResponse.json(deletedClients);
  }

  const clients = await getClients();
  return NextResponse.json(clients);
}

export async function POST(request) {
  try {
    const client = await request.json();
    const savedClient = await saveClient(client);
    return NextResponse.json(savedClient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 },
    );
  }
}
