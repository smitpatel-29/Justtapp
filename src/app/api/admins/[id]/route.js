import { NextResponse } from "next/server";
import { deleteAdmin } from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const success = await deleteAdmin(id);

    if (success) {
      return NextResponse.json({ message: "Admin deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to delete admin" },
      { status: 500 }
    );
  }
}
