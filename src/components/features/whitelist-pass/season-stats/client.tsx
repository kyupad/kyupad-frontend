'use client';

import React, { useEffect } from 'react';
import { Progress } from '@/components/common/progress/progress';
import { useSessionStore } from '@/contexts/session-store-provider';

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
  const updateSeasonMinted = useSessionStore(
    (store) => store.updateSeasonMinted,
  );

  useEffect(() => {
    if (mintedTotal > (seasonMinted[seasonId] || 0)) {
      updateSeasonMinted(seasonId, mintedTotal);
    }
  }, [mintedTotal, seasonId, seasonMinted]);

  return (
    <>
      <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
        <span className="text-kyu-color-14 font-medium">Minted:</span>{' '}
        {seasonMinted[seasonId] || mintedTotal}
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
