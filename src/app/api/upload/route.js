import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    // Sanitize filename to prevent directory traversal
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `${Date.now()}-${safeName}`;

    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    fs.writeFileSync(filepath, buffer);

    const fileUrl = `/uploads/${filename}`;

    return NextResponse.json(
      { url: fileUrl, filename: filename },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
