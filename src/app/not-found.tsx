import Link from "next/link";
import { MoveLeft, FileQuestion } from "lucide-react";

export const dynamic = "force-dynamic";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6">
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-muted/50 border border-border shadow-sm">
            <FileQuestion className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl select-none text-primary/20">
            404
          </h1>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Page Not Found
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
            Halaman yang Anda cari tidak ditemukan.
          </p>
        </div>
        
        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <MoveLeft className="mr-2 h-4 w-4" />
            Kembali ke Home
          </Link>
        </div>
      </div>
    </div>
  );
}
