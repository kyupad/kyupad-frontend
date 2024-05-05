import React, { memo } from 'react';
import { doGetUpcomingProjects } from '@/adapters/projects';
import { revalidateCurrentPath } from '@actions/common';

import Pool from './pool';

async function FurtureLaunch() {
  const upcomingProjectResponse = await doGetUpcomingProjects({ limit: 1 });
  return (
    <>
      <Pool
        title="Fur-ture Launch"
        mode="active"
        direction="row"
        data={upcomingProjectResponse?.data?.projects || []}
        revalidatePath={revalidateCurrentPath}
      />
    </>
  );
}

export default memo(FurtureLaunch);
