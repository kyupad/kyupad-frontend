import React, { memo } from 'react';
import Tabs from '@/components/common/tabs';

import ProjectDescription from './project-description';
import RegistrationStep from './step';
import Timeline from './timeline';
import TokenSale from './token-sale';

interface IRegistrationProps {
  data: any;
  isApplied: boolean;
}

const Registation = ({ isApplied, data }: IRegistrationProps) => {
  const dataStep = [
    {
      step: 1,
      title: 'Registration',
      time: data?.timeline?.registration_start_at,
    },
    {
      step: 2,
      title: 'Snapshot',
      time: data?.timeline?.snapshot_start_at,
    },
    {
      step: 3,
      title: 'Investment',
      time: data?.timeline?.investment_start_at,
    },
    {
      step: 4,
      title: 'Claim',
      time: data?.timeline?.claim_start_at,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex flex-col gap-5 pb-4">
        <p className="text-xl text-justify">{data?.short_description || ''}</p>

        <RegistrationStep
          data={dataStep}
          projectId={data?.id}
          isApplied={isApplied}
        />

        <div className="p-4 lg:p-10 border-2 border-kyu-color-11 rounded-[16px] bg-kyu-color-2 mt-5 flex flex-col gap-6">
          <div className="flex justify-between gap-4 sm:gap-[50px] xl:gap-[216px] flex-col sm:flex-row">
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full justify-between items-center gap-4">
                <span className="text-xl">Total raise</span>
                <span className="text-xl md:text-2xl font-bold text-end">
                  $200,000
                </span>
              </div>
              <div className="flex w-full justify-between items-center gap-4">
                <span className="text-xl">Price</span>
                <span className="text-xl md:text-2xl font-bold text-end">
                  1 STAR = 0.1 USDT
                </span>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex w-full justify-between items-center gap-4">
                <span className="text-xl">Token Offerred</span>
                <span className="text-xl md:text-2xl font-bold text-end">
                  100,000,000 STAR
                </span>
              </div>
              <div className="flex w-full justify-between items-center gap-4">
                <span className="text-xl">Ticket size</span>
                <span className="text-xl md:text-2xl font-bold text-end">
                  300 USDT
                </span>
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-black w-full" />

          <div className="flex-col flex justify-between items-center gap-4 sm:flex-row sm:gap-[50px] xl:gap-[216px]">
            <div className="flex justify-between w-full items-center gap-4">
              <span className="text-xl">Total Assets Connected</span>
              <span className="text-xl md:text-2xl font-bold text-end">
                $11,232,657.13
              </span>
            </div>

            <div className="flex justify-between w-full items-center gap-4">
              <span className="text-xl">Participants</span>
              <span className="text-xl md:text-2xl font-bold text-end">
                11,342
              </span>
            </div>
          </div>
        </div>
      </div>

      <Tabs
        items={[
          {
            key: 'Project Description',
            label: 'Project Description',
            children: <ProjectDescription />,
          },
          {
            key: 'Timeline',
            label: 'Timeline',
            children: <Timeline />,
          },
          {
            key: 'Token Sale',
            label: 'Token Sale',
            children: <TokenSale />,
          },
        ]}
      />
    </div>
  );
};

export default memo(Registation);
