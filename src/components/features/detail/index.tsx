'use client';

import React, { memo } from 'react';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';

import Registration from './registration';
import ViewRegistration from './view-registration';
import ViewSnapshot from './view-snapshot';

interface IDetailControllerProps {
  data: any;
  isApplied: boolean;
}

function DetailController({ data, isApplied }: IDetailControllerProps) {
  const viewMode = useProjectDetailStore((state) => state.viewMode);

  return (
    <div>
      {!viewMode && <Registration data={data} isApplied={isApplied} />}
      {viewMode === 'registration' && (
        <ViewRegistration registrationEndAt={data?.snapshot_at} />
      )}

      {viewMode === 'snapshot' && <ViewSnapshot data={data} />}
    </div>
  );
}

export default memo(DetailController);
