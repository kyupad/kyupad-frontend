import React from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import Pool from '@/components/features/landing/pool';
import { cn } from '@/utils/helpers';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

const Home = () => {
  console.info('hihi');

  return (
    <div
      className={cn(
        'max-w-8xl mx-auto flex flex-col items-center pt-8 px-4 gap-32',
        fontHeading.variable,
      )}
    >
      <div className="max-w-[862px]">
        <Image
          src="/images/home/cat-banner.png"
          width={1726}
          height={1188}
          alt="Cat Banner"
          draggable="false"
        />

        <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-[80px] text-button-primary font-heading text-shadow-primary py-7 text-center">
          The Whisker-Winning
        </h1>

        <h2 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-button-primary-border">
          Community Launchpad on Solana
        </h2>
      </div>

      <div className="w-full">
        <h3 className="text-2xl sm:text-5xl md:text-6xl lg:text-[80px] text-button-primary font-heading text-shadow-primary pt-7 pb-16 text-center">
          Purrrr......
        </h3>

        <Pool title="Fur-ture Launch" active />
      </div>

      <Pool title="Purr-ticipate in these upcoming Launches" data={[1, 2, 3]} />
      <Pool
        title="Success-fur Launches"
        data={[
          { ended_at: 'mock' },
          { ended_at: 'mock' },
          { ended_at: 'mock' },
        ]}
      />
    </div>
  );
};

// eslint-disable-next-line import/no-unused-modules
export default Home;
