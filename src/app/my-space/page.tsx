import React from 'react';
import Image from 'next/image';
// import PrimaryButton from '@/components/common/button/primary';
// import { Input } from '@/components/common/input';
import Tabs from '@/components/common/tabs';
import MyInvestments from '@/components/features/my-space/my-investments';
import MyParticipations from '@/components/features/my-space/my-participations';
import catLeft from 'public/images/my-space/cat-left.png';
import MySpaceBalance from '@components/features/my-space/balance';

const MySpace = () => {
  return (
    <div>
      <div className="mx-auto after:fixed after:w-full after:top-0 after:left-0 after:h-full after:bg-kyu-color-1 after:-z-[1] px-4 lg:px-[60px] max-w-8xl">
        <div className="relative my-[60px] max-w-[1080px] mx-auto">
          <Image
            className="absolute top-10 -left-[350px] max-w-[276px]"
            src={catLeft}
            alt="Cat Left"
            draggable={false}
          />
          <div className="flex bg-kyu-color-2 rounded-[16px] border-2 border-kyu-color-11 justify-between items-center flex-wrap">
            <MySpaceBalance />
            <div className="px-[20px] py-4 sm:px-[60px] sm:py-[40px] gap-3 w-full max-w-[536px] flex flex-col">
              {/* <Input label="Email:" value="noahduong@kyupad.xyz" />
              <Input
                label="KYC Status:"
                className="pl-[105px] text-green-500"
                value="Completed"
              />
              <PrimaryButton className="max-w-[200px]">Submit</PrimaryButton> */}
            </div>
          </div>
        </div>
      </div>

      <Tabs
        items={[
          {
            key: 'My Investments',
            label: 'My Investments',
            children: <MyInvestments />,
          },
          {
            key: 'My Participations',
            label: 'My Participations',
            children: <MyParticipations />,
          },
        ]}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default MySpace;
