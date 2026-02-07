"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, copyToClipboard } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface ApiCardProps {
  method: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  title: string;
  description: string;
  curlRequest: string;
  jsonResponse: string;
}

export function ApiCard({
  method,
  path,
  title,
  description,
  curlRequest,
  jsonResponse,
}: ApiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text: string) => {
    await copyToClipboard(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methodColors = {
    GET: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    POST: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800",
    DELETE: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800",
    PUT: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  };

  return (
    <div className="border rounded-lg bg-card overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div
        className="p-4 cursor-pointer flex items-center justify-between bg-card"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4 overflow-hidden">
          <span
            className={cn(
              "px-3 py-1 rounded-md text-xs font-bold border",
              methodColors[method]
            )}
          >
            {method}
          </span>
          <code className="text-sm font-mono font-semibold truncate text-foreground">
            {path}
          </code>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-sm hidden sm:inline-block">{title}</span>
          {isExpanded ? <Icons.chevronUp className="h-4 w-4" /> : <Icons.chevronDown className="h-4 w-4" />}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t bg-muted/30"
          >
            <div className="p-4 space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Example Request
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(curlRequest);
                    }}
                    className="p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    {copied ? (
                      <Icons.check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Icons.copy className="w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                </div>
                <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs font-mono">
                    <code>{curlRequest}</code>
                  </pre>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Example Response
                </span>
                <div className="bg-zinc-950 text-zinc-50 p-4 rounded-md overflow-x-auto">
                  <pre className="text-xs font-mono">
                    <code>{jsonResponse}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
