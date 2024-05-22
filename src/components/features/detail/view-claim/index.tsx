import React, { memo } from 'react';
import ImageNext from 'next/image';
import PrimaryButton from '@/components/common/button/primary';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/common/table';
import { cn } from '@/utils/helpers';
import viewClaimCat from 'public/images/detail/view-claim-cat.png';
import viewRegistrationDecor from 'public/images/detail/view-registration-decor.svg';

function ViewClaim() {
  const hasData = true;
  return (
    <>
      <div
        className={cn(
          'w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 items-center justify-center flex-col lg:flex-row',
        )}
      >
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-4xl font-bold text-kyu-color-17">
            Congrats! You are receiving 3,000 STAR
          </h2>

          <div className="text-2xl">
            You are one of the investors, don&apos;t forget to follow the
            vesting schedule to claim your tokens.
          </div>

          <div className="p-5 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] bg-kyu-color-12 flex gap-16 justify-between flex-col items-center lg:flex-row">
            <div className="w-full lg:max-w-[512px] flex flex-col gap-4">
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Total Invested</span>
                <span className="font-bold text-2xl text-kyu-color-5">
                  300 USDT
                </span>
              </div>
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">TGE</span>
                <span className="font-bold text-2xl">15%</span>
              </div>
            </div>
            <div className="w-full lg:max-w-[512px] flex flex-col gap-4">
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Total token received</span>
                <span className="font-bold text-2xl text-kyu-color-5">
                  3,000 STAR
                </span>
              </div>
              <div className="flex justify-between gap-4 items-center flex-wrap">
                <span className="text-xl">Vesting Type</span>
                <span className="font-bold text-2xl">Milestone</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <PrimaryButton className="min-w-[200px]">Claim Now</PrimaryButton>
          </div>

          {hasData && (
            <div className="flex gap-5 flex-col relative">
              <div className="font-bold text-[32px] pt-5">Claim Period</div>
              <div className="w-full lg:max-w-[908px] z-[2]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Token Amount</TableHead>
                      <TableHead>Txid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...new Array(20)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap">
                          Sep 13, 2024
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          550 STAR
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <a className="underline" href="#">
                            0x42d3101...2d13284be
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
          )}
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
