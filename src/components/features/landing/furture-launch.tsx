import React, { memo } from 'react';
import { doGetUpcomingProjects } from '@/adapters/projects';

import Pool from './pool';

async function FurtureLaunch() {
  const upcomingProjectResponse = await doGetUpcomingProjects({ limit: 1 });
  return (
    <>
      <Pool
        title="Fur-ture Launch"
        mode="active"
        direction="row"
        data={upcomingProjectResponse?.data || []}
      />
    </>
  );
}

export default memo(FurtureLaunch);
