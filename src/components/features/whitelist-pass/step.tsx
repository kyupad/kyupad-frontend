'use client';

import React, { memo, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import incomingStep from 'public/images/detail/incoming-step.svg';

import currentStep from '/public/images/detail/current-step.svg';
import stepDone from '/public/images/detail/step-done.svg';
import step from '/public/images/detail/step.svg';

dayjs.extend(utc);

const getActiveStep = (data: any[]) => {
  const now = dayjs.utc();
  const step = data.find((item) => {
    return (
      ((dayjs.utc(item.start).isBefore(now) ||
        dayjs.utc(item.start).isSame(now)) &&
        dayjs.utc(item.end).isAfter(now)) ||
      dayjs.utc(item.end).isSame(now)
    );
  });

  if (step) {
    return step.step;
  }

  if (!step) {
    if (dayjs.utc(data[data.length - 1].end).isBefore(now)) {
      return data.length;
    }

    const nextStep = data.find((item) => {
      return dayjs.utc(item.start).isAfter(now);
    });

    return nextStep?.step || 1;
  }
};

function WhitelistPassStep({ data }: { data: any[] }) {
  const [activeStep] = useState<number>(getActiveStep(data));

  let progress = 'w-0';
  switch (activeStep) {
    case 1:
      progress = 'w-0';
      break;
    case 2:
      progress = 'w-1/3';
      break;
    case 3:
      progress = 'w-2/3';
      break;
    case 4:
      progress = 'w-full';
      break;
    default:
      progress = 'w-0';
      break;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="text-kyu-color-11">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between flex-row order-1">
            {data?.map((item) => (
              <h2 key={item.step} className="text-xl sm:text-2xl font-bold">
                {item?.title || ''}
              </h2>
            ))}
          </div>
          <div className="order-2">
            <div className="w-full h-0.5 bg-kyu-color-7 relative">
              <div
                className={cn(
                  'absolute h-0.5 top-1/2 -translate-y-1/2 bg-kyu-color-5 transition-all duration-500 ease-in-out',
                  progress,
                )}
              />
              <div className="flex items-center flex-row justify-between absolute top-1/2 -translate-y-1/2 w-full h-full">
                {data?.map((item) => (
                  <div key={item.step} className="bg-kyu-color-12 min-w-[32px]">
                    {item.step === activeStep && (
                      <>
                        {dayjs
                          .utc(data[activeStep - 1].start)
                          .isBefore(dayjs.utc()) ||
                        dayjs
                          .utc(data[activeStep - 1].start)
                          .isSame(dayjs.utc()) ? (
                          <Image
                            src={currentStep}
                            alt="step"
                            draggable={false}
                          />
                        ) : (
                          <Image
                            src={incomingStep}
                            alt="step"
                            draggable={false}
                          />
                        )}
                      </>
                    )}
                    {item.step > activeStep && (
                      <Image src={step} alt="step" draggable={false} />
                    )}
                    {item.step < activeStep && (
                      <Image src={stepDone} alt="step" draggable={false} />
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
