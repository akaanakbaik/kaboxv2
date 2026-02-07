import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/prisma";
import { smartUpload } from "@/lib/storage";
import { sendUploadAlert } from "@/lib/telegram";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, message: "No files provided" },
        { status: 400 }
      );
    }

    if (files.length > 5) {
      return NextResponse.json(
        { success: false, message: "Max 5 files per upload" },
        { status: 400 }
      );
    }

    const uploadResults = [];
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

    for (const file of files) {
      const fileId = nanoid(10);
      
      const fileRecord = await prisma.fileMetadata.create({
        data: {
          id: fileId,
          originalName: file.name,
          mimeType: file.type,
          size: file.size,
          provider: "pending",
          providerFileId: "pending",
          publicUrl: "",
          ipAddress: ip,
          status: "uploading",
        },
      });

      try {
        const uploadData = await smartUpload(file, fileId, file.type);

        const updatedRecord = await prisma.fileMetadata.update({
          where: { id: fileId },
          data: {
            provider: uploadData.provider,
            providerFileId: uploadData.fileId,
            publicUrl: uploadData.url,
            deleteUrl: uploadData.deleteUrl,
            status: "completed",
          },
        });

        await sendUploadAlert(
          file.name,
          file.size,
          ip,
          uploadData.provider,
          `${process.env.NEXT_PUBLIC_BASE_URL}/file/${fileId}`
        );

        uploadResults.push({
          id: fileId,
          name: file.name,
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/file/${fileId}`,
          directUrl: uploadData.url,
          status: "completed",
        });
      } catch (error) {
        await prisma.fileMetadata.update({
          where: { id: fileId },
          data: { status: "failed" },
        });
        
        uploadResults.push({
          id: fileId,
          name: file.name,
          status: "failed",
          error: "Storage upload failed",
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: uploadResults,
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

export const runtime = "nodejs";
export const maxDuration = 60;
