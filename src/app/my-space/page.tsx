import React from 'react';
import Image from 'next/image';
// import PrimaryButton from '@/components/common/button/primary';
// import { Input } from '@/components/common/input';
import Tabs from '@/components/common/tabs';
import MyInvestments from '@/components/features/my-space/my-investments';
import MyParticipations from '@/components/features/my-space/my-participations';
import catLeft from 'public/images/my-space/cat-left.png';
import copy from 'public/images/my-space/copy.svg';

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
            <div className="flex flex-col gap-4 px-[20px] py-4 sm:px-[60px] sm:py-[40px]">
              <h1 className="text-2xl sm:text-[32px] font-bold text-kyu-color-11 leading-[44px]">
                My Portfolio
              </h1>
              <div className="text-4xl sm:text-[60px] font-bold text-kyu-color-13 leading-[72px]">
                $133,943.1
              </div>
              <div className="flex gap-4 items-center">
                <span>
                  <span className="font-bold text-xl">Address:</span>{' '}
                  <span className="text-xl">0x57b7...21b264</span>
                </span>
                <button className="min-w-[32px]">
                  <Image src={copy} alt="Copy" />
                </button>
              </div>
            </div>
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
