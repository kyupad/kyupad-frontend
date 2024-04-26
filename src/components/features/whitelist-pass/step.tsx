'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { UTC_FORMAT_STRING } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import currentStep from '/public/images/detail/current-step.svg';
import stepDone from '/public/images/detail/step-done.svg';
import step from '/public/images/detail/step.svg';

dayjs.extend(utc);

function WhitelistPassStep({
  data,
  direction = 'horizontal',
}: {
  data: any[];
  direction?: 'horizontal' | 'vertical';
}) {
  const now = dayjs.utc();
  return (
    <div className="flex flex-col gap-5">
      <div className="text-kyu-color-11">
        <div
          className={cn(
            'flex gap-8',
            direction === 'vertical' ? 'flex-row' : 'flex-col',
          )}
        >
          <div
            className={cn(
              'flex justify-between',
              direction === 'vertical'
                ? 'flex-col order-2'
                : 'flex-row order-1',
            )}
          >
            {data?.map((item, index) => (
              <div
                key={item.step}
                className={cn('', index === data?.length - 1 ? '' : 'pb-5')}
              >
                <h2 className="text-xl sm:text-2xl font-bold">
                  {item?.title || ''}
                </h2>

                {item?.start && item?.end ? (
                  <span>
                    {dayjs.utc(item?.start).format(UTC_FORMAT_STRING)} -{' '}
                    {dayjs.utc(item?.end).format(UTC_FORMAT_STRING)}
                  </span>
                ) : (
                  <span>Coming Soon</span>
                )}
              </div>
            ))}
          </div>
          <div
            className={cn('', direction === 'vertical' ? 'order-1' : 'order-2')}
          >
            <div
              className={cn(
                'bg-kyu-color-7 relative',
                direction === 'vertical' ? `h-full w-0.5` : 'w-full h-0.5',
              )}
            >
              <div
                className={cn(
                  'absolute h-0.5 top-1/2 -translate-y-1/2 bg-kyu-color-5 transition-all duration-500 ease-in-out',
                )}
              />
              <div
                className={cn(
                  'flex items-center justify-between absolute top-1/2 -translate-y-1/2 w-full h-full',
                  direction === 'vertical' ? 'flex-col' : 'flex-row',
                )}
              >
                {data?.map((item) => (
                  <div key={item.step} className="bg-kyu-color-12 min-w-[32px]">
                    {item?.start && item?.end ? (
                      <>
                        {dayjs.utc(item.start).isBefore(now) &&
                          dayjs.utc(item.end).isAfter(now) && (
                            <Image
                              src={currentStep}
                              alt="step"
                              draggable={false}
                            />
                          )}
                        {dayjs.utc(item.start).isAfter(now) && (
                          <Image src={step} alt="step" draggable={false} />
                        )}
                        {dayjs.utc(item.end).isBefore(now) && (
                          <Image src={stepDone} alt="step" draggable={false} />
                        )}
                      </>
                    ) : (
                      <Image src={step} alt="step" draggable={false} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(WhitelistPassStep);
