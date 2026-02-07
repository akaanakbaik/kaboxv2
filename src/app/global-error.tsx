"use client";

import "@/app/globals.css";
import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased flex items-center justify-center">
        <div className="max-w-md w-full p-6 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-destructive/10 text-destructive">
              <AlertCircle className="h-12 w-12" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">System Critical Error</h1>
            <p className="text-muted-foreground text-sm">
              Terjadi kesalahan fatal pada sistem. Tim kami telah dinotifikasi.
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Coba Lagi
          </button>
        </div>
      </body>
    </html>
  );
}
