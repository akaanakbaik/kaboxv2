import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    const file = await prisma.fileMetadata.findUnique({
      where: { id },
    });

    if (!file || !file.publicUrl) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }

    await prisma.fileMetadata.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    const response = await fetch(file.publicUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from upstream storage: ${response.statusText}`);
    }

    const headers = new Headers(response.headers);
    headers.set("Content-Disposition", `attachment; filename="${file.originalName}"`);
    headers.set("Content-Type", file.mimeType);
    headers.delete("Content-Length");

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error during stream" },
      { status: 500 }
    );
  }
}
