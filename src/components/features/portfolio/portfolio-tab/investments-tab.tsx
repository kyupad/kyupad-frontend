import React, { memo } from 'react';
import Image from 'next/image';
import Primary from '@/components/common/button/primary';

type Props = {
  image: string;
  potocol: string;
  claim: number;
  symbol: string;
}[];

const InvestmentsTab = ({ data }: { data: Props }) => {
  return (
    <div className="max-w-[1080px] px-3 lg:px-8 bg-[#EEEDF1] border-primary border-2 xl:mx-auto md:mx-6 rounded-lg my-10 mb-[200px]">
      {data?.length > 0
        ? data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-full flex py-3 items-center text-base md:text-2xl"
              >
                <span className="flex gap-2 md:gap-5 flex-[30%]  md:flex-[50%] items-center">
                  <Image
                    width={64}
                    height={64}
                    src={item.image}
                    alt="logo"
                    className="max-w-8 md:max-w-16"
                  />
                  <span className="font-bold ">{item.potocol}</span>
                </span>
                <span className="flex-[25%] flex-row">
                  <span className="font-bold">
                    {item.claim.toLocaleString('en-US')}{' '}
                  </span>
                  {item.symbol}
                </span>
                <span>
                  <Primary className="md:text-xl text-base w-fit md:w-[200px]">
                    Claim
                  </Primary>
                </span>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default memo(InvestmentsTab);
