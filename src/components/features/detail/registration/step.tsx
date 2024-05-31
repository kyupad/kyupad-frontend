'use client';

import React, { memo, useCallback, useState } from 'react';
import Image from 'next/image';
import { doApplyProject } from '@/adapters/projects';
import PrimaryButton from '@/components/common/button/primary';
import SecondaryButton from '@/components/common/button/secondary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import WalletConnect from '@/components/common/header/wallet-connect';
import { Input } from '@/components/common/input';
import { ShowAlert } from '@/components/common/toast';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { THROW_EXCEPTION, UTC_FORMAT_STRING } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import incomingStep from 'public/images/detail/incoming-step.svg';
import infoIcon from 'public/images/detail/info-icon.svg';
import { z } from 'zod';

import currentStep from '/public/images/detail/current-step.svg';
import stepDone from '/public/images/detail/step-done.svg';
import step from '/public/images/detail/step.svg';

dayjs.extend(utc);

const getActiveStep = (data: any[]) => {
  const now = dayjs.utc();

  if (
    dayjs.utc(data?.[0]?.start).isBefore(now) &&
    dayjs.utc(data?.[0]?.end).isAfter(now)
  ) {
    return 1;
  }

  if (
    dayjs.utc(data?.[1]?.start).isBefore(now) &&
    dayjs.utc(data?.[1]?.end).isAfter(now)
  ) {
    return 2;
  }

  if (
    dayjs.utc(data?.[2]?.start).isBefore(now) &&
    dayjs.utc(data?.[2]?.end).isAfter(now)
  ) {
    return 3;
  }

  if (dayjs.utc(data?.[3]?.start).isBefore(now)) {
    return 4;
  }

  if (dayjs.utc(data?.[0]?.start).isAfter(now)) {
    return 1;
  }

  if (dayjs.utc(data?.[1]?.start).isAfter(now)) {
    return 2;
  }

  if (dayjs.utc(data?.[2]?.start).isAfter(now)) {
    return 3;
  }

  return 4;
};

function RegistrationStep({
  data,
  projectId,
  isApplied,
  revalidatePath,
  doGetSignInData,
  doVerifySignInWithSolana,
  setCookie,
  notificationEmail,
}: {
  data: any[];
  projectId: string;
  isApplied: boolean;
  revalidatePath: Function;
  doGetSignInData: Function;
  doVerifySignInWithSolana: Function;
  setCookie: Function;
  notificationEmail?: string;
}) {
  const [activeStep] = useState<number>(getActiveStep(data));
  const [loading, setLoading] = useState<boolean>(false);
  const now = dayjs.utc();
  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );
  const [isOpenRegisterTooltip, setOpenRegisterTooltip] =
    useState<boolean>(false);
  const [visibleRegisterEmailPopup, setVisibleRegisterEmailPopup] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>(notificationEmail || '');

  const handleChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [],
  );

  const handleOpenRegisterTooltip = useCallback((value: boolean) => {
    setOpenRegisterTooltip(value);
  }, []);

  const handleSetVisibleRegisterEmailPopup = useCallback((value: boolean) => {
    setVisibleRegisterEmailPopup(value);
  }, []);

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

  const handleRegister = async (withEmail?: boolean) => {
    if (!email) {
      return ShowAlert.error({
        message: 'Please enter your email!',
      });
    }

    if (email && !z.string().email().safeParse(email).success) {
      return ShowAlert.error({
        message: 'Invalid email format!',
      });
    }

    handleChangeLoading(true);

    try {
      const result = await doApplyProject({
        project_id: projectId,
        ...(withEmail ? { notification_email: email } : {}),
      });

      if (!result?.data) {
        ShowAlert.error({ message: result?.message || '' });
        return;
      }
      changeViewMode('registration');
      setVisibleRegisterEmailPopup(false);
      revalidatePath && revalidatePath(window.location.pathname);
    } catch (e) {
      console.error(e);
      ShowAlert.error({
        message: THROW_EXCEPTION.UNKNOWN_TRANSACTION,
      });
    } finally {
      handleChangeLoading(false);
    }
  };

  const renderError = useCallback(() => {
    if (email && !z.string().email().safeParse(email).success) {
      return <div className="text-red-500 text-sm">Invalid email format.</div>;
    }
  }, [email]);

  const renderStepButton = useCallback(() => {
    if (activeStep > 1 && !isApplied) {
      return <SecondaryButton disabled>Registration Ended</SecondaryButton>;
    }

    if (!isSolanaConnected) {
      return (
        <WalletConnect
          doGetSignInData={doGetSignInData}
          doVerifySignInWithSolana={doVerifySignInWithSolana}
          setCookie={setCookie}
          revalidatePath={revalidatePath}
        />
      );
    }

    if (activeStep === 1 && !isApplied) {
      if (dayjs.utc(data?.[0]?.start).isAfter(now)) {
        return (
          <TooltipProvider delayDuration={0}>
            <Tooltip open={isOpenRegisterTooltip}>
              <TooltipTrigger asChild>
                <div>
                  <PrimaryButton
                    disabled
                    onTouchStart={() => {
                      handleOpenRegisterTooltip(!isOpenRegisterTooltip);
                    }}
                    onMouseOver={() => {
                      handleOpenRegisterTooltip(true);
                    }}
                    onMouseOut={() => {
                      handleOpenRegisterTooltip(false);
                    }}
                    className="min-w-[200px]"
                  >
                    Register Now &nbsp;{' '}
                    <Image src={infoIcon} alt="info" draggable={false} />
                  </PrimaryButton>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[274px] px-5 py-4">
                <p className="text-base font-medium text-justify">
                  Please wait until register time!
                </p>
                <TooltipArrow fill="#8E8FA2" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      if (dayjs.utc(data?.[0]?.end).isBefore(now)) {
        return (
          <TooltipProvider delayDuration={0}>
            <Tooltip open={isOpenRegisterTooltip}>
              <TooltipTrigger asChild>
                <div>
                  <PrimaryButton
                    disabled
                    onTouchStart={() => {
                      handleOpenRegisterTooltip(!isOpenRegisterTooltip);
                    }}
                    onMouseOver={() => {
                      handleOpenRegisterTooltip(true);
                    }}
                    onMouseOut={() => {
                      handleOpenRegisterTooltip(false);
                    }}
                    className="min-w-[200px]"
                  >
                    Register Now &nbsp;{' '}
                    <Image src={infoIcon} alt="info" draggable={false} />
                  </PrimaryButton>
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-[274px] px-5 py-4">
                <p className="text-base font-medium text-justify">
                  Registration has ended!
                </p>
                <TooltipArrow fill="#8E8FA2" />
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }

      return (
        <Dialog
          open={visibleRegisterEmailPopup}
          onOpenChange={handleSetVisibleRegisterEmailPopup}
        >
          <DialogTrigger asChild>
            <div>
              <PrimaryButton
                loading={loading}
                loadingText="Registering..."
                className="min-w-[200px]"
              >
                Register Now
              </PrimaryButton>
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl text-kyu-color-13">
                You are not register email !!
              </DialogTitle>
              <DialogDescription>
                Enter email here to receive notification
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <Input
                value={email}
                label=""
                type="email"
                placeholder="example@gmail.com"
                onChange={handleChangeEmail}
              />

              {renderError()}
            </div>
            <DialogFooter className="-mt-3">
              <div className="flex flex-col w-full gap-2">
                <PrimaryButton
                  disabled={loading}
                  loading={loading}
                  block
                  loadingText="Registering..."
                  onClick={() => handleRegister(true)}
                >
                  Register
                </PrimaryButton>
                <button
                  className="underline"
                  onClick={() => handleRegister(false)}
                >
                  Register without email
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }

    if (isApplied) {
      return (
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
              } else if (activeStep === 4) {
                changeViewMode('claim');
              } else {
                //
              }
            }}
          >
            {activeStep === 3
              ? 'Invest Now'
              : activeStep === 4
                ? 'Claim'
                : 'View Registration'}
          </PrimaryButton>
        </div>
      );
    }
  }, [
    activeStep,
    data,
    email,
    isApplied,
    isOpenRegisterTooltip,
    isSolanaConnected,
    loading,
    now,
    visibleRegisterEmailPopup,
  ]);

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
              revalidatePath={revalidatePath}
            />
          ) : (
            <span className="font-bold text-2xl text-kyu-color-18">Ended</span>
          )}
        </div>

        {renderStepButton()}
      </div>
    </div>
  );
}

export default memo(RegistrationStep);
