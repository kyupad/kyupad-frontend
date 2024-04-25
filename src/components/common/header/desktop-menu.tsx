'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WEB_ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';

function DesktopMenu() {
  const pathName = usePathname();
  return (
    <nav className="flex gap-8 text-xl">
      <Link href={WEB_ROUTES.WHITELIST_PASS} className="relative group">
        Whitelist NFT
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
            pathName === WEB_ROUTES.WHITELIST_PASS ? 'w-full' : '',
          )}
        ></span>
      </Link>
      <Link href={WEB_ROUTES.MY_SPACE} className="relative group">
        My Space
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
            pathName === WEB_ROUTES.MY_SPACE ? 'w-full' : '',
          )}
        ></span>
      </Link>
      {/* <Link href={WEB_ROUTES.CATNIP_POINTS} className="relative group">
        Catnip Points
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
            pathName === WEB_ROUTES.CATNIP_POINTS ? 'w-full' : '',
          )}
        ></span>
      </Link> */}
      <Link href={WEB_ROUTES.HOW_TO_JOIN_OUR_IDOS} className="relative group">
        How to join our IDOs
        <span
          className={cn(
            'absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full',
            pathName === WEB_ROUTES.HOW_TO_JOIN_OUR_IDOS ? 'w-full' : '',
          )}
        ></span>
      </Link>
    </nav>
  );
}

export default memo(DesktopMenu);
