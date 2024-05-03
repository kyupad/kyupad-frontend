import React, { memo } from 'react';
import { doGetSuccessProjects } from '@/adapters/projects';

import Pool from './pool';

async function SuccessLaunch() {
  const successProjectResponse = await doGetSuccessProjects();

  return (
    <>
      <Pool
        paging
        title="Success-fur Launches"
        mode="success"
        direction="column"
        data={successProjectResponse?.data || []}
      />
    </>
  );
}

export default memo(SuccessLaunch);
