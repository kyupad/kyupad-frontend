import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Skeleton from '@/components/common/loading/skeleton';
import ExclusivePool from '@/components/features/whitelist-pass/exclusive-pool';
import MyTotalNftMinted from '@/components/features/whitelist-pass/my-total-nft-minted';
import SeasonStats from '@/components/features/whitelist-pass/season-stats';
// import FcfsPool from '@/components/features/whitelist-pass/fcfs-pool';
import WhitelistPassTimeline from '@/components/features/whitelist-pass/whitelist-pass-timeline';
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
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-5">
                      <div>
                        <Skeleton className="h-[24px] w-1/3 mb-2" />
                        <Skeleton className="h-[22px]" />
                      </div>

                      <div>
                        <Skeleton className="h-[24px] w-1/3 mb-2" />
                        <Skeleton className="h-[22px]" />
                      </div>

                      <div>
                        <Skeleton className="h-[24px] w-1/3 mb-2" />
                        <Skeleton className="h-[22px]" />
                      </div>

                      <div>
                        <Skeleton className="h-[24px] w-1/3 mb-2" />
                        <Skeleton className="h-[22px]" />
                      </div>
                    </div>
                  }
                >
                  <WhitelistPassTimeline />
                </Suspense>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-14 order-1 lg:order-2">
            <div className="max-w-[426px]">
              <Image src={whitelist} alt="whitelist" draggable={false} />
            </div>

            <Suspense
              fallback={
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-2 w-10" />
                    <Skeleton className="h-2 w-20" />
                  </div>
                  <Skeleton className="h-2" />
                </div>
              }
            >
              <SeasonStats />
            </Suspense>

            <Suspense fallback={<Skeleton className="h-2 w-8/12 -mt-10" />}>
              <MyTotalNftMinted />
            </Suspense>
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
