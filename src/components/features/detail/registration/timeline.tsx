import React, { memo } from 'react';
import { UTC_FORMAT_STRING } from '@/utils/constants';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function Timeline({ data }: { data: any }) {
  const timeline = [
    {
      step: 'Registration period',
      time:
        dayjs.utc(data?.registration_start_at).format(UTC_FORMAT_STRING) +
        ' - ' +
        dayjs.utc(data?.registration_end_at).format(UTC_FORMAT_STRING),
      description: data?.registration_description || '',
    },

    {
      step: 'Snapshot period',
      time:
        dayjs.utc(data?.snapshot_start_at).format(UTC_FORMAT_STRING) +
        ' - ' +
        dayjs.utc(data?.snapshot_end_at).format(UTC_FORMAT_STRING),
      description: data?.snapshot_description || '',
    },

    {
      step: 'Investment period',
      time:
        dayjs.utc(data?.investment_start_at).format(UTC_FORMAT_STRING) +
        ' - ' +
        dayjs.utc(data?.investment_end_at).format(UTC_FORMAT_STRING),
      description: data?.investment_description || '',
    },

    {
      step: 'Claim period',
      time: dayjs.utc(data?.claim_start_at).format(UTC_FORMAT_STRING),
      description: data?.claim_description || '',
    },
  ];

  return (
    <div className="flex gap-10 flex-row justify-items-start">
      <div className="text-xl sm:text-2xl font-bold flex flex-col gap-[60px] justify-between">
        {timeline.map((item) => (
          <div key={item.step}>{item.step}</div>
        ))}
      </div>

      <div className="relative">
        <div className="w-[1px] h-full bg-kyu-color-11" />
        <div className="absolute top-0 -left-[22px] h-full flex flex-col justify-between gap-[60px]">
          {timeline.map((item, index) => (
            <div
              className="size-[44px] min-h-[44px] rounded-[16px] bg-kyu-color-11 text-kyu-color-4 text-2xl font-bold flex justify-center items-center"
              key={item.step}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-[60px]">
        {timeline.map((item) => (
          <div key={item.step} className="flex flex-col gap-3">
            <time className="text-xl sm:text-2xl font-bold">{item.time}</time>
            {item?.description && (
              <div
                className="font-medium"
                dangerouslySetInnerHTML={{
                  __html: item.description,
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Timeline);
