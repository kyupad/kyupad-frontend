import React from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import Pool from '@/components/features/landing/pool';
import { cn } from '@/utils/helpers';

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
        src="/images/home/gold-cloud.svg"
        width={1920}
        height={1427}
        alt="Gold cloud"
        style={{
          zIndex: -1,
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        draggable="false"
        className="top-[88vw] sm:top-[78vw] lg:top-[74vw] xl:top-[700px]"
      />

      <Image
        src="/images/home/rocket.png"
        width={668}
        height={448}
        alt="rocket"
        style={{
          zIndex: -1,
          position: 'absolute',
          transform: 'translateX(-50%)',
        }}
        draggable="false"
        className="top-[88vw] left-[88%] max-w-[100px] sm:max-w-[180px] lg:max-w-[334px] lg:top-[73vw] xl:top-[780px] xl:left-[73%]"
      />

      <div
        className={cn(
          'max-w-8xl mx-auto flex flex-col items-center pt-7 px-4 gap-[30px] sm:gap-[100px]',
          fontHeading.variable,
        )}
      >
        <div className="max-w-[1000px]">
          <Image
            src="/images/home/cat-banner.png"
            width={2002}
            height={1188}
            alt="Cat Banner"
            draggable="false"
            priority
          />

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

          <div className="lg:px-[24px] py-5">
            <Pool title="Fur-ture Launch" active />
          </div>
        </div>

        <div className="lg:px-[24px] relative">
          <Image
            src="/images/home/meo-left.png"
            width={622}
            height={608}
            alt="rocket"
            style={{
              zIndex: -1,
              position: 'absolute',
              transform: 'translateX(-50%)',
            }}
            draggable="false"
            className="top-[-40px] left-[40px] max-w-[100px] sm:max-w-[180px] sm:top-[-120px] sm:left-[80px] md:left-[30px] lg:max-w-[237px] lg:top-[-130px] lg:left-[-50px] xl:left-[120px] 2xl:left-[-80px] 2xl:top-[-140px]"
          />
          <Pool title="Upcoming Launches" data={[1, 2, 3]} upcoming />
        </div>

        <div className="lg:px-[24px] relative">
          <Image
            src="/images/home/meo-right.png"
            width={890}
            height={741}
            alt="rocket"
            style={{
              zIndex: -1,
              position: 'absolute',
            }}
            draggable="false"
            className="right-[-475px] top-[-100px] max-w-[403px]"
          />
          <Pool
            paging
            title="Success-fur Launches"
            data={[
              { ended_at: 'mock' },
              { ended_at: 'mock' },
              { ended_at: 'mock' },
            ]}
          />
        </div>

        <div className="flex flex-col gap-8 items-center">
          <div className="max-w-[1091px]">
            <Image
              src="/images/home/cat-space.png"
              width={2182}
              height={824}
              alt="Cat Space"
              draggable={false}
            />
          </div>
          <div className="flex gap-4 flex-col items-center">
            <div className="text-2xl font-heading sm:text-4xl text-center">
              Got an idea for a spaceship?
            </div>
            <div className="text-2xl font-bold sm:text-4xl text-center">
              Apply to launch your spaceship at Kyupad
            </div>
            <PrimaryButton>Apply now</PrimaryButton>
          </div>
        </div>
      </div>
      <Image
        src="/images/home/last-decorator.svg"
        alt=""
        width={1920}
        height={482}
        className="mx-auto 2xl:-mt-16"
      />
    </>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Home;
