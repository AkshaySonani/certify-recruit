/** @type {import('next').NextConfig} */
const nextConfig = {
  env: { BASE_URL: process.env.NEXT_SERVER_URL },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ['marktoconnect.s3.ap-south-1.amazonaws.com']
  },
};

export default nextConfig;
