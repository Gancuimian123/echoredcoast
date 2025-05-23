/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // 关闭严格模式以减少重复渲染
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 减少不必要的预加载
  experimental: {
    optimisticClientCache: false,
  },
  // 配置静态资源
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // 减少包大小
  webpack: (config) => {
    config.optimization.minimize = true;
    return config;
  },
};

export default nextConfig;
