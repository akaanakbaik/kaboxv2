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
    default: "Domku Box | Ultimate CDN",
    template: "%s | Domku Box",
  },
  description: "Secure, fast, and multi-cloud file storage solution.",
  icons: {
    icon: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
    shortcut: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
    apple: "https://raw.githubusercontent.com/akaanakbaik/my-cdn/main/logokaboxnobg.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
