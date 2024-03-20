import React, { memo } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import SecondaryButton from '@/components/common/button/secondary';
import CountdownTime from '@/components/common/countdown-time';
import { cn } from '@/utils/helpers';
import { currencyFormatter } from '@/utils/helpers/currency';
import { v4 as uuidv4 } from 'uuid';

interface IPoolDetailProps {
  active?: boolean;
  direction?: 'row' | 'column';
  ended_at?: string;
}

const PoolDetail = ({
  active,
  direction = 'row',
  ended_at,
}: IPoolDetailProps) => {
  return (
    <div
      className={cn(
        'flex bg-[#FFF9EB] border-4 lg:p-10 border-button-primary-border rounded-[12px] shadow-[19px_18px_0px_0px_rgba(42,_39,_58,_0.1)] md:w-full lg:gap-10 flex-col lg:flex-row relative',
        direction === 'column' ? '!flex-col !p-0 !gap-0' : '',
      )}
    >
      <div
        className={cn(
          'w-full lg:w-5/12 px-6 pb-6 pt-3 lg:p-0 flex gap-6 flex-col order-2 lg:order-1',
          direction === 'column' ? '!order-2 !w-full !pb-6 !pt-3 !px-6' : '',
        )}
      >
        {/* countdown time end */}
        <div className="flex justify-between gap-3 items-center flex-wrap">
          <span className="text-xs sm:text-base text-button-primary-border font-medium whitespace-nowrap">
            {ended_at ? 'Ended on' : `Registration Ends in`}
          </span>
          {ended_at ? (
            <span className="font-bold text-xl text-[#F2820E]">
              March 13th, 2023
            </span>
          ) : (
            <CountdownTime time={new Date('2024-05-22').getTime()} />
          )}
        </div>

        <div className="min-h-[180px] bg-[#FDEDC8] rounded-[24px] border-2 border-[#FCD88B] p-5 flex gap-5 overflow-hidden items-center">
          <div
            className={`min-w-[100px] lg:min-w-[140px] h-[100px] lg:h-[140px] rounded-full overflow-hidden relative border-2 ${active ? 'border-button-primary' : 'border-[#25252C]'}`}
          >
            <Image
              alt="logo"
              src={`https://robohash.org/${uuidv4()}`}
              draggable="false"
              fill
              style={{ objectFit: 'cover' }}
              sizes="140px"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <h4 className="font-bold text-lg sm:text-2xl xl:text-[32px] text-[#25252C] line-clamp-2">
              Bunny Protocol
            </h4>
            <div className="font-bold sm:text-xl xl:text-2xl text-[#25252C]">
              $BPT
            </div>
            <div className="flex gap-[10px] flex-wrap">
              <span className="rounded-[16px] py-2 px-4 text-xs sm:text-sm bg-[#FCD88B] text-[#25252C]">
                Perp DEX
              </span>
              <span className="rounded-[16px] py-2 px-4 text-xs sm:text-sm bg-[#FCD88B] text-[#25252C]">
                DeFi
              </span>
            </div>
          </div>
        </div>

        <div className="text-button-primary-border lg:text-xl">
          Dive into intense multiplayer battles in the most competitive space
          shooter ever!{' '}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-button-primary-border font-medium">
              Total raise
            </span>
            <span className="text-button-primary-border font-bold text-lg sm:text-xl">
              {currencyFormatter.format(300000)}
            </span>
          </div>

          {ended_at && (
            <>
              <div className="flex justify-between">
                <span className="text-button-primary-border font-medium">
                  ATH ROI
                </span>
                <span className="text-button-primary-border font-bold text-lg sm:text-xl">
                  57x
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-button-primary-border font-medium">
                  Participants
                </span>
                <span className="text-button-primary-border font-bold text-lg sm:text-xl">
                  5,683
                </span>
              </div>
            </>
          )}

          {!ended_at && (
            <>
              <div className="flex justify-between">
                <span className="text-button-primary-border font-medium">
                  Ticket Size
                </span>
                <span className="text-button-primary-border font-bold text-lg sm:text-xl">
                  {currencyFormatter.format(+300000)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-button-primary-border font-medium">
                  Sale Pool
                </span>
                <span className="text-button-primary-border font-bold text-lg sm:text-xl">
                  Lottery
                </span>
              </div>
            </>
          )}
        </div>

        <div>
          {!ended_at && <PrimaryButton>Join now</PrimaryButton>}
          {ended_at && <SecondaryButton>Details</SecondaryButton>}
        </div>
      </div>

      {!ended_at && (
        <div
          className={cn(
            'lg:w-7/12 relative rounded-tl-[8px] border-b-4 rounded-tr-[8px] lg:rounded-[8px] overflow-hidden border-[#25252C] order-1 lg:order-2 pb-[56.25%] lg:pb-0 lg:border-2',
            direction === 'column'
              ? '!order-1 !w-full !pb-[56.25%] !rounded-bl-none !rounded-br-none !border-b-4'
              : '',
          )}
        >
          <Image
            src="/images/home/meow.jpeg"
            fill
            alt="cover"
            draggable={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
      )}

      {active && (
        <>
          <div className="absolute -top-[49px] lg:-top-[60px] left-1/4 w-[53px] lg:w-[93px] h-[58px]">
            <Image
              src="/images/home/cat-left-ear.svg"
              alt="Cat left ear"
              fill
              sizes="93px"
            />
          </div>

          <div className="absolute -top-[49px] lg:-top-[60px] right-1/4 w-[53px] lg:w-[93px] h-[58px]">
            <Image
              src="/images/home/cat-right-ear.svg"
              alt="Cat left ear"
              fill
              sizes="93px"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(PoolDetail);
