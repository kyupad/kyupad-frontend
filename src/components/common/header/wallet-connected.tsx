import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/contexts/global-store-provider';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { deleteCookie } from 'cookies-next';
import { env } from 'env.mjs';

import PrimaryButton from '../button/primary';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown';

function WalletConnected({ revalidatePath }: { revalidatePath: Function }) {
  const { publicKey, disconnect, wallet } = useWallet();
  const [open, setOpen] = useState<boolean>(false);
  const changeSolanaConnection = useGlobalStore(
    (state) => state.changeSolanaConnection,
  );

  const handleOpen = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <div>
            <PrimaryButton
              className="relative min-h-[52px] min-w-[220px] text-xl"
              onClick={() => handleOpen(!open)}
              data-state={open ? 'open' : 'close'}
            >
              <div className="flex items-center justify-center gap-3">
                {wallet?.adapter?.icon && (
                  <div className="min-w-[28px]">
                    <Image
                      src={wallet.adapter.icon}
                      alt="icon"
                      width={28}
                      height={28}
                    />
                  </div>
                )}
                <div>
                  {(publicKey?.toBase58()?.slice(0, 5) || '') +
                    '...' +
                    (publicKey?.toBase58()?.slice(-5) || '')}
                </div>
              </div>
            </PrimaryButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px] font-bold">
          <DropdownMenuItem
            className="flex justify-center cursor-pointer"
            onClick={async () => {
              changeSolanaConnection(false);
              await disconnect();
              deleteCookie(ACCESS_TOKEN_STORAGE_KEY, {
                domain: env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
              });
              deleteCookie(REFRESH_TOKEN_STORAGE_KEY, {
                domain: env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
              });
              revalidatePath(window.location.pathname);
            }}
          >
            <span className="text-xl">Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default memo(WalletConnected);
