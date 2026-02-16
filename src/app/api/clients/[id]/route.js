import { NextResponse } from "next/server";
import { getClientById, saveClient, deleteClient } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = await params;
  const client = getClientById(id);

  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const existingClient = getClientById(id);

  if (!existingClient) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  try {
    const changes = await request.json();
    const updatedClient = { ...existingClient, ...changes, id };
    saveClient(updatedClient);
    return NextResponse.json(updatedClient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  deleteClient(id);
  return NextResponse.json({ success: true });
}
