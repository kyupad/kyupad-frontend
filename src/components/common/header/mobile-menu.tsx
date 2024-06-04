'use client';

import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WEB_ROUTES } from '@/utils/constants';
import { env } from 'env.mjs';
import PrimaryButton from '@components/common/button/primary';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '../sheet';
import WalletConnect from './wallet-connect';
import discord from '/public/images/footer/discord.svg';
import x from '/public/images/footer/x.svg';

function MobileMenu({
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
}: {
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
}) {
  const [host, setHost] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHost(window.location.host || null);
    }
  }, []);

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
              {env.NEXT_PUBLIC_BASE_URL?.includes(host) && (
                <Link
                  href={WEB_ROUTES.WHITELIST_PASS}
                  className="relative group"
                >
                  Mint NFT
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
                </Link>
              )}
              {/* {isSolanaConnected && env.NEXT_PUBLIC_APP_URL?.includes(host) && (
                <Link href={WEB_ROUTES.MY_SPACE} className="relative group">
                  My Space
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
                </Link>
              )} */}
              {/* <Link href={WEB_ROUTES.HOME} className="relative group">
                Catnip Points
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
              </Link> */}
              <Link
                target="_blank"
                href={env.NEXT_PUBLIC_DOCS_URL}
                className="relative group"
                rel="noreferrer noopener"
              >
                About KyuPad
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-button-primary-hover transition-all group-hover:w-full"></span>
              </Link>
            </nav>
            <WalletConnect
              doGetSignInData={doGetSignInData}
              doVerifySignInWithSolana={doVerifySignInWithSolana}
              setCookie={setCookie}
              revalidatePath={() => {}}
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
          <SheetFooter />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default memo(MobileMenu);
