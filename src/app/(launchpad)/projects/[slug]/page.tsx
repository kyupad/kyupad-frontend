import React from 'react';
import { notFound } from 'next/navigation';
import { doGetSignInData, doVerifySignInWithSolana } from '@/actions/auth';
import { revalidateCurrentPath } from '@/actions/common';
import { setCookie } from '@/actions/jwt';
import { doGetProjectDetail } from '@/actions/project';
import DetailController from '@/components/features/detail';
import ProjectDetailHeader from '@/components/features/detail/header';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

async function ProjectDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const data = await doGetProjectDetail(slug);

  if (data?.statusCode === 404) {
    return notFound();
  }

  const detail = data?.data?.project;
  const notificationEmail = data?.data?.notification_email;
  const is_applied = data?.data?.is_applied;
  const usersAssets = data?.data?.users_assets;

  return (
    <div className="pt-[60px]">
      <ProjectDetailHeader detail={detail} />
      <DetailController
        data={detail}
        isApplied={is_applied}
        usersAssets={usersAssets}
        revalidatePath={revalidateCurrentPath}
        doGetSignInData={doGetSignInData}
        doVerifySignInWithSolana={doVerifySignInWithSolana}
        setCookie={setCookie}
        notificationEmail={notificationEmail}
      />
    </div>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default ProjectDetail;

// eslint-disable-next-line import/no-unused-modules
export const dynamic = 'force-dynamic';
