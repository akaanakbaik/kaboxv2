import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";
import { Ratelimit } from "@upstash/ratelimit"; // Simulasi logic jika tanpa Redis
import { Redis } from "@upstash/redis"; // Opsional, kita pakai in-memory map logic untuk Vercel Free

acceptLanguage.languages(["id", "en"]);

const cookieName = "i18next";
const fallbackLng = "en";

// Simple in-memory rate limiter untuk demo (Production wajib pakai Redis/KV)
const rateLimitMap = new Map();

export function middleware(req: NextRequest) {
  const ip = req.ip || "127.0.0.1";
  
  // 1. SECURITY: Rate Limiting (Simple Token Bucket Logic)
  // Max 20 requests per 10 seconds per IP
  const now = Date.now();
  const windowMs = 10000;
  const maxReq = 20;
  
  const record = rateLimitMap.get(ip) || { count: 0, startTime: now };
  
  if (now - record.startTime > windowMs) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }
  rateLimitMap.set(ip, record);

  if (record.count > maxReq) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Too many requests, slow down!", ip }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. I18N: Language Redirection logic
  let lng;
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  if (!lng) {
    // GeoIP detection logic via Vercel headers
    const country = req.geo?.country?.toLowerCase();
    lng = country === "id" ? "id" : "en";
  }

  // Redirect if path is missing locale
  if (
    !req.nextUrl.pathname.startsWith("/id") &&
    !req.nextUrl.pathname.startsWith("/en") &&
    !req.nextUrl.pathname.startsWith("/api") &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.includes(".") // file extensions
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  // 3. SECURITY: Header Injection for downstream
  const response = NextResponse.next();
  if (req.nextUrl.pathname.startsWith('/id')) response.cookies.set(cookieName, 'id');
  if (req.nextUrl.pathname.startsWith('/en')) response.cookies.set(cookieName, 'en');
  
  response.headers.set('x-your-ip', ip);
  response.headers.set('x-geo-country', req.geo?.country || 'unknown');

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
