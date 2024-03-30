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
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import kyupadLogo from '/public/images/header/kyupad-logo.svg';

const WalletConnect = dynamic(() => import('./wallet-connect'), {
  ssr: false,
  loading: () => <Skeleton className="h-[52px] w-[220px]" />,
});

const Header = () => {
  return (
    <header className="flex w-full max-w-8xl mx-auto justify-between px-4 lg:px-[60px] py-5 flex-wrap gap-8">
      <div className="max-w-[144px] min-w-[144px]">
        <Link href={WEB_ROUTES.HOME}>
          <Image src={kyupadLogo} alt="Kyupad Logo" draggable={false} />
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
        <DesktopMenu />
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
