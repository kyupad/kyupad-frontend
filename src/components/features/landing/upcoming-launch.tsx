import React, { memo } from 'react';
import { doGetUpcomingProjects } from '@/adapters/projects';

import Pool from './pool';

async function UpcomingLaunch() {
  const upcomingProjectResponse = await doGetUpcomingProjects({
    limit: 3,
    skip: 1,
  });
  return (
    <>
      <Pool
        title="Upcoming Launches"
        mode="upcoming"
        upcoming
        direction="column"
        data={upcomingProjectResponse?.data || []}
      />
    </>
  );
}

export default memo(UpcomingLaunch);
