import { NextResponse } from "next/server";
import {
  getClientById,
  saveClient,
  deleteClient,
  permanentDeleteClient,
} from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const existingClient = await getClientById(id);

  if (!existingClient) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  try {
    const changes = await request.json();
    const updatedClient = { ...existingClient, ...changes, id };
    await saveClient(updatedClient);
    return NextResponse.json(updatedClient);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const isPermanent = searchParams.get("permanent") === "true";

  if (isPermanent) {
    await permanentDeleteClient(id);
  } else {
    await deleteClient(id);
  }

  return NextResponse.json({ success: true });
}
