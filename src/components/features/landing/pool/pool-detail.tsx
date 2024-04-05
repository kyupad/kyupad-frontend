'use client';

import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '@/components/common/button/primary';
import SecondaryButton from '@/components/common/button/secondary';
import CountdownTime from '@/components/common/coutdown/simple';
import { ENDED_AT_FORMAT_STRING, WEB_ROUTES } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { currencyFormatter } from '@/utils/helpers/currency';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(advancedFormat);

interface IPoolDetailProps {
  active?: boolean;
  direction?: 'row' | 'column';
  ended_at?: string;
  name: string;
  symbol: string;
  tags?: string[];
  shortDescription: string;
  totalRaise: number;
  ticketSize: number;
  salePool: string;
  logo: string;
  thumbnail: string;
  snapshotAt: string;
  slug: string;
}

const PoolDetail = ({
  active,
  direction = 'row',
  ended_at,
  name,
  symbol,
  tags,
  shortDescription,
  totalRaise,
  ticketSize,
  salePool,
  logo,
  thumbnail,
  slug,
  snapshotAt,
}: IPoolDetailProps) => {
  const now = dayjs.utc();
  const [endedAt, setEndedAt] = useState<string>(
    dayjs.utc(snapshotAt).isSame(now) || dayjs.utc(snapshotAt).isBefore(now)
      ? dayjs.utc(snapshotAt).format(ENDED_AT_FORMAT_STRING)
      : '',
  );

  const handleChangeEndedAt = useCallback(() => {
    setEndedAt(dayjs.utc(snapshotAt).format(ENDED_AT_FORMAT_STRING));
  }, [snapshotAt]);

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
            {endedAt ? 'Ended on' : `Registration Ends in`}
          </span>
          {endedAt ? (
            <span className="font-bold text-xl text-[#F2820E]">{endedAt}</span>
          ) : (
            <CountdownTime
              time={dayjs.utc(snapshotAt).valueOf()}
              action={handleChangeEndedAt}
            />
          )}
        </div>

        <div className="min-h-[180px] bg-[#FDEDC8] rounded-[24px] border-2 border-[#FCD88B] p-5 flex gap-5 overflow-hidden items-center">
          <div
            className={cn(
              `min-w-[100px] lg:min-w-[140px] h-[100px] lg:h-[140px] rounded-full overflow-hidden relative border-2 ${active ? 'border-button-primary' : 'border-[#25252C]'}`,
              direction === 'column' ? '!min-w-[100px] !h-[100px]' : '',
            )}
          >
            <Image
              alt="logo"
              src={logo}
              draggable="false"
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
          </div>
          <div className="flex gap-2 flex-col">
            <h4
              className={cn(
                'font-bold text-lg sm:text-2xl xl:text-[32px] text-[#25252C] line-clamp-2',
                direction === 'column' ? '!text-2xl' : '',
              )}
            >
              {name || 'Project A'}
            </h4>
            <div
              className={cn(
                'font-bold sm:text-xl xl:text-2xl text-[#25252C]',
                direction === 'column' ? '!text-xl' : '',
              )}
            >
              ${symbol || 'XXX'}
            </div>

            <div className="flex gap-[10px] flex-wrap">
              {tags?.map((item) => {
                return (
                  <span
                    key={item}
                    className={cn(
                      'rounded-[16px] lg:rounded py-2 px-4 text-xs sm:text-sm bg-[#FCD88B] text-[#25252C]',
                      direction === 'column' ? '!rounded-[16px]' : '',
                    )}
                  >
                    {item}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className={cn(
            'text-button-primary-border lg:text-xl',
            direction === 'column' ? '!text-base' : '',
          )}
        >
          {shortDescription || 'Short description of the project'}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <span className="text-button-primary-border font-medium">
              Total raise
            </span>
            <span className="text-button-primary-border font-bold text-lg sm:text-xl">
              {currencyFormatter.format(totalRaise)}
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
                  {currencyFormatter.format(ticketSize)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-button-primary-border font-medium">
                  Sale Pool
                </span>
                <span className="text-button-primary-border font-bold text-lg sm:text-xl">
                  {salePool}
                </span>
              </div>
            </>
          )}
        </div>

        <div>
          {!endedAt && (
            <Link
              href={`${WEB_ROUTES.PROJECT_DETAIL.replace('[id]', slug || '')}`}
            >
              <PrimaryButton block className={cn(active ? 'font-heading' : '')}>
                Join now
              </PrimaryButton>
            </Link>
          )}
          {endedAt && (
            <Link
              href={`${WEB_ROUTES.PROJECT_DETAIL.replace('[id]', slug || '')}`}
            >
              <SecondaryButton block>Details</SecondaryButton>
            </Link>
          )}
        </div>
      </div>

      {!endedAt && (
        <div
          className={cn(
            'lg:w-7/12 relative rounded-tl-[8px] border-b-4 rounded-tr-[8px] lg:rounded-[8px] overflow-hidden border-[#25252C] order-1 lg:order-2 pb-[56.25%] lg:pb-0 lg:border-2',
            direction === 'column'
              ? '!order-1 !w-full !pb-[56.25%] !rounded-bl-none !rounded-br-none !border-b-4 !border-r-0 !border-l-0 !border-t-0'
              : '',
          )}
        >
          <Image
            src={thumbnail}
            fill
            alt="cover"
            draggable={false}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="100vw"
          />
        </div>
      )}
    </div>
  );
};

export default memo(PoolDetail);
