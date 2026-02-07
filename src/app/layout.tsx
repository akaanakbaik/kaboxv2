import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Domku Box | Ultimate CDN & File Sharing",
    template: "%s | Domku Box",
  },
  description: "Secure, fast, and multi-cloud file storage solution.",
  icons: {
    icon: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
    shortcut: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
    apple: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
  },
  metadataBase: new URL("https://domku.xyz"),
  authors: [{ name: "aka", url: "https://akadev.me" }],
  creator: "aka",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Suppress hydration warning karena lang diatur dinamis oleh browser/middleware nanti
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-background font-sans antialiased selection:bg-primary selection:text-primary-foreground`}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
