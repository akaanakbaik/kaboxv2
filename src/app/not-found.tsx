import Link from "next/link";
import { MoveLeft } from "lucide-react";
import "./globals.css"; // Pastikan CSS terload

export default function NotFound() {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="space-y-6 text-center">
            <h1 className="text-9xl font-extrabold tracking-tighter text-primary/10 select-none">
              404
            </h1>
            <div className="space-y-2 absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
              <p className="text-muted-foreground max-w-[500px]">
                Sorry, we couldn't find the page you're looking for. It might have been removed,
                renamed, or doesn't exist.
              </p>
            </div>
          </div>
          
          <div className="mt-8 z-10">
            <Link
              href="/~"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
