import React, { memo } from 'react';
import { Knewave } from 'next/font/google';
import Image from 'next/image';
// import SecondaryButton from '@/components/common/button/secondary';
import { cn } from '@/utils/helpers';
// import bird from 'public/images/my-space/bird.png';
import catRight from 'public/images/my-space/cat-right.png';

// const data = [
//   {
//     id: 1,
//     name: 'Bunny Protocol',
//     status: 'Ongoing',
//   },

//   {
//     id: 2,
//     name: 'Bunny Protocol',
//     status: 'Ongoing',
//   },

//   {
//     id: 3,
//     name: 'Bunny Protocol',
//     status: 'Ended',
//   },

//   {
//     id: 4,
//     name: 'Bunny Protocol',
//     status: 'Won',
//   },

//   {
//     id: 5,
//     name: 'Bunny Protocol',
//     status: 'Won',
//   },
// ];
const fontHeading = Knewave({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400'],
});

function MyParticipations() {
  return (
    <div className={cn('relative ', fontHeading.variable)}>
      <Image
        className="absolute top-28 left-[1280px] max-w-[428px]"
        src={catRight}
        alt="Cat Right"
        draggable={false}
      />
      <p className="text-center font-heading text-4xl h-[400px]">
        Coming soon...
      </p>
      {/* <div className="px-4 py-10 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] max-w-[1080px] mx-auto flex gap-6 flex-col overflow-x-auto">
        {data.map((item) => {
          const statusColor =
            item.status === 'Ongoing'
              ? 'text-kyu-color-17'
              : item.status === 'Ended'
                ? 'text-kyu-color-18'
                : 'text-kyu-color-13';
          return (
            <div
              key={item.id}
              className="flex items-center justify-between gap-[100px]"
            >
              <div className="flex items-center gap-4">
                <div className="max-w-16 min-w-16">
                  <Image src={bird} alt="Bird" />
                </div>
                <div className="font-bold text-2xl whitespace-nowrap">
                  Bunny Protocol
                </div>
              </div>
              <div className="flex items-center gap-[100px]">
                <div className="text-2xl whitespace-nowrap">
                  <span className={cn('font-bold', statusColor)}>
                    {item.status}
                  </span>
                </div>
                <SecondaryButton className="min-w-[200px]">
                  Details
                </SecondaryButton>
              </div>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default memo(MyParticipations);
