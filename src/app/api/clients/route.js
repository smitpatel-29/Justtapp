import { NextResponse } from "next/server";
import { getClients, saveClient, getDeletedClients } from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const showDeleted = searchParams.get("deleted") === "true";
  const isOldClient = searchParams.get("old") === "true";

  if (showDeleted) {
    const deletedClients = await getDeletedClients(isOldClient);
    return NextResponse.json(deletedClients);
  }

  const clients = await getClients(isOldClient);
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
