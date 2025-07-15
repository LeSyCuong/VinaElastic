import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir, stat } from "fs/promises";
import sharp from "sharp";

function getFileName(url: string) {
  const base = path.basename(new URL(url).pathname).split("?")[0];
  if (!base || !base.includes(".")) {
    return `image_${Date.now()}.jpg`;
  }
  return base;
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, type } = await req.json();

    if (!url || !type) {
      return NextResponse.json(
        { error: "Thiếu url hoặc type" },
        { status: 400 }
      );
    }

    const fileName = getFileName(url);
    const dir = path.join(process.cwd(), "public", "images", type);
    const fullPath = path.join(dir, fileName);

    if (!(await fileExists(fullPath))) {
      await mkdir(dir, { recursive: true });

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Không tải được ảnh từ ${url}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());

      // Resize + nén ảnh bằng sharp
      const resized = await sharp(buffer)
        .resize({ width: 500 }) // Resize chiều rộng tối đa
        .jpeg({ quality: 80 }) // Giảm chất lượng một chút để nhẹ
        .toBuffer();

      await writeFile(fullPath, resized);
    }

    return NextResponse.json({
      localUrl: `/images/${type}/${fileName}`,
    });
  } catch (err: any) {
    console.error("Image Save API error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
