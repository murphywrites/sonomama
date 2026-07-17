/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure free-resource PDFs are included in the serverless function bundle on Vercel
  outputFileTracingIncludes: {
    "/api/email-capture": ["./public/assets/pdfs/**/*"],
  },
};

export default nextConfig;
