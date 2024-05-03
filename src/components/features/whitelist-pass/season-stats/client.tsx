'use client';

import React, { useEffect } from 'react';
import { Progress } from '@/components/common/progress/progress';
import { useSessionStore } from '@/contexts/session-store-provider';
import { appSyncClient } from '@/services/appsync';
import { subscribeToNftAction } from '@/services/appsync/subscriptions';
import { useWallet } from '@solana/wallet-adapter-react';

function SeasonStatsClient({
  mintedTotal,
  total,
  seasonId,
}: {
  mintedTotal: number;
  total: number;
  seasonId: string;
}) {
  const seasonMinted = useSessionStore((store) => store.seasonMinted);
  const { publicKey } = useWallet();
  const updateSeasonMinted = useSessionStore(
    (store) => store.updateSeasonMinted,
  );

  useEffect(() => {
    if (!seasonId) return;

    const mintedSubscription = (
      appSyncClient.graphql({
        query: subscribeToNftAction,
        variables: {
          season_id: seasonId,
        },
      }) as any
    ).subscribe({
      next: ({ data }: any) => {
        if (
          data?.subscribeToNftAction?.minted_wallet !== publicKey?.toBase58() &&
          seasonMinted[seasonId] < total
        ) {
          updateSeasonMinted(seasonId, seasonMinted[seasonId] + 1);
        }
      },
      error: (error: any) => console.error(error),
    });

    return () => {
      mintedSubscription.unsubscribe();
    };
  }, [publicKey, seasonId, seasonMinted, total]);

  useEffect(() => {
    if (mintedTotal > seasonMinted[seasonId]) {
      updateSeasonMinted(seasonId, mintedTotal);
    }
  }, [mintedTotal, seasonId, seasonMinted]);

  return (
    <>
      <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
        <span className="text-kyu-color-14 font-medium">Minted:</span>{' '}
        {(seasonMinted[seasonId] || mintedTotal) > total
          ? total
          : seasonMinted[seasonId] || mintedTotal}
      </span>
      <Progress
        value={
          (seasonMinted[seasonId] || mintedTotal) && total > 0
            ? ((seasonMinted[seasonId] || mintedTotal) / total) * 100
            : 0
        }
      />
    </>
  );
}

export default SeasonStatsClient;
