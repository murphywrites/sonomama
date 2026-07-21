/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure free-resource PDFs are included in the serverless function bundle on Vercel.
  // On Next.js 14 this is an experimental option; at the top level it is ignored.
  experimental: {
    outputFileTracingIncludes: {
      "/api/email-capture": ["./public/assets/pdfs/**/*"],
    },
  },
};

export default nextConfig;
