/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/index.php',
        destination: '/',
      },
      {
        source: '/casino.php',
        destination: '/casino',
      },
      {
        source: '/livecasino.php',
        destination: '/livecasino',
      },
      {
        source: '/login.php',
        destination: '/login',
      },
      {
        source: '/cadastro',
        destination: '/login?tab=register',
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
