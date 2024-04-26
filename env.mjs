import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    //
  },
  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AUTH_METHOD: z.union([
      z.literal('header'),
      z.literal('cookie'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_NETWORK: z.union([
      z.literal('mainnet-beta'),
      z.literal('testnet'),
      z.literal('devnet'),
    ]),
    NEXT_PUBLIC_ALLOWED_ORIGINS: z.string().min(1),
    NEXT_PUBLIC_ALLOWED_RESOURCES: z.string().nullish(),
    NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_NFT_PROGRAM_ID: z.string().min(1),
    NEXT_PUBLIC_RPC_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID: z.string().min(1),
    NEXT_PUBLIC_CRYPTO_ENCRYPT_TOKEN: z.string().min(1),
    NEXT_PUBLIC_MPL_BUBBLEGUM_PROGRAM_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_AUTH_METHOD: process.env.NEXT_PUBLIC_AUTH_METHOD,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_NETWORK: process.env.NEXT_PUBLIC_NETWORK,
    NEXT_PUBLIC_ALLOWED_ORIGINS: process.env.NEXT_PUBLIC_ALLOWED_ORIGINS,
    NEXT_PUBLIC_ALLOWED_RESOURCES: process.env.NEXT_PUBLIC_ALLOWED_RESOURCES,
    NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN:
      process.env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
    NEXT_PUBLIC_NFT_PROGRAM_ID: process.env.NEXT_PUBLIC_NFT_PROGRAM_ID,
    NEXT_PUBLIC_RPC_URL: process.env.NEXT_PUBLIC_RPC_URL,
    NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID:
      process.env.NEXT_PUBLIC_NFT_METADATA_PROGRAM_ID,
    NEXT_PUBLIC_CRYPTO_ENCRYPT_TOKEN:
      process.env.NEXT_PUBLIC_CRYPTO_ENCRYPT_TOKEN,
    NEXT_PUBLIC_MPL_BUBBLEGUM_PROGRAM_ID:
      process.env.NEXT_PUBLIC_MPL_BUBBLEGUM_PROGRAM_ID,
  },
});

export { env };
