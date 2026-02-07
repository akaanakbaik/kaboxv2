import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12 max-w-4xl px-4">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground mb-8">
            By accessing or using Domku Box, you agree to be bound by these terms. 
            Please read them carefully.
          </p>

          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-semibold mb-2">1. Acceptable Use Policy</h3>
              <p className="text-muted-foreground mb-2">
                You agree not to misuse the Domku Box services. You must not attempt to gain
                unauthorized access to the service, user accounts, or computer systems or networks.
                The following content is strictly prohibited:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Content that promotes illegal acts, violence, or terrorism.</li>
                <li>Malware, viruses, or any malicious code.</li>
                <li>Copyrighted material without the owner&apos;s permission.</li>
                <li>Sexually explicit content or child exploitation material.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">2. Service Availability</h3>
              <p className="text-muted-foreground">
                Domku Box provides this service on an &quot;as is&quot; and &quot;as available&quot; basis. While we strive
                for 99.9% uptime and high reliability using multi-cloud redundancy, we do not guarantee
                that the service will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">3. Intellectual Property</h3>
              <p className="text-muted-foreground">
                You retain all rights to the files you upload. By uploading a file, you grant Domku Box
                a license to store, copy, and transmit the file as necessary to provide the service.
                Domku Box does not claim ownership of your content.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-semibold mb-2">4. Privacy & Data Logging</h3>
              <p className="text-muted-foreground">
                We respect your privacy. We log basic access information (IP address, User Agent, Country)
                for security purposes, analytics, and to prevent abuse. This data is retained for a limited
                period and is never sold to third parties.
              </p>
            </section>
          </div>

          <div className="mt-12 p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground">
            <p className="m-0">
              Last updated: March 2024. <br />
              Contact: <a href="mailto:akaanakbaik17@proton.me" className="text-primary hover:underline">akaanakbaik17@proton.me</a>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
