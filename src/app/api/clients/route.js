import { NextResponse } from "next/server";
import { getClients, saveClient } from "@/lib/db";

export async function GET() {
  const clients = getClients();
  return NextResponse.json(clients);
}

export async function POST(request) {
  try {
    const client = await request.json();
    const savedClient = saveClient(client);
    return NextResponse.json(savedClient);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 500 },
    );
  }
}
