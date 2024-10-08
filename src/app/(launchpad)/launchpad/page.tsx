import React from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import { revalidateCurrentPath } from '@/actions/common';
import PrimaryButton from '@/components/common/button/primary';
import FurtureLaunch from '@/components/features/home/furture-launch';
import SuccessLaunch from '@/components/features/home/success-launch';
import UpcomingLaunch from '@/components/features/home/upcoming-launch';
import { cn } from '@/utils/helpers';
import { env } from 'env.mjs';

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

const Home = () => {
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
            <FurtureLaunch revalidatePath={revalidateCurrentPath} />
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
          <UpcomingLaunch revalidatePath={revalidateCurrentPath} />
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
            <a
              href={env.NEXT_PUBLIC_APPLY_FORM_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              <PrimaryButton className="min-w-[200px]">Apply now</PrimaryButton>
            </a>
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
