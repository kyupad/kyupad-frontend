import React, { memo } from 'react';
import { UTC_FORMAT_STRING } from '@/utils/constants';
import { currencyFormatter } from '@/utils/helpers';
import Big from 'big.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function TokenSale({ data }: { data?: any }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-2xl font-bold">Contract metrics & Vesting</h3>

      <div className="flex flex-col gap-3 max-w-[732px]">
        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Token Symbol</span>
          <span className="font-bold text-kyu-color-11">
            {data?.symbol?.toUpperCase() || ''}
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Contract address</span>
          <span className="font-bold text-kyu-color-11 break-all">
            {data?.address || ''}
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">
            Initial Market Cap
          </span>
          <span className="font-bold text-kyu-color-11">
            {data?.initial_market_cap
              ? currencyFormatter.format(
                  Big(data.initial_market_cap).toNumber(),
                )
              : 0}
          </span>
        </div>

        <div className="h-[0.25px] w-full bg-[#444451]" />

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Vesting Type</span>
          <span className="font-bold text-kyu-color-11">
            {data?.vesting_type || ''}
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">Vesting Schedule</span>
          <span className="font-bold text-kyu-color-11 break-all">
            {data?.vesting_schedule || ''}
          </span>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <span className="font-medium text-kyu-color-8">
            Token Distribute time
          </span>
          <span className="font-bold text-kyu-color-11">
            {data?.token_distribute_time
              ? dayjs.utc(data?.token_distribute_time).format(UTC_FORMAT_STRING)
              : ''}
          </span>
        </div>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: data?.article || '',
        }}
      />
    </div>
  );
}

export default memo(TokenSale);
