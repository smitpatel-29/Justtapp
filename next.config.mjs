/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["sequelize"],
  output: 'standalone', // Drastically reduces Node.js hosting memory overhead
  images: {
    unoptimized: true, // Prevents Next.js built-in image processor from eating 100% CPU on shared hosting
  },
  experimental: {
    optimizePackageImports: ["lucide-react"], // Makes imports faster and lowers memory
  }
};

export default nextConfig;
