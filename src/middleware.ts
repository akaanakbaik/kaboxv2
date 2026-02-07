import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import acceptLanguage from "accept-language";

acceptLanguage.languages(["id", "en"]);

const cookieName = "i18next";
const fallbackLng = "id";

export function middleware(req: NextRequest) {
  // 1. Skip jika request adalah file statis, API, atau internal next
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/api") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.includes(".") // file dengan ekstensi (gambar, css, dll)
  ) {
    return NextResponse.next();
  }

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  let lng;
  
  // 2. Cek Cookie Bahasa
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
  }
  
  // 3. Jika tidak ada cookie, cek header Accept-Language atau GeoIP (header Vercel)
  if (!lng) {
    const country = req.headers.get("x-geo-country")?.toLowerCase();
    lng = country === "id" ? "id" : "en";
  }

  // 4. Redirect Root (/) ke bahasa yang dideteksi
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL(`/${lng}`, req.url));
  }

  // 5. Cek apakah path sudah ada bahasa
  const pathnameIsMissingLocale = ["id", "en"].every(
    (locale) => !req.nextUrl.pathname.startsWith(`/${locale}/`) && req.nextUrl.pathname !== `/${locale}`
  );

  // 6. Redirect jika bahasa hilang dari URL
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    );
  }

  // 7. Security Headers Injection
  const response = NextResponse.next();
  if (req.nextUrl.pathname.startsWith("/id")) response.cookies.set(cookieName, "id");
  if (req.nextUrl.pathname.startsWith("/en")) response.cookies.set(cookieName, "en");
  
  response.headers.set("x-your-ip", ip);
  
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};
