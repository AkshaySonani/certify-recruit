/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.NEXT_SERVER_URL,
      }
};

export default nextConfig;
