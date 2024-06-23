'use client';

import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { WEB_ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { env } from 'env.mjs';

function DesktopMenu() {
  const pathName = usePathname();
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host || null);
    }
  }, []);

  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );

  return (
    <nav className="flex gap-8 text-xl">
      {env.NEXT_PUBLIC_APP_URL?.replace('https://', '')?.replace(
        'http://',
        '',
      ) === host && (
        <Link href={WEB_ROUTES.WHITELIST_PASS} className="relative group">
          Mint NFT
          <span
            className={cn(
              'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
              pathName === WEB_ROUTES.WHITELIST_PASS ? 'w-full' : '',
            )}
          ></span>
        </Link>
      )}
      {isSolanaConnected &&
        env.NEXT_PUBLIC_APP_URL?.replace('https://', '')?.replace(
          'http://',
          '',
        ) === host && (
          <Link href={WEB_ROUTES.MY_SPACE} className="relative group">
            My Space
            <span
              className={cn(
                'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
                pathName === WEB_ROUTES.MY_SPACE ? 'w-full' : '',
              )}
            ></span>
          </Link>
        )}
      {/* <Link href={WEB_ROUTES.CATNIP_POINTS} className="relative group">
        Catnip Points
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
            pathName === WEB_ROUTES.CATNIP_POINTS ? 'w-full' : '',
          )}
        ></span>
      </Link> */}
      <Link
        href={env.NEXT_PUBLIC_DOCS_URL}
        target="_blank"
        className="relative group"
        rel="noreferrer noopener"
      >
        About KyuPad
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
          )}
        ></span>
      </Link>
    </nav>
  );
}

export default memo(DesktopMenu);
