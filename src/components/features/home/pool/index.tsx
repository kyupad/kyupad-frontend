import React from 'react';
import Image from 'next/image';
import {
  doGetSuccessProjects,
  doGetUpcomingProjects,
} from '@/adapters/projects';

import PoolDetail from './pool-detail';
import UpcomingPool from './upcoming-pool';
import arrowLeft from '/public/images/home/arrow-left.svg';
import arrowRight from '/public/images/home/arrow-right.svg';

interface IPoolProps {
  title?: string;
  active?: boolean;
  upcoming?: boolean;
  paging?: boolean;
  mode: 'upcoming' | 'active' | 'success';
  direction?: 'row' | 'column';
}

const Pool = async ({
  title,
  active,
  upcoming,
  paging,
  mode,
  direction = 'column',
}: IPoolProps) => {
  const upcomingProjectResponse = doGetUpcomingProjects();
  const successProjectsResponse = doGetSuccessProjects();

  const getProjects = await Promise.all([
    upcomingProjectResponse,
    successProjectsResponse,
  ]);

  const upcomingProjects = getProjects?.[0]?.data || [];
  const successProjects = getProjects?.[1]?.data || [];
  let data = upcomingProjects;

  switch (mode) {
    case 'upcoming':
      data = upcomingProjects;
      break;
    case 'active':
      data = upcomingProjects?.slice(0, 1) || [];
      break;
    case 'success':
      data = successProjects;
      break;
    default:
      data = upcomingProjects;
      break;
  }

  return (
    <div className="w-full">
      <h4 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-heading text-center text-button-primary-border pb-10">
        {title}
      </h4>

      <div className="flex gap-[45px] flex-col xl:flex-row">
        {data
          .filter((pool: any, index: number) =>
            upcoming ? index > 0 && index < 3 : pool,
          )
          .map((item: any) => (
            <PoolDetail
              key={item.id}
              active={active}
              direction={direction}
              data={item}
              isSuccess={mode === 'success'}
            />
          ))}
        {upcoming && data && data?.length > 0 && <UpcomingPool />}
      </div>

      {paging && data && data?.length > 0 && (
        <div className="flex justify-center items-center gap-12 pt-8">
          <button className="p-4">
            <Image src={arrowLeft} alt="Previous" />
          </button>
          <div className="font-bold text-2xl">1/5</div>
          <button className="p-4">
            <Image src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pool;
