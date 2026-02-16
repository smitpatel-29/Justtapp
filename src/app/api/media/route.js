import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  try {
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ files: [] }, { status: 200 });
    }

    const files = fs.readdirSync(uploadDir).filter((file) => {
      // Only return image files
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file);
    });

    // Sort by modified time (newest first)
    const filesWithStats = files
      .map((filename) => ({
        name: filename,
        url: `/uploads/${filename}`,
        time: fs.statSync(path.join(uploadDir, filename)).mtime.getTime(),
      }))
      .sort((a, b) => b.time - a.time);

    return NextResponse.json({ files: filesWithStats }, { status: 200 });
  } catch (error) {
    console.error("Error reading directory", error);
    return NextResponse.json(
      { error: "Failed to read files" },
      { status: 500 },
    );
  }
}
