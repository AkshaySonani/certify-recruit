/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { BASE_URL: process.env.NEXT_SERVER_URL },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
