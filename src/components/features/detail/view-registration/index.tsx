import React, { memo, useState } from 'react';
import Image from 'next/image';
import SecondaryButton from '@/components/common/button/secondary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import kyuViewRegistration from '/public/images/detail/kyu-view-registration.png';
import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';

dayjs.extend(utc);

function ViewRegistration({
  registrationEndAt,
}: {
  registrationEndAt: string;
}) {
  const [ended] = useState<boolean>(false);

  // const handleChangeEnded = useCallback((value: boolean) => {
  //   setEnded(value);
  // }, []);
  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex flex-col gap-5 pb-4">
        <h2 className="text-4xl font-bold text-kyu-color-17">
          Great! You’ve been registered to the IDO!
        </h2>
        <p className="text-2xl">
          <span className="font-bold">Your Catnip Points is 0.31.</span>{' '}
          Increase it to win more tickets and earn higher allocation
        </p>

        <div className="p-4 lg:p-10 bg-kyu-color-16 rounded-[16px] border-2 border-kyu-color-10 flex justify-between gap-8 flex-wrap">
          <div className="flex flex-col gap-4 w-full xl:max-w-[512px]">
            <div className="flex justify-between gap-4">
              <span className="text-xl">Your Catnip Points</span>
              <span className="text-2xl font-bold">0.31</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-xl">Total Assets Connected</span>
              <span className="text-2xl font-bold">$11,232,657.13</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full xl:max-w-[405px]">
            <div className="flex justify-between gap-4">
              <span className="text-xl">Multipier</span>
              <span className="text-2xl font-bold">1,5x</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-xl">Participants</span>
              <span className="text-2xl font-bold">11,342</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between items-center flex-wrap">
          <div className="flex gap-4 md:gap-8 flex-wrap">
            <div className="text-2xl font-bold">Registration Ends in</div>
            {!ended ? (
              <SimpleCountdown
                // action={() => handleChangeEnded(true)}
                className="!text-xl md:!text-2xl"
                time={dayjs.utc(registrationEndAt).valueOf()}
              />
            ) : (
              <span className="font-bold text-2xl text-kyu-color-18">
                Ended
              </span>
            )}
          </div>
          <div>
            <SecondaryButton disabled>Registered</SecondaryButton>
          </div>
        </div>

        <div className="flex items-center gap-[80px] flex-col lg:flex-row pt-5 pb-16">
          <div className="max-w-[600px]">
            <Image src={kyuViewRegistration} alt="Kyu view registration" />
          </div>
          <div className="w-full">
            <div className="p-4 sm:p-10 bg-kyu-color-2 rounded-[16px] flex-col flex gap-3 border-2 border-kyu-color-10">
              <div className="text-2xl font-bold">
                How to increase your Catnip Points
              </div>
              <ul className="text-2xl list-disc pl-6 flex flex-col gap-3">
                <li>Hold more Solana Assets (SOL, JUP, JTO, USDC)</li>
                <li>Hold a Mad labs, SMB NFT</li>
                <li>Follow and share all the news of us on X</li>
                <li>Have Whitelist Pass NFT</li>
                <li>Be a OG of KyuPad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={viewRegistrationDeco}
        alt="decorator"
        className="mx-auto w-full absolute bottom-0 -z-[1]"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewRegistration);
