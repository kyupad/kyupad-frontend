import './env.mjs';

/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';
import million from 'million/compiler';

const millionConfig = {
  // auto: { rsc: true },
  auto: false,
};

const runWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = runWithBundleAnalyzer({
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    webVitalsAttribution: ['FCP', 'TTFB'],
    serverActions: {
      allowedOrigins: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS.split(','),
    },
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'debug'],
          }
        : false,
  },
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'globalThis.__DEV__': false,
      }),
    );

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [...securityHeaders],
      },
    ];
  },
  poweredByHeader: false,

  images: {
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 60 : 0,
    formats: ['image/webp'],
    remotePatterns:
      process.env.NEXT_PUBLIC_ALLOWED_RESOURCES?.split(',').map((remote) => {
        return { hostname: remote };
      }) ?? [],
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

export default process.env.NODE_ENV === 'production'
  ? million.next(nextConfig, millionConfig)
  : nextConfig;
