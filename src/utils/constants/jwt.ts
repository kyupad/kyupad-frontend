import { CookieSerializeOptions } from 'cookie';
import { env } from 'env.mjs';

const ACCESS_TOKEN_STORAGE_KEY = 'access_token';
const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token';

const MAX_AGE_ACCESS_TOKEN = 60 * 60 * 2; // 2 hours
const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 7; // 7 days

const ACCESS_TOKEN_COOKIE_CONFIG: CookieSerializeOptions = {
  maxAge: MAX_AGE_ACCESS_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
  domain:
    process.env.NODE_ENV === 'development'
      ? undefined
      : env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
};

const REFRESH_TOKEN_COOKIE_CONFIG: CookieSerializeOptions = {
  maxAge: MAX_AGE_REFRESH_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
  domain:
    process.env.NODE_ENV === 'development'
      ? undefined
      : env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
};

// eslint-disable-next-line no-unused-vars
enum AUTH_METHOD {
  // eslint-disable-next-line no-unused-vars
  COOKIE = 'cookie',
  // eslint-disable-next-line no-unused-vars
  HEADER = 'header',
}

export {
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  AUTH_METHOD,
};
