import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(["id", "en"]);

const cookieName = "i18next";
// Default redirect ke folder Home anda: /id/~
const defaultPath = "/~";

export function middleware(req: NextRequest) {
  // 1. Skip jika request adalah file statis, API, atau internal next
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.includes(".") // file dengan ekstensi
  ) {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  let lng;
  
  // 2. Deteksi Bahasa (Cookie -> GeoIP -> Default)
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  if (!lng) {
    const country = req.headers.get("x-geo-country")?.toLowerCase();
    lng = country === "id" ? "id" : "en";
  }

  // 3. Redirect Root (/) langsung ke home language path (/id/~)
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${lng}${defaultPath}`, req.url));
  }

  // 4. Redirect jika path bahasa ada tapi path home (~) tidak ada
  // Contoh: user buka /id, harusnya ke /id/~
  if (req.nextUrl.pathname === `/${lng}` || req.nextUrl.pathname === `/${lng}/`) {
     return NextResponse.redirect(new URL(`/${lng}${defaultPath}`, req.url));
  }

  // 5. Cek apakah path kekurangan locale (misal user buka /~ langsung)
  const pathnameIsMissingLocale = ["id", "en"].every(
    (locale) => !req.nextUrl.pathname.startsWith(`/${locale}/`) && req.nextUrl.pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  // 6. Security Headers & Cookie Injection
  const response = NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/id")) response.cookies.set(cookieName, "id");
  if (req.nextUrl.pathname.startsWith("/en")) response.cookies.set(cookieName, "en");
  
  response.headers.set("x-your-ip", ip);
  
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
