import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GlobalStoreProvider from '@/contexts/global-store-provider';
import WalletConnectProvider from '@/contexts/wallet-connect-provider';
import { WEB_ROUTES } from '@/utils/constants';
import PrimaryButton from '@components/common/button/primary';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '../sheet';
import WalletConnect from './wallet-connect';

function MobileMenu({
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
}: {
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
}) {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <PrimaryButton>
            <Image
              src="/images/header/menu.svg"
              width={24}
              height={24}
              alt="Menu"
            />
          </PrimaryButton>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            {/* <SheetTitle>Edit profile</SheetTitle> */}
            {/* <SheetDescription></SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-8 py-4">
            <nav className="flex gap-8 text-xl flex-col">
              <Link href={WEB_ROUTES.WHITELIST} className="relative group">
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
          <SheetFooter />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default memo(MobileMenu);
