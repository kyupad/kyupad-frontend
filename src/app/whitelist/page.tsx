import React from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import CalendarCoundown from '@/components/common/coutdown/calendar';
import { Progress } from '@/components/common/progress/progress';
import { cn } from '@/utils/helpers';

import latDecorator from '/public/images/home/last-decorator.svg';
import whitelist from '/public/images/whitelist/unbox_nft.png';

const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

function Whitelist() {
  return (
    <>
      <div
        className={cn(
          'px-4 lg:px-[60px] py-5 mx-auto flex max-w-[1198px] gap-10 mt-[60px] flex-wrap justify-center items-center',
          fontHeading.variable,
        )}
      >
        <div className="flex flex-col gap-7 order-2 items-center lg:items-start lg:order-1">
          <h1 className="text-4xl sm:text-5xl xl:text-7xl font-heading text-kyu-color-13 leading-tight">
            Free Mint <br /> Whitelist Pass NFT
          </h1>

          <div className="flex flex-col gap-4 w-full">
            <div className="text-2xl font-bold text-kyu-color-11">End time</div>
            <CalendarCoundown time={new Date('2024-03-30').getTime()} />
            <div className="flex gap-4">
              <span className="text-xl">Claim schedule: </span>
              <span className="text-xl font-bold"> 31st May, 2024</span>
            </div>
          </div>

          <div className="max-w-[280px] flex flex-col gap-4 w-full">
            <PrimaryButton className="w-full">Free Mint</PrimaryButton>
            <div className="flex justify-between">
              <div>
                <span className="text-kyu-color-14 font-medium">Claimed</span>{' '}
                <span className="font-bold text-kyu-color-11">0</span>
              </div>
              <div>
                <span className="text-kyu-color-14 font-medium">Available</span>{' '}
                <span className="font-bold text-kyu-color-11">1</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-14 order-1 lg:order-2">
          <div className="max-w-[426px]">
            <Image src={whitelist} alt="whitelist" draggable={false} />
          </div>

          <div className="relative">
            <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
              1250
            </span>
            <Progress value={60} />
            <span className="absolute right-0 -top-8">
              <span className="text-kyu-color-14 font-medium">Total</span>{' '}
              <span className="font-bold text-kyu-color-11">20,000</span>
            </span>
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
}

// eslint-disable-next-line import/no-unused-modules
export default Whitelist;
