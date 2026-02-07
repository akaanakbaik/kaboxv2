import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logAccessToEdge } from "@/lib/turso";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const userAgent = req.headers.get("user-agent") || "unknown";
    const country = req.headers.get("x-geo-country") || "unknown";

    const file = await prisma.fileMetadata.findUnique({
      where: { id },
    });

    if (!file || !file.publicUrl) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    try {
      await prisma.fileMetadata.update({
        where: { id },
        data: {
          downloads: { increment: 1 },
        },
      });

      logAccessToEdge(id, ip, userAgent, country);
    } catch (e) {
    }

    return NextResponse.redirect(file.publicUrl);
  } catch (error) {
    return NextResponse.redirect(new URL("/500", req.url));
  }
}
