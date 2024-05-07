'use client';

import React, { memo } from 'react';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';

import Registration from './registration';
import ViewRegistration from './view-registration';
import ViewSnapshot from './view-snapshot';

interface IDetailControllerProps {
  data: any;
  isApplied: boolean;
  usersAssets?: { total_assets?: number; participants?: number };
  revalidatePath?: Function;
}

function DetailController({
  data,
  isApplied,
  usersAssets,
  revalidatePath,
}: IDetailControllerProps) {
  const viewMode = useProjectDetailStore((state) => state.viewMode);

  return (
    <div>
      {!viewMode && (
        <Registration
          data={data}
          isApplied={isApplied}
          usersAssets={usersAssets}
          revalidatePath={revalidatePath}
        />
      )}
      {viewMode === 'registration' && (
        <ViewRegistration
          registrationEndAt={data?.timeline?.registration_end_at}
          revalidatePath={revalidatePath}
          usersAssets={usersAssets}
        />
      )}

      {viewMode === 'snapshot' && <ViewSnapshot data={data} />}
    </div>
  );
}

export default memo(DetailController);
