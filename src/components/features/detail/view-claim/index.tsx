import React, { memo, useCallback, useEffect, useState } from 'react';
import ImageNext from 'next/image';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { doGetMyVesting } from '@/adapters/projects';
import { Badge } from '@/components/common/badge';
import PrimaryButton from '@/components/common/button/primary';
import SecondaryButton from '@/components/common/button/secondary';
import Skeleton from '@/components/common/loading/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useSessionStore } from '@/contexts/session-store-provider';
import { UTC_FORMAT_STRING } from '@/utils/constants';
import { cn } from '@/utils/helpers';
import { useWallet } from '@solana/wallet-adapter-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { env } from 'env.mjs';
import infoIcon from 'public/images/detail/info-icon.svg';
import viewClaimCat from 'public/images/detail/view-claim-cat.png';
import viewRegistrationDecor from 'public/images/detail/view-registration-decor.svg';

import ClaimMorePopup from './claim-more-popup';

dayjs.extend(utc);

function ViewClaim() {
  const { slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [projectVesting, setProjectVesting] = useState<any>(null);
  const [vestingPool, setVestingPool] = useState<any>(null);
  const [isOpenClaimTooltip, setOpenClaimTooltip] = useState<boolean>(false);
  const { publicKey } = useWallet();
  const withdrawnAmount = useSessionStore((state) => state.withdrawnAmount);
  const updateWithdrawnAmount = useSessionStore(
    (state) => state.updateWithdrawnAmount,
  );
  const [isVisibleClaimPopup, setIsVisibleClaimPopup] =
    useState<boolean>(false);

  const handleVisibleClaimPopup = useCallback((value: boolean) => {
    setIsVisibleClaimPopup(value);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const data = await doGetMyVesting(slug as string, controller.signal);

      if (data?.data?.project_vesting) {
        setProjectVesting(data.data.project_vesting);
      }

      if (data?.data?.vesting_pool) {
        setVestingPool(data.data.vesting_pool);
      }
    };

    fetchData().catch((e) => {
      console.error(e);
    });

    return () => {
      controller.abort();
    };
  }, [slug]);

  useEffect(() => {
    if (projectVesting && vestingPool) {
      setLoading(false);
    }
  }, [projectVesting, vestingPool]);

  const renderVestingStatus = useCallback((date?: string) => {
    if (!date) {
      return null;
    }

    if (dayjs.utc(date).isBefore(dayjs.utc())) {
      return (
        <Badge className="bg-kyu-color-17 text-base hover:bg-kyu-color-17/75">
          Released
        </Badge>
      );
    }

    if (dayjs.utc(date).isAfter(dayjs.utc())) {
      return (
        <Badge className="bg-kyu-color-13 text-base hover:bg-kyu-color-13/75">
          Incoming
        </Badge>
      );
    }
  }, []);

  const handleSetOpenClaimTooltip = useCallback((value: boolean) => {
    setOpenClaimTooltip(value);
  }, []);

  const isNotStart =
    !vestingPool?.is_active &&
    vestingPool?.start_at &&
    dayjs.utc(vestingPool?.start_at).isAfter(dayjs.utc());

  const isEnded =
    !vestingPool?.is_active &&
    vestingPool?.start_at &&
    dayjs.utc(vestingPool?.end_at).isBefore(dayjs.utc());

  const withdrawnAmountKey =
    projectVesting?._id && publicKey?.toBase58()
      ? `${projectVesting._id}_${publicKey?.toBase58()}`
      : '';

  useEffect(() => {
    if (
      withdrawnAmountKey &&
      (vestingPool?.withdrawn_amount || 0) >
        (withdrawnAmount[withdrawnAmountKey] || 0)
    ) {
      updateWithdrawnAmount(
        withdrawnAmountKey,
        vestingPool?.withdrawn_amount || 0,
      );
    }
  }, [withdrawnAmountKey, vestingPool?.withdrawn_amount, withdrawnAmount]);

  const isClaimedPartial =
    (withdrawnAmount[withdrawnAmountKey] || 0) >=
      (vestingPool?.released_amount || 0) &&
    (withdrawnAmount[withdrawnAmountKey] || 0) <
      (vestingPool?.total_amount || 0);

  const isClaimed =
    (withdrawnAmount[withdrawnAmountKey] || 0) >=
    (vestingPool?.total_amount || 0);

  const renderClaimButton = useCallback(() => {
    if (isNotStart) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={isOpenClaimTooltip}>
            <TooltipTrigger asChild>
              <div>
                <PrimaryButton
                  disabled
                  onTouchStart={() => {
                    handleSetOpenClaimTooltip(!isOpenClaimTooltip);
                  }}
                  onMouseOver={() => {
                    handleSetOpenClaimTooltip(true);
                  }}
                  onMouseOut={() => {
                    handleSetOpenClaimTooltip(false);
                  }}
                  className="min-w-[200px]"
                >
                  Claim Now &nbsp;{' '}
                  <Image src={infoIcon} alt="info" draggable={false} />
                </PrimaryButton>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[274px] px-5 py-4">
              <p className="text-base font-medium text-justify">
                Please wait until claim time!
              </p>
              <TooltipArrow fill="#8E8FA2" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (isEnded) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={isOpenClaimTooltip}>
            <TooltipTrigger asChild>
              <div>
                <PrimaryButton
                  disabled
                  onTouchStart={() => {
                    handleSetOpenClaimTooltip(!isOpenClaimTooltip);
                  }}
                  onMouseOver={() => {
                    handleSetOpenClaimTooltip(true);
                  }}
                  onMouseOut={() => {
                    handleSetOpenClaimTooltip(false);
                  }}
                  className="min-w-[200px]"
                >
                  Claimed &nbsp;{' '}
                  <Image src={infoIcon} alt="info" draggable={false} />
                </PrimaryButton>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[274px] px-5 py-4">
              <p className="text-base font-medium text-justify">
                Claim time ended!
              </p>
              <TooltipArrow fill="#8E8FA2" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (isClaimedPartial) {
      return (
        <TooltipProvider delayDuration={0}>
          <Tooltip open={isOpenClaimTooltip}>
            <TooltipTrigger asChild>
              <div>
                <PrimaryButton
                  onTouchStart={() => {
                    handleSetOpenClaimTooltip(!isOpenClaimTooltip);
                  }}
                  onMouseOver={() => {
                    handleSetOpenClaimTooltip(true);
                  }}
                  onMouseOut={() => {
                    handleSetOpenClaimTooltip(false);
                  }}
                  className="min-w-[200px]"
                  disabled
                >
                  Claim Now &nbsp;{' '}
                  <Image src={infoIcon} alt="info" draggable={false} />
                </PrimaryButton>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[274px] px-5 py-4">
              <p className="text-base font-medium text-justify">
                Please wait until next claim time!
              </p>
              <TooltipArrow fill="#8E8FA2" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    if (isClaimed) {
      return (
        <PrimaryButton disabled className="min-w-[200px]">
          Claimed
        </PrimaryButton>
      );
    }

    return (
      <ClaimMorePopup
        amount={vestingPool?.available_amount || 0}
        visible={isVisibleClaimPopup}
        setVisible={handleVisibleClaimPopup}
        tokenSymbol={projectVesting?.vesting_token_symbol}
        handleClaim={() => {}}
        withdrawnAmount={withdrawnAmount[withdrawnAmountKey] || 0}
      >
        <PrimaryButton className="min-w-[200px]">Claim Now</PrimaryButton>
      </ClaimMorePopup>
    );
  }, [
    withdrawnAmountKey,
    isClaimed,
    isClaimedPartial,
    isEnded,
    isNotStart,
    isOpenClaimTooltip,
    isVisibleClaimPopup,
    projectVesting?.vesting_token_symbol,
    vestingPool?.available_amount,
    withdrawnAmount,
  ]);

  return (
    <>
      <div
        className={cn(
          'w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 items-center justify-center flex-col lg:flex-row',
        )}
      >
        <div className="w-full flex flex-col gap-4">
          {loading ? (
            <Skeleton className="h-[40px] w-[60%]" />
          ) : (
            <h2 className="text-4xl font-bold text-kyu-color-17">
              Congrats! You are receiving{' '}
              {vestingPool?.total_amount?.toLocaleString('en-US') || 0}{' '}
              {projectVesting?.vesting_token_symbol?.toUpperCase() || ''}
            </h2>
          )}

          <div className="text-2xl">
            You are one of the investors, don&apos;t forget to follow the
            vesting schedule to claim your tokens.
          </div>

          <div className="p-5 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] bg-kyu-color-12 flex gap-16 justify-between flex-col items-center lg:flex-row">
            <div className="w-full lg:max-w-[512px] flex flex-col gap-4">
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Total Invested</span>
                {loading ? (
                  <Skeleton className="h-[32px] w-[200px]" />
                ) : (
                  <span className="font-bold text-2xl text-kyu-color-5">
                    {projectVesting?.invested_total?.toLocaleString('en-US') ||
                      0}{' '}
                    {projectVesting?.invested_currency?.toUpperCase() || ''}
                  </span>
                )}
              </div>
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">TGE</span>
                {loading ? (
                  <Skeleton className="h-[32px] w-[200px]" />
                ) : (
                  <span className="font-bold text-2xl">
                    {projectVesting?.tge_amount || 0}
                    {projectVesting?.tge_type === 'percent'
                      ? '%'
                      : ` ${projectVesting?.invested_currency?.toUpperCase() || ''}`}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full lg:max-w-[512px] flex flex-col gap-4">
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Total token received</span>
                {loading ? (
                  <Skeleton className="h-[32px] w-[200px]" />
                ) : (
                  <span className="font-bold text-2xl text-kyu-color-5">
                    {withdrawnAmount?.[withdrawnAmountKey]?.toLocaleString(
                      'en-US',
                    ) ||
                      vestingPool?.withdrawn_amount?.toLocaleString('en-US') ||
                      0}{' '}
                    {projectVesting?.vesting_token_symbol?.toUpperCase() || ''}
                  </span>
                )}
              </div>
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Vesting Type</span>
                {loading ? (
                  <Skeleton className="h-[32px] w-[200px]" />
                ) : (
                  <span className="font-bold text-2xl capitalize">
                    {projectVesting?.vesting_type || ''}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 flex-wrap">
            {renderClaimButton()}

            {vestingPool?.is_active && (
              <a
                target="_blank"
                rel="noreferrer noopener"
                href={`https://app.streamflow.finance/contract/solana/${env.NEXT_PUBLIC_NETWORK}/${vestingPool?.stream_id || ''}`}
              >
                <SecondaryButton className="min-w-[200px]">
                  Claim with Streamflow
                </SecondaryButton>
              </a>
            )}
          </div>

          <div className="flex gap-5 flex-col relative">
            <div className="font-bold text-[32px] pt-5">Claim Period</div>
            <div className="w-full lg:max-w-[908px] z-[2]">
              {loading ? (
                <Skeleton className="h-[690px] w-full rounded-[16px]" />
              ) : (
                <Table parent="max-h-[690px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-2">
                          <span>Date</span>
                          {vestingPool?.vesting_schedule?.[0]?.is_cliff ? (
                            <Badge>Cliff</Badge>
                          ) : (
                            ''
                          )}
                        </div>
                      </TableHead>
                      <TableHead>Token Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vestingPool?.vesting_schedule?.map(
                      (sc: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell className="whitespace-nowrap">
                            {sc?.vesting_time
                              ? dayjs
                                  .utc(sc.vesting_time)
                                  .format(UTC_FORMAT_STRING)
                              : ''}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {sc?.vesting_total?.toLocaleString('en-US') || 0}{' '}
                            {sc?.vesting_token_symbol?.toUpperCase() || ''}
                          </TableCell>
                          <TableCell className="whitespace-nowrap">
                            {renderVestingStatus(sc?.vesting_time)}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
            <ImageNext
              src={viewClaimCat}
              alt="cat"
              draggable={false}
              width={390}
              height={390}
              className="absolute right-0 z-[1] top-20 hidden lg:block"
            />
          </div>
        </div>
      </div>

      <ImageNext
        src={viewRegistrationDecor}
        alt="decorator"
        className="mx-auto w-full"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewClaim);
