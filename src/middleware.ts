import { NextRequest, NextResponse } from 'next/server';
import { env } from 'env.mjs';

import { WEB_ROUTES } from './utils/constants';

// eslint-disable-next-line import/no-unused-modules
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host');
  const pathName = url.pathname;
  const searchParam = url.search;
  const fullPath = pathName + searchParam;

  if (
    env.NEXT_PUBLIC_APP_URL?.replace('https://', '')?.replace('http://', '') ===
    hostname
  ) {
    if (pathName === WEB_ROUTES.HOME) {
      return NextResponse.rewrite(
        new URL(WEB_ROUTES.APP + fullPath, request.url),
      );
    }

    if (pathName?.includes(`${WEB_ROUTES.PROJECTS}/`)) {
      return NextResponse.rewrite(new URL(fullPath, request.url));
    }

    if (pathName === WEB_ROUTES.MY_SPACE) {
      return NextResponse.rewrite(new URL(fullPath, request.url));
    }

    return NextResponse.rewrite(new URL(WEB_ROUTES.NOTFOUND, request.url));
  }

  if (pathName === WEB_ROUTES.HOME) {
    return NextResponse.rewrite(new URL(fullPath, request.url));
  }

  if (pathName === WEB_ROUTES.APP) {
    return NextResponse.rewrite(new URL(WEB_ROUTES.NOTFOUND, request.url));
  }

  if (pathName?.includes(`${WEB_ROUTES.PROJECTS}/`)) {
    return NextResponse.rewrite(new URL(WEB_ROUTES.NOTFOUND, request.url));
  }

  if (pathName === WEB_ROUTES.MY_SPACE) {
    return NextResponse.rewrite(new URL(WEB_ROUTES.NOTFOUND, request.url));
  }

  return;
}

// eslint-disable-next-line import/no-unused-modules
export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|images/|[\\w-]+\\.\\w+).*)'],
};
