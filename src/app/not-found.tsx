import Link from "next/link";
import { MoveLeft } from "lucide-react";
import "./globals.css";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center text-foreground">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:gap-10">
          <div className="space-y-2">
            <h1 className="text-9xl font-extrabold tracking-tighter text-primary/10 select-none">
              404
            </h1>
            <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Halaman yang Anda cari tidak ditemukan.
            </p>
          </div>
          
          <div className="mt-8 z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              <MoveLeft className="h-4 w-4" />
              Kembali ke Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
