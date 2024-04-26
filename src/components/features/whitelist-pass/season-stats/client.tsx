'use client';

import React, { useEffect } from 'react';
import { Progress } from '@/components/common/progress/progress';
import { useSessionStore } from '@/contexts/session-store-provider';

function SeasonStatsClient({
  mintedTotal,
  total,
}: {
  mintedTotal: number;
  total: number;
}) {
  const seasonMinted = useSessionStore((store) => store.seasonMinted);
  const updateSeasonMinted = useSessionStore(
    (store) => store.updateSeasonMinted,
  );

  useEffect(() => {
    if (mintedTotal > seasonMinted) {
      updateSeasonMinted(mintedTotal);
    }
  }, [mintedTotal, seasonMinted, updateSeasonMinted]);

  return (
    <>
      <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
        <span className="text-kyu-color-14 font-medium">Minted:</span>{' '}
        {seasonMinted}
      </span>
      <Progress
        value={seasonMinted > 0 && total > 0 ? (seasonMinted / total) * 100 : 0}
      />
    </>
  );
}

export default SeasonStatsClient;
