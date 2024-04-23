import React from 'react';
import { Metadata } from 'next';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import { doGetSeasonActive } from '@/actions/whitelist-pass';
import { Progress } from '@/components/common/progress/progress';
import ExclusivePool from '@/components/features/whitelist-pass/exclusive-pool';
// import FcfsPool from '@/components/features/whitelist-pass/fcfs-pool';
import WhitelistPassStep from '@/components/features/whitelist-pass/step';
import { cn } from '@/utils/helpers';

import latDecorator from '/public/images/home/last-decorator.svg';
import whitelist from '/public/images/whitelist/unbox_nft.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'Whitelist NFT',
};

async function Whitelist() {
  const data = await doGetSeasonActive();
  const mintingRoundRoadMap = data?.data?.minting_round_road_map || [];

  const roundStep = mintingRoundRoadMap?.map((r: any) => ({
    step: 1,
    start: r?.start_time,
    end: r?.end_time,
    title: r?.community_name || '',
  }));

  return (
    <>
      <div
        className={cn(
          'px-4 lg:px-[60px] py-5 mx-auto flex flex-col items-center gap-[100px]',
          fontHeading.variable,
        )}
      >
        <div
          className={cn(
            'flex max-w-[1198px] gap-10 mt-[60px] flex-wrap justify-center items-center xl:justify-between w-full',
          )}
        >
          <div className="flex flex-col gap-12 order-2 items-center sm:items-start lg:order-1">
            <h1 className="leading-tight text-kyu-color-11 flex flex-col gap-3">
              <span className="text-4xl sm:text-5xl xl:text-7xl font-heading">
                Free Mint
              </span>
              <span className="text-3xl sm:text-4xl xl:text-5xl font-bold">
                Whitelist Pass NFT
              </span>
            </h1>

            <div className="min-w-[300px] sm:min-w-[480px]">
              <div className="h-[284px] overflow-y-auto px-4 scrollbar">
                <WhitelistPassStep data={roundStep} direction="vertical" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-14 order-1 lg:order-2">
            <div className="max-w-[426px]">
              <Image src={whitelist} alt="whitelist" draggable={false} />
            </div>

            <div className="relative">
              <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
                {data?.data?.season?.minted_total || 0}
              </span>
              <Progress value={0} />
              <span className="absolute right-0 -top-8">
                <span className="text-kyu-color-14 font-medium">Total</span>{' '}
                <span className="font-bold text-kyu-color-11">
                  {data?.data?.season?.total || 0}
                </span>
              </span>
            </div>

            <div className="-mt-10">
              <span className="font-medium text-kyu-color-14">
                Total Whitelist Pass NFT minted:{' '}
              </span>
              <span className="font-bold">
                {data?.data?.season?.my_minted_total || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1198px]">
          <ExclusivePool />
        </div>

        {/* <div className="w-full max-w-[1198px]">
          <FcfsPool />
        </div> */}
      </div>

      <Image
        src={latDecorator}
        alt="decorator"
        className="mx-auto w-full"
        draggable={false}
      />
    </>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default Whitelist;

export const dynamic = 'force-dynamic';
