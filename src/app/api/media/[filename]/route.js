import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(request, { params }) {
  const { filename } = await params;
  const uploadDir = path.join(process.cwd(), "public/uploads");
  const filePath = path.join(uploadDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
