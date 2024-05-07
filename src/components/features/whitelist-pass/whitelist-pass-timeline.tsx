import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';

import WhitelistPassStep from './step';

async function WhitelistPassTimeline() {
  const data = await doGetSeasonActive();
  const mintingRoundRoadMap = data?.data?.minting_round_road_map || [];

  const roundStep = mintingRoundRoadMap?.map((r: any, i: number) => ({
    id: r?._id,
    step: i + 1,
    start: r?.start_time,
    end: r?.end_time,
    title: r?.community_name || '',
    active: r?.is_active_pool,
  }));

  return (
    <>
      <WhitelistPassStep data={roundStep} direction="vertical" />
    </>
  );
}

export default memo(WhitelistPassTimeline);
