import { NextResponse } from "next/server";
import { restoreClient } from "@/lib/db";

export async function POST(request, { params }) {
  const { id } = await params;
  const success = await restoreClient(id);

  if (success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to restore client" },
      { status: 500 },
    );
  }
}
