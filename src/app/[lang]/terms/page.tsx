import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-12 max-w-4xl">
        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="lead">
            By accessing or using Domku Box, you agree to be bound by these terms. 
            Please read them carefully.
          </p>

          <hr className="my-8" />

          <h3>1. Acceptable Use Policy</h3>
          <p>
            You agree not to misuse the Domku Box services. You must not attempt to gain
            unauthorized access to the service, user accounts, or computer systems or networks.
            The following content is strictly prohibited:
          </p>
          <ul>
            <li>Content that promotes illegal acts, violence, or terrorism.</li>
            <li>Malware, viruses, or any malicious code.</li>
            <li>Copyrighted material without the owner's permission.</li>
            <li>Sexually explicit content or child exploitation material.</li>
          </ul>
          <p>
            We reserve the right to delete any file that violates these terms without prior notice.
            Violators will be permanently banned and reported to authorities if necessary.
          </p>

          <h3>2. Service Availability</h3>
          <p>
            Domku Box provides this service on an "as is" and "as available" basis. While we strive
            for 99.9% uptime and high reliability using multi-cloud redundancy, we do not guarantee
            that the service will be uninterrupted or error-free.
          </p>

          <h3>3. Intellectual Property</h3>
          <p>
            You retain all rights to the files you upload. By uploading a file, you grant Domku Box
            a license to store, copy, and transmit the file as necessary to provide the service.
            Domku Box does not claim ownership of your content.
          </p>

          <h3>4. Privacy & Data Logging</h3>
          <p>
            We respect your privacy. We log basic access information (IP address, User Agent, Country)
            for security purposes, analytics, and to prevent abuse. This data is retained for a limited
            period and is never sold to third parties.
          </p>

          <h3>5. Limitation of Liability</h3>
          <p>
            In no event shall Domku Box, its operators, or affiliates be liable for any indirect,
            incidental, special, consequential, or punitive damages arising out of or related to
            your use of the service.
          </p>

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
