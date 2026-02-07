"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        onClose();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onClose]);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const menuItems = [
    { href: "/~", label: "Home", icon: Icons.home },
    { href: "/docs", label: "API Docs", icon: Icons.docs },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l bg-background p-6 shadow-xl sm:w-1/2"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="text-lg font-bold">Menu</span>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-muted transition-colors"
              >
                <Icons.close className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => {
                const isActive = pathname.includes(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-4 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-muted",
                      isActive ? "bg-muted text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
               <div className="rounded-lg border bg-card p-4 text-xs text-muted-foreground">
                  <p>Server Status: <span className="text-green-500 font-bold">Online</span></p>
                  <p className="mt-1">v3.2.0 Stable</p>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
