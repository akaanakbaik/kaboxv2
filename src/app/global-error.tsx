"use client";

import "./globals.css";
import { useEffect } from "react";

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
          <h2 className="text-2xl font-bold tracking-tight">System Critical Error</h2>
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-destructive px-8 text-sm font-medium text-destructive-foreground shadow hover:bg-destructive/90"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
