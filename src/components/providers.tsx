"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        <TooltipProvider delayDuration={0}>
          {children}
          <Toaster 
            position="bottom-right" 
            richColors 
            closeButton 
            theme="system"
            className="font-sans"
          />
        </TooltipProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
