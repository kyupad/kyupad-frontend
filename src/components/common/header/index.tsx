import React, { memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { doGetSignInData, doVerifySignInWithSolana } from '@/actions/auth';
import { revalidateCurrentPath } from '@/actions/common';
import { setCookie } from '@/actions/jwt';
import { WEB_ROUTES } from '@/utils/constants';

import Skeleton from '../loading/skeleton';
import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import discord from '/public/images/footer/discord.svg';
import x from '/public/images/footer/x.svg';
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
        <WalletConnect
          doGetSignInData={doGetSignInData}
          doVerifySignInWithSolana={doVerifySignInWithSolana}
          setCookie={setCookie}
          revalidatePath={revalidateCurrentPath}
        />
        <div className="flex gap-3">
          <a
            href="https://discord.gg/kyupad"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image src={discord} alt="Discord" />
          </a>
          <a
            href="https://twitter.com/Kyupad_xyz"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image src={x} alt="X" />
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
