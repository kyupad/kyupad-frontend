import React, { memo } from 'react';
import { doGetSeasonActive } from '@/actions/whitelist-pass';

import WhitelistPassStep from './step';

async function WhitelistPassTimeline() {
  const data = await doGetSeasonActive();
  const mintingRoundRoadMap = data?.data?.minting_round_road_map || [];

  const roundStep = mintingRoundRoadMap?.map((r: any, i: number) => ({
    step: i + 1,
    start: r?.start_time,
    end: r?.end_time,
    title: r?.community_name || '',
  }));

  return (
    <>
      <WhitelistPassStep data={roundStep} direction="vertical" />
    </>
  );
}

export default memo(WhitelistPassTimeline);
