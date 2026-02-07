import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ApiCard } from "@/components/docs/api-card";

export default function ApiDocsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12 max-w-5xl px-4">
        <div className="space-y-6 mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Integrate Domku Box high-performance CDN directly into your applications. 
            No API key required for public uploads.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-4 rounded-lg border">
            <span className="font-bold">Base URL:</span>
            <code className="bg-background px-2 py-1 rounded border">
              https://domku.xyz/api
            </code>
          </div>
        </div>

        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Upload & Management</h2>
            <div className="grid gap-4">
              <ApiCard
                method="POST"
                path="/upload"
                title="Upload Files"
                description="Upload multiple files (max 5) to the CDN. The system automatically routes the file to the most optimal storage provider."
                curlRequest={`curl -X POST https://domku.xyz/api/upload \\
  -F "file=@/path/to/image.jpg" \\
  -F "file=@/path/to/video.mp4"`}
                jsonResponse={`{
  "success": true,
  "data": [
    {
      "id": "abc123xyz",
      "name": "image.jpg",
      "url": "https://domku.xyz/file/abc123xyz",
      "status": "completed"
    }
  ],
  "author": "aka",
  "email": "akaanakbaik17@proton.me"
}`}
              />
              
              <ApiCard
                method="GET"
                path="/files/:id/status"
                title="Check Status"
                description="Poll this endpoint to check if a file has finished processing and propagating across the CDN network."
                curlRequest="curl https://domku.xyz/api/files/abc123xyz/status"
                jsonResponse={`{
  "success": true,
  "data": {
    "id": "abc123xyz",
    "status": "completed",
    "message": "Upload completed",
    "downloadUrl": "https://domku.xyz/file/abc123xyz"
  },
  "author": "aka"
}`}
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Retrieval</h2>
            <div className="grid gap-4">
              <ApiCard
                method="GET"
                path="/files/:id"
                title="Get File Info"
                description="Retrieve metadata about a specific file, including size, MIME type, and creation date."
                curlRequest="curl https://domku.xyz/api/files/abc123xyz"
                jsonResponse={`{
  "success": true,
  "data": {
    "id": "abc123xyz",
    "name": "image.jpg",
    "size": 10240,
    "mimeType": "image/jpeg",
    "createdAt": "2024-03-01T12:00:00Z",
    "downloadUrl": "https://domku.xyz/file/abc123xyz"
  },
  "author": "aka"
}`}
              />

              <ApiCard
                method="GET"
                path="/files/:id/download"
                title="Download File"
                description="Directly download the file stream. This endpoint handles proper Content-Disposition headers."
                curlRequest="curl -OJ https://domku.xyz/api/files/abc123xyz/download"
                jsonResponse={`// Binary stream response`}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
