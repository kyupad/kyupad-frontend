import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    ALLOWED_ORIGINS: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AUTH_METHOD: z.union([
      z.literal('header'),
      z.literal('cookie'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_NODE_ENV: z.union([
      z.literal('development'),
      z.literal('production'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_NETWORK: z.union([z.literal('mainnet'), z.literal('testnet')]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_AUTH_METHOD: process.env.NEXT_PUBLIC_AUTH_METHOD,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
  },
});

export { env };
