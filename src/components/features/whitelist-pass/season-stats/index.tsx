import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';

import SeasonStatsClient from './client';

async function SeasonStats() {
  const data = await doGetSeasonActive();
  return (
    <div className="relative">
      <SeasonStatsClient
        mintedTotal={data?.data?.season?.minted_total || 0}
        total={data?.data?.season?.total || 0}
        seasonId={data?.data?.season?._id}
      />

      <span className="absolute right-0 -top-8">
        <span className="text-kyu-color-14 font-medium">Total:</span>{' '}
        <span className="font-bold text-kyu-color-11">
          {data?.data?.season?.total || 0}
        </span>
      </span>
    </div>
  );
}

export default memo(SeasonStats);
