import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '@/components/common/button/primary';
import { WEB_ROUTES } from '@/utils/constants';

const Header = () => {
  return (
    <header className="flex w-full max-w-8xl mx-auto justify-between px-4 py-5 flex-wrap gap-8">
      <div className="max-w-[144px] min-w-[144px]">
        <Link href={WEB_ROUTES.HOME}>
          <Image
            src="/images/header/kyupad-logo.svg"
            alt="Kyupad Logo"
            width={336}
            height={112}
            draggable={false}
          />
        </Link>
      </div>
      <div className="flex gap-8 items-center flex-wrap">
        <nav className="flex gap-8 font-bold">
          <Link href={WEB_ROUTES.HOME} className="relative group">
            Whitelist NFT Pass
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
          <Link href={WEB_ROUTES.HOME} className="relative group">
            My Space Station
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
          <Link href={WEB_ROUTES.HOME} className="relative group">
            Catnip Points
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
        </nav>
        <PrimaryButton className="min-h-12 w-48">Connect Wallet</PrimaryButton>
      </div>
    </header>
  );
};

export default memo(Header);
