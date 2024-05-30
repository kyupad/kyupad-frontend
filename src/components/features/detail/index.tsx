'use client';

import React, { memo, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';

import Registration from './registration';
import ViewClaim from './view-claim';
import ViewInvestment from './view-investment';
import ViewRegistration from './view-registration';
import ViewSnapshot from './view-snapshot';

interface IDetailControllerProps {
  data: any;
  isApplied: boolean;
  usersAssets?: { total_assets?: number; participants?: number };
  revalidatePath: Function;
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
}

function DetailController({
  data,
  isApplied,
  usersAssets,
  revalidatePath,
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
}: IDetailControllerProps) {
  const viewMode = useProjectDetailStore((state) => state.viewMode);
  const changeViewMode = useProjectDetailStore((state) => state.changeViewMode);
  const router = useRouter();

  const searchParanms = useSearchParams();
  const viewSearchParam = searchParanms.get('view');
  const pathName = usePathname();

  useEffect(() => {
    if (viewSearchParam === 'claim' && viewMode === 'claim') {
      router.replace(pathName, { scroll: false });
    }
    if (viewSearchParam === 'claim' && viewMode !== 'claim') {
      changeViewMode('claim');
    }
  }, [viewSearchParam, viewMode, pathName]);

  return (
    <div>
      {!viewMode && (
        <Registration
          data={data}
          isApplied={isApplied}
          usersAssets={usersAssets}
          revalidatePath={revalidatePath}
          doGetSignInData={doGetSignInData}
          doVerifySignInWithSolana={doVerifySignInWithSolana}
          setCookie={setCookie}
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
      {viewMode === 'investment' && <ViewInvestment data={data} />}
      {viewMode === 'claim' && <ViewClaim revalidatePath={revalidatePath} />}
    </div>
  );
}

export default memo(DetailController);
