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
      select: {
        id: true,
        originalName: true,
        size: true,
        status: true,
        publicUrl: true,
      },
    });

    if (!file) {
      return NextResponse.json(
        { success: false, message: "File not found" },
        { status: 404 }
      );
    }

    const isCompleted = file.status === "completed";

    return NextResponse.json({
      success: true,
      data: {
        id: file.id,
        name: file.originalName,
        size: file.size,
        status: file.status,
        message: isCompleted ? "Upload completed" : "Upload to storage in progress",
        chunked: false,
        chunkCount: 0,
        downloadUrl: isCompleted
          ? `${process.env.NEXT_PUBLIC_BASE_URL}/file/${file.id}`
          : null,
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
