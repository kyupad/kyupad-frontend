import React, { memo, useEffect } from 'react';
import Skeleton from '@/components/common/loading/skeleton';
import { Progress } from '@/components/common/progress/progress';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useSessionStore } from '@/contexts/session-store-provider';
import { appSyncClient } from '@/services/appsync';
import { subscribeToNftAction } from '@/services/appsync/subscriptions';
import { ACCESS_TOKEN_STORAGE_KEY } from '@/utils/constants';
import { useWallet } from '@solana/wallet-adapter-react';
import { getCookie } from 'cookies-next';
import jsonwebtoken from 'jsonwebtoken';

function UserPoolMinted({
  currentPoolId,
  poolId,
  currentUserPoolMintedTotal,
  loading = false,
  currentMintedTotal,
  currentPoolSupply,
  seasonId,
}: {
  currentPoolId: string;
  poolId?: string;
  currentUserPoolMintedTotal: number;
  loading?: boolean;
  currentMintedTotal: number;
  currentPoolSupply: number;
  seasonId?: string;
}) {
  const { publicKey } = useWallet();
  const poolCounterKey = `${poolId}_${publicKey?.toBase58()}`;
  const { poolsCounter, updatePoolCounter } = useSessionStore((state) => state);
  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );

  const userPoolMinted = isSolanaConnected
    ? (poolsCounter[poolId || currentPoolId] || currentMintedTotal || 0) -
      (currentUserPoolMintedTotal || 0) +
      (poolsCounter[poolCounterKey] || 0)
    : poolsCounter[poolId || currentPoolId] || currentMintedTotal;

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
        const currentCounter = poolsCounter[poolId || currentPoolId] || 0;

        if (
          poolId &&
          data?.subscribeToNftAction?.minted_wallet !== publicKey?.toBase58() &&
          currentCounter < currentPoolSupply &&
          data?.subscribeToNftAction?.pool_id === poolId
        ) {
          updatePoolCounter(poolId, (currentCounter || 0) + 1);
        }
      },
      error: (error: any) => console.error(error),
    });

    return () => {
      mintedSubscription.unsubscribe();
    };
  }, [
    currentMintedTotal,
    currentPoolId,
    currentPoolSupply,
    poolId,
    poolsCounter,
    publicKey,
    seasonId,
    updatePoolCounter,
  ]);

  useEffect(() => {
    if (publicKey && poolId && poolId === currentPoolId) {
      const currentCounter = poolsCounter[poolCounterKey] || 0;

      const token = getCookie(ACCESS_TOKEN_STORAGE_KEY);

      const sub = token ? jsonwebtoken.decode(token)?.sub : '';

      if (
        currentUserPoolMintedTotal > currentCounter &&
        sub === publicKey?.toBase58()
      ) {
        updatePoolCounter(poolCounterKey, currentUserPoolMintedTotal || 0);
      }
    }
  }, [
    currentPoolId,
    currentUserPoolMintedTotal,
    poolCounterKey,
    poolId,
    poolsCounter,
    publicKey,
  ]);

  useEffect(() => {
    if (poolId && poolId === currentPoolId) {
      const currentCounter = poolsCounter[poolId] || 0;

      if (currentMintedTotal > currentCounter) {
        updatePoolCounter(poolId, currentMintedTotal || 0);
      }
    }
  }, [currentMintedTotal, currentPoolId, poolId, poolsCounter]);

  return (
    <>
      {loading ? (
        <Skeleton className="h-4 w-1/12 absolute left-0 -top-6" />
      ) : (
        <>
          <span className="absolute left-0 -top-8">
            <span className="text-kyu-color-14 font-medium">{'Minted: '}</span>
            <span className="font-bold text-kyu-color-11">
              {userPoolMinted > currentPoolSupply
                ? currentPoolSupply
                : userPoolMinted}
            </span>
          </span>
        </>
      )}
      {loading ? (
        <Skeleton className="h-2" />
      ) : (
        <Progress
          value={
            userPoolMinted > 0 && currentPoolSupply > 0
              ? (userPoolMinted / currentPoolSupply) * 100
              : 0
          }
        />
      )}
    </>
  );
}

export default memo(UserPoolMinted);
