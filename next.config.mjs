import './env.mjs';

/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';
import million from 'million/compiler';

const millionConfig = {
  // auto: { rsc: true },
  auto: false,
};

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    worker-src 'self' blob:;
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
`;

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
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error'],
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
        headers: [
          ...securityHeaders,
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  poweredByHeader: false,

  images: {
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 86400 : 0,
    formats: ['image/webp'],
    remotePatterns: [{ hostname: 'robohash.org' }],
  },
});

export default process.env.NODE_ENV === 'production'
  ? million.next(nextConfig, millionConfig)
  : nextConfig;
