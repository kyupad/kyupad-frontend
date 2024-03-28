'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import Primary from '@/components/common/button/primary';
import Secondary from '@/components/common/button/secondary';
import Tooltip from '@/components/common/tooltip/tooltip-custom';
import { currencyFormatter } from '@/utils/helpers/currency';

type Props = {
  walletAddress: string;
  wallet: number;
  auth: boolean;
};
const PortfolioPanel = ({ wallet, walletAddress, auth }: Props) => {
  const [copied, setCopied] = React.useState(false);

  const truncateText = useCallback((text: string | null | undefined) => {
    if (!text) return '';
    return text.slice(0, 6) + '...' + text.slice(-6);
  }, []);

  const handleCopyToClipbroad = useCallback(
    (text: string | undefined | null) => {
      if (!text) return;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    },
    [],
  );

  return (
    <div className="p-3 md:p-9 bg-[#FDEDC8] flex gap-3 md:my-10 border-2 rounded-lg border-[#25252C] flex-col md:flex-row  m-2 md:mx-6 xl:mx-auto">
      <div className="w-full md:w-2/4 md:my-4 ">
        <h2 className="text-3xl font-bold">My Portfolio</h2>
        <p className="md:text-6xl text-5xl md:py-8 py-5 font-bold text-[#F8A627]">
          {currencyFormatter.format(wallet)}
        </p>
        <div className=" flex gap-5 items-center md:text-xl text-base">
          <span>
            <b> Address:</b> {truncateText(walletAddress)}
          </span>

          {!copied ? (
            <Tooltip
              message={
                <span className="md:text-xl text-base">Copy to clipbroad</span>
              }
            >
              <svg
                onClick={() => handleCopyToClipbroad(walletAddress)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 0H7C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V6H1C0.734784 6 0.48043 6.10536 0.292893 6.29289C0.105357 6.48043 0 6.73478 0 7V23C0 23.2652 0.105357 23.5196 0.292893 23.7071C0.48043 23.8946 0.734784 24 1 24H17C17.2652 24 17.5196 23.8946 17.7071 23.7071C17.8946 23.5196 18 23.2652 18 23V18H23C23.2652 18 23.5196 17.8946 23.7071 17.7071C23.8946 17.5196 24 17.2652 24 17V1C24 0.734784 23.8946 0.48043 23.7071 0.292893C23.5196 0.105357 23.2652 0 23 0ZM16 22H2V8H16V22ZM22 16H18V7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6H8V2H22V16Z"
                  fill="#25252C"
                />
              </svg>
            </Tooltip>
          ) : (
            <span className="md:text-xl text-base text-[#18CF6A]">Copied!</span>
          )}
        </div>
      </div>
      <div className="flex-auto flex justify-center ">
        {!auth ? (
          <div className="flex flex-col justify-center h-full gap-5">
            <Image
              src="/images/portfolio/kyupad-xl.svg"
              className="mx-auto md:block hidden"
              width={312}
              height={104}
              alt="coin"
            />
            <div className="flex justify-center mt-5 md:mt-auto *:min-w-[150px] *:xl:min-w-[200px] *md:w-[200px] *:py-3 *:md:text-xl order-1  *:text-base gap-5">
              <Primary>Sign up</Primary>
              <Secondary className="border-[#25252C]">Login</Secondary>
            </div>
          </div>
        ) : (
          <div className="mt-5 md:mt-0 mx-auto w-full lg:px-8">
            <div className="flex items-center gap-3 bg-[#F7F7F8] border-2 py-4 border-[#25252C] rounded-md  px-3">
              <label className="text-base font-bold">Email:</label>
              <input
                type="text"
                placeholder="Email"
                className="border-none text-base outline-none bg-transparent"
              />
            </div>
            <div className="flex my-4 items-center gap-3 py-4 bg-[#F7F7F8] border-2 border-[#25252C] rounded-md  px-3">
              <label className="text-base font-bold">KYC status:</label>
              <span className="text-base font-medium text-[#18CF6A]">
                Completed
              </span>
            </div>
            <Primary className="w-2/5 py-3 my-0 md:text-xl text-base">
              Submit
            </Primary>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PortfolioPanel);
