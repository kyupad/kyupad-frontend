import React from 'react';
import Image from 'next/image';
import Tooltip from '@/components/common/tooltip';

const PointChart = () => {
  return (
    <div className="flex ">
      <div className="flex flex-row flex-auto relative">
        <Image
          src={'/images/detail/cat_holding_a_table.svg'}
          alt="cat"
          width={600}
          height={600}
        />
        <div className="flex justify-center flex-col items-center *:py-2 absolute right-[45%] top-[50%]">
          <p className="text-6xl font-bold text-[#EC5347]">0.13%</p>
          <p className="font-bold text-2xl">change of winning</p>
        </div>
      </div>
      <div className="p-4 flex-auto max-w-[50%]">
        <div className="font-medium text-2xl flex items-center gap-2">
          You have <span className="text-[#F2820E]">low</span> chance of winning
          <Tooltip
            message={
              <div className="w-96 h-auto text-wrap text-white p-3">
                <h2 className="text-xl font-medium">Change of winning</h2>
                <p className="py-3 text-lg">
                  This chart shows real time data. Both percentages and your
                  allocation size can change with the growth of participants.
                </p>
              </div>
            }
          >
            <span className="inline-block text-center leading-4 text-base w-5 h-5 mt-1 rounded-full border-2 border-solid border-black ">
              i
            </span>
          </Tooltip>
        </div>
        <div className="py-2">
          <div className="h-0 w-0 border-l-solid border-l-transparent border-r-solid border-r-transparent  border-l-8 border-r-8 border-t-8 border-t-black m-1"></div>
          <div className="flex  *:h-2 *:flex *:items-center *:justify-center max-w-[490px] w-full">
            <div className=" w-[80px] bg-[#D8372A]"></div>
            <div className=" w-[205px] bg-[#F8A627]"></div>
            <div className=" w-[205px] bg-[#18CF6A] "></div>
          </div>
        </div>
        <div className="p-4 border-2 border-[#31313A] rounded-md bg-[#FDEDC8] mt-8">
          <h2 className="font-bold py-2">How to increase your power:</h2>
          <ul className="">
            <li>Hold more Solana Assets ( SOL, JUP, JTO, USDC)</li>
            <li>Hold a Mad labs, SMB NFT </li>
            <li>Follow and share all the news of us on X</li>
            <li>Have Whitelist Pass NFT</li>
            <li>Be a OG of KyuPad</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PointChart;
