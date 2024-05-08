import React, { Suspense } from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import Skeleton from '@/components/common/loading/skeleton';
import FurtureLaunch from '@/components/features/landing/furture-launch';
import SuccessLaunch from '@/components/features/landing/success-launch';
import UpcomingLaunch from '@/components/features/landing/upcoming-launch';
import UpcomingLoading from '@/components/features/landing/upcoming-loading';
import { cn } from '@/utils/helpers';

import catBanner from '/public/images/home/cat-banner.png';
import catSpace from '/public/images/home/cat-space.png';
import goldCloud from '/public/images/home/gold-cloud.svg';
import latDecorator from '/public/images/home/last-decorator.svg';
import catLeft from '/public/images/home/meo-left.png';
import catRight from '/public/images/home/meo-right.png';
import rocket from '/public/images/home/rocket.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

const Home = async () => {
  return (
    <>
      <Image
        src={goldCloud}
        alt="Gold cloud"
        style={{
          zIndex: -1,
        }}
        draggable="false"
        className="top-[88vw] sm:top-[78vw] lg:top-[74vw] xl:top-[700px] absolute left-1/2 -translate-x-1/2 w-full"
      />

      <Image
        src={rocket}
        alt="rocket"
        style={{
          zIndex: -1,
        }}
        draggable="false"
        className="top-[88vw] left-[88%] max-w-[100px] sm:max-w-[180px] lg:max-w-[334px] lg:top-[73vw] xl:top-[780px] xl:left-[73%] absolute -translate-x-1/2"
      />

      <div
        className={cn(
          'max-w-8xl mx-auto flex flex-col items-center pt-7 px-4 lg:px-[60px] gap-[30px] sm:gap-[100px]',
          fontHeading.variable,
        )}
      >
        <div className="max-w-[1000px]">
          <Image src={catBanner} alt="Cat Banner" draggable="false" priority />

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-heading text-shadow-primary-mobile pt-[26px] pb-2 sm:py-[26px] text-center">
            The Whisker-Winning
          </h1>

          <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-button-primary-border">
            Community Launchpad on Solana
          </h2>
        </div>

        <div className="w-full">
          <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-[80px] font-heading pt-8 sm:pb-8 lg:pt-16 text-center z-[2]">
            Purrrr......
          </h3>

          <div className="py-5">
            <Suspense
              fallback={
                <div className="w-full">
                  <div className="pb-10">
                    <Skeleton className="h-[14px] sm:h-6 md:h-[30px] lg:h-9 w-1/3 mx-auto" />
                  </div>
                  <div className="flex bg-[#FFF9EB] border-4 lg:p-10 border-button-primary-border rounded-[12px] shadow-[19px_18px_0px_0px_rgba(42,_39,_58,_0.1)] md:w-full lg:gap-10 flex-col lg:flex-row relative">
                    <div className="w-full lg:w-5/12 px-6 pb-6 pt-3 lg:p-0 flex gap-6 flex-col order-2 lg:order-1">
                      <Skeleton className="h-5" />
                      <Skeleton className="h-[180px] rounded-[24px]" />
                      <Skeleton className="h-5 rounded-[24px]" />
                      <Skeleton className="h-5 rounded-[24px]" />
                      <Skeleton className="h-5 rounded-[24px]" />
                      <Skeleton className="h-5 rounded-[24px]" />
                      <Skeleton className="h-[48px] rounded-[8px]" />
                    </div>
                    <div className="lg:w-7/12 relative rounded-tl-[8px] rounded-tr-[8px] lg:rounded-[8px] overflow-hidden order-1 lg:order-2 pb-[56.25%] lg:pb-0">
                      <Skeleton className="h-full" />
                    </div>
                  </div>
                </div>
              }
            >
              <FurtureLaunch />
            </Suspense>
          </div>
        </div>

        <div className="relative w-full">
          <Image
            src={catLeft}
            alt="cat left"
            style={{
              zIndex: -1,
            }}
            draggable="false"
            className="top-[-40px] left-[40px] max-w-[100px] sm:max-w-[180px] sm:top-[-120px] sm:left-[80px] md:left-[30px] lg:max-w-[237px] lg:top-[-130px] lg:left-[-50px] xl:left-[120px] 2xl:left-[-80px] 2xl:top-[-140px] absolute -translate-x-1/2"
          />
          <Suspense fallback={<UpcomingLoading />}>
            <UpcomingLaunch />
          </Suspense>
        </div>

        <div className="relative w-full">
          <Image
            src={catRight}
            alt="cat right"
            style={{
              zIndex: -1,
            }}
            draggable="false"
            className="right-[-475px] top-[-100px] max-w-[403px] absolute"
          />
          <SuccessLaunch />
        </div>

        <div className="flex flex-col gap-8 items-center">
          <div className="max-w-[1091px]">
            <Image src={catSpace} alt="Cat Space" draggable={false} />
          </div>
          <div className="flex gap-4 flex-col items-center">
            <div className="text-2xl font-heading sm:text-4xl text-center">
              Got an idea for a spaceship?
            </div>
            <div className="text-2xl font-bold sm:text-4xl text-center">
              Apply to launch your spaceship at Kyupad
            </div>
            <PrimaryButton className="min-w-[200px]">Apply now</PrimaryButton>
          </div>
        </div>
      </div>
      <Image
        src={latDecorator}
        alt="decorator"
        className="mx-auto 2xl:-mt-16 w-full"
        draggable={false}
      />
    </>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Home;

// eslint-disable-next-line import/no-unused-modules
export const dynamic = 'force-dynamic';
