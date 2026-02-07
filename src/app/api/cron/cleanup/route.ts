import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const deletedFiles = await prisma.fileMetadata.deleteMany({
      where: {
        status: "failed",
        createdAt: {
          lt: twentyFourHoursAgo,
        },
      },
    });

    return NextResponse.json({
      success: true,
      deletedCount: deletedFiles.count,
      message: "Cleanup completed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Cleanup failed" },
      { status: 500 }
    );
  }
}
