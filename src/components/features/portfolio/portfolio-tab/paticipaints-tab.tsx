import React, { memo } from 'react';
import Image from 'next/image';
import Secondary from '@/components/common/button/secondary';

type Props = {
  image: string;
  potocol: string;
  symbol: string;
  status: {
    title: string;
    color: string;
  };
}[];

const PaticipantsTab = ({ data }: { data: Props }) => {
  return (
    <div className="max-w-6xl px-3 md:px-8  bg-[#EEEDF1] border-primary border-2 xl:mx-auto md:mx-6 rounded-lg my-10">
      {data?.length > 0
        ? data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex py-3 items-center text-base md:text-2xl"
              >
                <span className="flex gap-1 md:gap-5 flex-[25%]  items-center">
                  <Image
                    width={64}
                    height={64}
                    src={item.image}
                    alt="logo"
                    className="max-w-8 md:max-w-16"
                  />
                  <span className="font-bold">{item.potocol}</span>
                </span>
                <span className="md:flex-[20%] flex-[17%]  text-center">
                  {item.symbol}
                </span>
                <span
                  className={`text-[${item.status.color}] flex-[20%] text-left`}
                >
                  {item.status.title}
                </span>
                <span>
                  <Secondary className="md:w-[200px] w-fit text-base md:text-xl">
                    Details
                  </Secondary>
                </span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default memo(PaticipantsTab);
