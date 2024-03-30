import React, { memo } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import bird from 'public/images/my-space/bird.png';
import catRight from 'public/images/my-space/cat-right.png';

const data = [
  {
    id: 1,
    name: 'Bunny Protocol',
    amount: 10000,
    symbol: '$BPT',
  },

  {
    id: 2,
    name: 'Bunny Protocol',
    amount: 10000,
    symbol: '$BPT',
  },

  {
    id: 3,
    name: 'Bunny Protocol',
    amount: 10000,
    symbol: '$BPT',
  },

  {
    id: 4,
    name: 'Bunny Protocol',
    amount: 10000,
    symbol: '$BPT',
  },

  {
    id: 5,
    name: 'Bunny Protocol',
    amount: 10000,
    symbol: '$BPT',
  },
];

function MyInvestments() {
  return (
    <div className="relative">
      <Image
        className="absolute top-28 left-[1280px] max-w-[428px]"
        src={catRight}
        alt="Cat Right"
        draggable={false}
      />
      <div className="px-4 py-10 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] max-w-[1080px] mx-auto flex gap-6 flex-col overflow-x-auto">
        {data.map((item) => (
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
                <span className="font-bold">10,000 </span>
                $BPT
              </div>
              <PrimaryButton className="min-w-[200px]">Claim</PrimaryButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MyInvestments);
