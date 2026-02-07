import Link from "next/link";
import { Icons } from "@/components/icons";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>created by</span>
          <Link
            href="https://akadev.me"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-red-600 hover:text-red-700 hover:underline underline-offset-4 transition-colors"
          >
            aka
          </Link>
          <span className="hidden sm:inline">| di buat dgn ❤️ dan kode</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link
            href="https://t.me/akamodebaik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#0088cc] transition-colors"
          >
            <Icons.telegram className="h-5 w-5" />
            <span className="sr-only">Telegram</span>
          </Link>
          <Link
            href="https://github.com/akaanakbaik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icons.github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
