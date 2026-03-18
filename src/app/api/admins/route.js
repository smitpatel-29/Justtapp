import { NextResponse } from "next/server";
import { getAdmins, createAdmin } from "@/lib/db";

export async function GET() {
  try {
    const admins = await getAdmins();
    return NextResponse.json(admins);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admins" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const newAdmin = await createAdmin(username, password);
    return NextResponse.json(newAdmin, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create admin" },
      { status: 500 }
    );
  }
}
