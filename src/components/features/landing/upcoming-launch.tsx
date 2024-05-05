import React, { memo } from 'react';
import { doGetUpcomingProjects } from '@/adapters/projects';
import { revalidateCurrentPath } from '@actions/common';

import Pool from './pool';

async function UpcomingLaunch() {
  const upcomingProjectResponse = await doGetUpcomingProjects({
    limit: 4,
    page: 1,
  });

  let data = [];

  if (
    upcomingProjectResponse?.data?.projects &&
    upcomingProjectResponse?.data?.projects.length !== 0
  ) {
    data = upcomingProjectResponse?.data?.projects?.slice(1);
  }

  return (
    <>
      <Pool
        title="Upcoming Launches"
        mode="upcoming"
        direction="column"
        data={data}
        revalidatePath={revalidateCurrentPath}
      />
    </>
  );
}

export default memo(UpcomingLaunch);
