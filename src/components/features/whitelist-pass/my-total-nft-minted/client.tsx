'use client';

import React, { memo, useEffect } from 'react';
import Skeleton from '@/components/common/loading/skeleton';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useSessionStore } from '@/contexts/session-store-provider';
import { useWallet } from '@solana/wallet-adapter-react';

function MyTotalNftMintedClient({ mintedTotal }: { mintedTotal: number }) {
  const userSeasonMinted = useSessionStore((state) => state.user_season_minted);
  const updateUserSeasonMinted = useSessionStore(
    (state) => state.updateUserSeasonMinted,
  );

  const { connecting } = useWallet();

  useEffect(() => {
    if (mintedTotal > userSeasonMinted) {
      updateUserSeasonMinted(mintedTotal);
    }
  }, [mintedTotal, userSeasonMinted]);

  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );

  return isSolanaConnected ? (
    !connecting ? (
      <>
        <span className="font-medium text-kyu-color-14">
          {!userSeasonMinted && userSeasonMinted !== 0
            ? null
            : 'Total Whitelist Pass NFT minted: '}
        </span>
        <span className="font-bold">
          {!userSeasonMinted && userSeasonMinted !== 0
            ? null
            : userSeasonMinted}
        </span>
      </>
    ) : (
      <Skeleton className="h-2 w-8/12" />
    )
  ) : null;
}

export default memo(MyTotalNftMintedClient);
