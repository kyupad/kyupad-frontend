import { memo, useEffect } from 'react';
import { Progress } from '@/components/common/progress/progress';
import { useSessionStore } from '@/contexts/session-store-provider';
import { appSyncClient } from '@/services/appsync';
import { subscribeToIdoAction } from '@/services/appsync/subscriptions';
import { useWallet } from '@solana/wallet-adapter-react';

function InvestingStatus({
  totalInvested,
  projectId,
  totalTicket,
}: {
  totalInvested: number;
  projectId: string;
  totalTicket: number;
}) {
  const investedTickets = useSessionStore((state) => state.investedTickets);
  const updateInvestedTickets = useSessionStore(
    (state) => state.updateInvestedTickets,
  );
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!projectId) return;

    const investedSubscription = (
      appSyncClient.graphql({
        query: subscribeToIdoAction,
        variables: {
          project__id: projectId,
        },
      }) as any
    ).subscribe({
      next: ({ data }: any) => {
        if (
          data?.subscribeToIdoAction?.invested_wallet !==
            publicKey?.toBase58() &&
          (investedTickets[projectId] || 0) < totalTicket &&
          data?.subscribeToIdoAction?.project__id === projectId &&
          (investedTickets[projectId] || 0) +
            (data?.subscribeToIdoAction?.invested_total || 0) <=
            totalTicket
        ) {
          updateInvestedTickets(
            projectId,
            (investedTickets[projectId] || 0) +
              (data?.subscribeToIdoAction?.invested_total || 0),
          );
        }
      },
      error: (error: any) => console.error(error),
    });

    return () => {
      investedSubscription.unsubscribe();
    };
  }, [investedTickets, projectId, publicKey, totalTicket]);

  useEffect(() => {
    if (!projectId) return;

    if (totalInvested > (investedTickets[projectId] || 0)) {
      updateInvestedTickets(projectId, totalInvested);
    }
  }, [investedTickets, projectId, totalInvested]);

  return (
    <>
      <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
        <span className="text-kyu-color-14 font-medium">Invested:</span>{' '}
        {(investedTickets[projectId] || totalInvested) > totalTicket
          ? totalTicket.toLocaleString('en-US') || 0
          : investedTickets[projectId]?.toLocaleString('en-US') ||
            totalInvested?.toLocaleString('en-US') ||
            0}
      </span>
      <Progress
        className="rounded-[100px]"
        value={
          (investedTickets[projectId] || totalInvested) && totalTicket > 0
            ? ((investedTickets[projectId] || totalInvested) / totalTicket) *
              100
            : 0
        }
      />
    </>
  );
}

export default memo(InvestingStatus);
