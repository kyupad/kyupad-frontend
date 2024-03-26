import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { doGetSignInData, doVerifySignInWithSolana } from '@/actions/auth';
import { setCookie } from '@/actions/jwt';
import GlobalStoreProvider from '@/contexts/global-store-provider';
import WalletConnectProvider from '@/contexts/wallet-connect-provider';
import { WEB_ROUTES } from '@/utils/constants';

import Skeleton from '../loading/skeleton';
import MobileMenu from './mobile-menu';

const WalletConnect = dynamic(() => import('./wallet-connect'), {
  ssr: false,
  loading: () => <Skeleton className="h-[52px] w-[220px]" />,
});

const Header = () => {
  return (
    <header className="flex w-full max-w-8xl mx-auto justify-between px-4 lg:px-[24px] py-5 flex-wrap gap-8">
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
      <div className="lg:hidden">
        <MobileMenu
          doGetSignInData={doGetSignInData}
          doVerifySignInWithSolana={doVerifySignInWithSolana}
          setCookie={setCookie}
        />
      </div>
      <div className="hidden gap-8 items-center flex-wrap lg:flex">
        <nav className="flex gap-8 text-xl">
          <Link href={WEB_ROUTES.HOME} className="relative group">
            Whitelist NFT
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
          <Link href={WEB_ROUTES.HOME} className="relative group">
            My Space
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
          <Link href={WEB_ROUTES.HOME} className="relative group">
            Catnip Points
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
          </Link>
        </nav>
        <GlobalStoreProvider>
          <WalletConnectProvider>
            <WalletConnect
              doGetSignInData={doGetSignInData}
              doVerifySignInWithSolana={doVerifySignInWithSolana}
              setCookie={setCookie}
            />
          </WalletConnectProvider>
        </GlobalStoreProvider>
      </div>
    </header>
  );
};

export default memo(Header);
