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

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: file.id,
        name: file.originalName,
        size: file.size,
        mimeType: file.mimeType,
        chunked: false,
        chunkCount: 0,
        createdAt: file.createdAt,
        downloadUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/file/${file.id}`,
        directUrl: file.publicUrl,
      },
      author: "aka",
      email: "akaanakbaik17@proton.me",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
