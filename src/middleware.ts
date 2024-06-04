import { NextRequest } from 'next/server';
import { env } from 'env.mjs';

// eslint-disable-next-line import/no-unused-modules
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');
  const fullPath = url.href;

  console.error(env.NEXT_PUBLIC_APP_URL, 'env app url');
  console.error(hostname, 'hostname mid');
  console.error(fullPath, 'full path mid');
  console.error(url, 'url mid');
  console.error(request, 'request mid');
  return;
}

// eslint-disable-next-line import/no-unused-modules
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)'],
};
