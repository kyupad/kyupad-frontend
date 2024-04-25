import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';
import { Progress } from '@/components/common/progress/progress';

async function SeasonStats() {
  const data = await doGetSeasonActive();
  return (
    <div className="relative">
      <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
        {data?.data?.season?.minted_total || 0}
      </span>
      <Progress
        value={
          data?.data?.season?.minted_total > 0 && data?.data?.season?.total
            ? (data?.data?.season?.minted_total / data?.data?.season?.total) *
              100
            : 0
        }
      />
      <span className="absolute right-0 -top-8">
        <span className="text-kyu-color-14 font-medium">Total</span>{' '}
        <span className="font-bold text-kyu-color-11">
          {data?.data?.season?.total || 0}
        </span>
      </span>
    </div>
  );
}

export default memo(SeasonStats);
