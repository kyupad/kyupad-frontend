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
      z.literal('mainnet'),
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
    NEXT_PUBLIC_MAX_RETRIES_ONCHAIN: z.string().nullish(),
    NEXT_PUBLIC_DOCS_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_PRIORITY_FEES: z.string().min(1),
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).includes('http').nullish(),
    NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AWS_APPSYNC_API_KEY: z.string().min(1),
    NEXT_PUBLIC_AWS_REGION: z.string().min(1),
    NEXT_PUBLIC_SENTRY_PROJECT: z.string().min(1).nullish(),
    NEXT_PUBLIC_AWS_S3_BUCKET_URL: z.string().min(1).includes('http').nullish(),
    NEXT_PUBLIC_DEBUG: z.string().nullish(),
    NEXT_PUBLIC_PARTNER_LENGTH: z.string().min(1).default(11),
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
    NEXT_PUBLIC_MAX_RETRIES_ONCHAIN:
      process.env.NEXT_PUBLIC_MAX_RETRIES_ONCHAIN,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
    NEXT_PUBLIC_PRIORITY_FEES: process.env.NEXT_PUBLIC_PRIORITY_FEES,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT:
      process.env.NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT,
    NEXT_PUBLIC_AWS_APPSYNC_API_KEY:
      process.env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY,
    NEXT_PUBLIC_AWS_REGION: process.env.NEXT_PUBLIC_AWS_REGION,
    NEXT_PUBLIC_SENTRY_PROJECT: process.env.NEXT_PUBLIC_SENTRY_PROJECT,
    NEXT_PUBLIC_AWS_S3_BUCKET_URL: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
    NEXT_PUBLIC_PARTNER_LENGTH: process.env.NEXT_PUBLIC_PARTNER_LENGTH,
  },
});

export { env };
