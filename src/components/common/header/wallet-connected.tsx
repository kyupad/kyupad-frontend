import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { useGlobalStore } from '@/contexts/global-store-provider';
import {
  ACCESS_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_STORAGE_KEY,
} from '@/utils/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { deleteCookie } from 'cookies-next';

import PrimaryButton from '../button/primary';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown';

function WalletConnected(_: { revalidatePath?: Function }) {
  const { publicKey, disconnect, wallet } = useWallet();
  const [open, setOpen] = useState<boolean>(false);
  const changeSolanaConnection = useGlobalStore(
    (state) => state.changeSolanaConnection,
  );

  const handleOpen = useCallback((value: boolean) => {
    setOpen(value);
  }, []);

  const renderWalletAddress = useCallback(() => {
    if (publicKey) {
      return (
        <>
          {(publicKey?.toBase58()?.slice(0, 5) || '') +
            '...' +
            (publicKey?.toBase58()?.slice(-5) || '')}
        </>
      );
    }

    return 'Loading...';
  }, [publicKey]);

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
                <div>{renderWalletAddress()}</div>
              </div>
            </PrimaryButton>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px] font-bold">
          <DropdownMenuItem
            className="flex justify-center cursor-pointer"
            onClick={async () => {
              deleteCookie(
                ACCESS_TOKEN_STORAGE_KEY,
                ACCESS_TOKEN_COOKIE_CONFIG,
              );
              deleteCookie(
                REFRESH_TOKEN_STORAGE_KEY,
                REFRESH_TOKEN_COOKIE_CONFIG,
              );
              sessionStorage.clear();
              localStorage.clear();
              await disconnect();
              changeSolanaConnection(false);
              window.location.reload();
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
