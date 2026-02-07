"use client";

import { useState, useCallback } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn, formatBytes, copyToClipboard } from "@/lib/utils";

interface UploadResult {
  id: string;
  name: string;
  url: string;
  status: "completed" | "failed";
  error?: string;
}

export function Uploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [results, setResults] = useState<UploadResult[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (acceptedFiles.length + files.length > 5) {
      toast.error("Maksimal 5 file sekaligus!");
      return;
    }

    fileRejections.forEach((rejection) => {
      toast.error(`File ${rejection.file.name} tidak valid`);
    });

    setFiles((prev) => [...prev, ...acceptedFiles].slice(0, 5));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 5,
    disabled: isUploading,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setResults([]);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        setResults(response.data.data);
        setFiles([]);
        toast.success("Upload berhasil!");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat upload.");
      console.error(error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer overflow-hidden group",
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
          <div className="p-4 rounded-full bg-background shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icons.upload className="w-8 h-8 text-primary" />
          </div>
          <p className="mb-2 text-lg font-semibold text-foreground">
            <span className="text-primary">Klik untuk upload</span> atau drag & drop
          </p>
          <p className="text-sm text-muted-foreground">
            Support semua format (Max 5 file)
          </p>
        </div>
      </div>

      <AnimatePresence>
        {files.length > 0 && !isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="grid gap-2">
              {files.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between p-3 bg-card border rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-muted rounded-md">
                      <Icons.docs className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium truncate max-w-[200px] sm:max-w-xs">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatBytes(file.size)}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(index)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Icons.close className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex justify-center pt-2">
              <Button onClick={handleUpload} size="lg" className="w-full sm:w-auto min-w-[200px] font-bold">
                Mulai Upload ({files.length})
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2 p-6 border rounded-xl bg-card"
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">Mengupload ke server...</span>
              <span className="text-muted-foreground">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground pt-2 animate-pulse">
              Sedang mendistribusikan file ke multi-cloud storage...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Icons.success className="text-green-500 w-5 h-5" />
              Upload Selesai
            </h3>
            <div className="grid gap-3">
              {results.map((result) => (
                <motion.div
                  key={result.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm truncate max-w-[250px]">{result.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold dark:bg-green-900/30 dark:text-green-400">
                        SUCCESS
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        readOnly
                        value={result.url}
                        className="flex-1 bg-muted/50 border rounded-md px-3 py-2 text-xs font-mono text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                      />
                    </div>
                    <div className="flex gap-2">
                       <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-2 text-xs"
                        onClick={() => {
                          copyToClipboard(result.url);
                          toast.success("Link disalin!");
                        }}
                      >
                        <Icons.copy className="w-3 h-3" />
                        Salin
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1 gap-2 text-xs"
                        onClick={() => window.open(result.url, "_blank")}
                      >
                        <Icons.link className="w-3 h-3" />
                        Buka
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
