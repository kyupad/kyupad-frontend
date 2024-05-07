'use client';

import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { doApplyProject } from '@/adapters/projects';
import PrimaryButton from '@/components/common/button/primary';
import SecondaryButton from '@/components/common/button/secondary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import { ShowAlert } from '@/components/common/toast';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { UTC_FORMAT_STRING } from '@/utils/constants';
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

function RegistrationStep({
  data,
  projectId,
  isApplied,
  revalidatePath,
}: {
  data: any[];
  projectId: string;
  isApplied: boolean;
  revalidatePath?: Function;
}) {
  const [activeStep] = useState<number>(getActiveStep(data));
  const [loading, setLoading] = useState<boolean>(false);
  const now = dayjs.utc();

  const changeViewMode = useProjectDetailStore((state) => state.changeViewMode);

  const handleChangeLoading = useCallback((value: boolean) => {
    setLoading(value);
  }, []);

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
      <div className="border-2 border-kyu-color-10 p-5 lg:p-10 rounded-[16px] bg-kyu-color-16 text-kyu-color-11">
        <div className="flex sm:flex-col gap-8">
          <div className="flex justify-between flex-col sm:flex-row order-1">
            {data?.map((item) => (
              <h2 key={item.step} className="text-xl sm:text-2xl font-bold">
                Step {item.step}
              </h2>
            ))}
          </div>
          <div className="order-2">
            <div className="w-0.5 h-full sm:w-full sm:h-0.5 bg-kyu-color-7 relative">
              <div
                className={cn(
                  'absolute h-0.5 top-1/2 -translate-y-1/2 bg-kyu-color-5 transition-all duration-500 ease-in-out',
                  progress,
                )}
              />
              <div className="flex flex-col items-center sm:flex-row justify-between absolute top-1/2 -translate-y-1/2 w-full h-full">
                {data?.map((item) => (
                  <div key={item.step} className="bg-kyu-color-16 min-w-[32px]">
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

          <div className="flex justify-between gap-4 order-3 flex-col sm:flex-row">
            {data?.map((item, index, arr) => (
              <div
                key={item.step}
                className={cn(
                  'flex flex-col gap-2',
                  index === arr.length - 1 ? 'sm:items-end sm:text-right' : '',
                  index !== 0 && index !== arr.length - 1
                    ? 'sm:items-center sm:text-center'
                    : '',
                )}
              >
                <div className="text-2xl font-bold">{item.title}</div>
                <time className="font-medium">
                  {dayjs.utc(item.start).format(UTC_FORMAT_STRING)}
                </time>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex gap-4 md:gap-8 items-center flex-wrap">
          <div className="text-2xl font-bold">
            {dayjs.utc(data?.[0]?.start).isAfter(now)
              ? 'Registration Starts in'
              : 'Registration Ends in'}
          </div>
          {activeStep === 1 ? (
            <SimpleCountdown
              className="!text-xl md:!text-2xl"
              time={
                dayjs.utc(data?.[0]?.start).isAfter(now)
                  ? dayjs.utc(data?.[0]?.start).valueOf()
                  : dayjs.utc(data?.[0]?.end).valueOf()
              }
            />
          ) : (
            <span className="font-bold text-2xl text-kyu-color-18">Ended</span>
          )}
        </div>
        {isApplied && (
          <div className="flex gap-4 flex-wrap">
            <SecondaryButton disabled>Registered</SecondaryButton>
            <PrimaryButton
              onClick={() => {
                if (activeStep === 1) {
                  changeViewMode('registration');
                } else if (activeStep === 2) {
                  changeViewMode('snapshot');
                } else if (activeStep === 3) {
                  changeViewMode('investment');
                }
              }}
            >
              {activeStep === 3 ? 'Invest Now' : 'View Registration'}
            </PrimaryButton>
          </div>
        )}

        {activeStep === 1 && !isApplied && (
          <PrimaryButton
            loading={loading}
            loadingText="Registering..."
            className="min-w-[200px]"
            disabled={
              dayjs.utc(data?.[0]?.start).isAfter(now) ||
              dayjs.utc(data?.[0]?.end).isBefore(now)
            }
            onClick={async () => {
              handleChangeLoading(true);
              try {
                const result = await doApplyProject({
                  project_id: projectId,
                });

                if (!result?.data) {
                  ShowAlert.error({ message: result?.message || '' });
                  return;
                }

                changeViewMode('registration');
                revalidatePath && revalidatePath(window.location.pathname);
              } catch {
                //
              } finally {
                handleChangeLoading(false);
              }
            }}
          >
            Register Now
          </PrimaryButton>
        )}

        {activeStep > 1 && !isApplied && (
          <SecondaryButton disabled>Registration Ended</SecondaryButton>
        )}
      </div>
    </div>
  );
}

export default memo(RegistrationStep);
