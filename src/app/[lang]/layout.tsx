import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "@/app/globals.css";
import { Metadata, Viewport } from "next";

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

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head />
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
