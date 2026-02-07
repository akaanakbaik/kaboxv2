import Link from "next/link";
import { MoveLeft, FileQuestion } from "lucide-react";
import "@/app/globals.css";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center text-foreground">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 text-center md:gap-10">
          <div className="space-y-2">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-muted/50 border border-border shadow-sm">
                <FileQuestion className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl">
              404
            </h1>
            <h2 className="text-xl font-semibold tracking-tight text-muted-foreground sm:text-2xl">
              Page Not Found
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
              Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dihapus,
              namanya diubah, atau sementara tidak tersedia.
            </p>
          </div>
          
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              <MoveLeft className="mr-2 h-4 w-4" />
              Kembali ke Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
