/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // ✅ Cho phép build dù có lỗi TS
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tắt lỗi ESLint khi build
  },
};

module.exports = nextConfig;
