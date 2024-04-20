'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { doGetMintingPool } from '@/adapters/whitelist-pass';
import PrimaryButton from '@/components/common/button/primary';
import CalendarCountdown from '@/components/common/coutdown/calendar';
import { Progress } from '@/components/common/progress/progress';
import { cn } from '@/utils/helpers';
import { useWallet } from '@solana/wallet-adapter-react';
import dayjs from 'dayjs';
import dropdown from 'public/images/whitelist/drop-down.svg';
import fcfsImage from 'public/images/whitelist/fcfs.png';

function FCFSPool() {
  const [open, setOpen] = useState<boolean>(false);
  const { publicKey } = useWallet();
  const [currentPool, setCurrentPool] = useState<any>({});

  const handleSetOpen = useCallback((value: boolean) => {
    setOpen(!value);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await doGetMintingPool({
        wallet: publicKey?.toBase58() || '',
      });

      if (data?.data?.fcfs_round?.current_pool) {
        setCurrentPool(data?.data?.fcfs_round?.current_pool);
      }
    };

    fetchData();
  }, [publicKey]);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex items-center gap-5 justify-between w-full flex-wrap">
        <h2 className="font-heading text-3xl sm:text-4xl xl:text-5xl">
          Round 2: FCFS
        </h2>
        <button
          onClick={() => handleSetOpen(open)}
          className="rounded-[8px] py-3 px-10 border-2 text-2xl font-bold bg-kyu-color-2 border-kyu-color-11 flex items-center gap-5"
        >
          <span>How to be eligible round 2</span>
          <Image
            src={dropdown}
            alt="dropdown"
            className={cn('transition-transform', open ? 'rotate-180' : '')}
          />
        </button>
      </div>

      <div
        className={cn(
          'overflow-hidden transition-all',
          open ? 'max-h-screen' : 'max-h-0',
        )}
      >
        <div
          className={cn(
            'py-5 px-10 border-2 rounded-[8px] bg-kyu-color-16 border-kyu-color-10 text-xl text-justify',
          )}
        >
          <p>
            If you hold at least one NFT from any of our partner collections and
            haven&apos;t yet participated in our Exclusive Pools (Round 1),
            you&apos;re eligible for a free mint of your NFT here.
          </p>
        </div>
      </div>

      <div className="flex p-10 bg-kyu-color-16 rounded-[16px] justify-center gap-10 items-center flex-wrap">
        <div className="w-[263px] h-[263px] relative rounded-[24px] overflow-hidden border-2 border-kyu-color-4">
          <Image
            src={currentPool?.pool_image || fcfsImage}
            alt={currentPool?.pool_image || ''}
            fill
            style={{ objectFit: 'cover' }}
            draggable={false}
          />
        </div>
        <div className="w-full max-w-[425px] flex flex-col gap-5">
          <span className="text-xl font-bold">Round 2 starts in:</span>
          <div className="-mt-4">
            <CalendarCountdown
              time={dayjs.utc(currentPool?.start_time).valueOf()}
            />
          </div>

          <div className="relative mt-6">
            <span className="absolute left-0 -top-8 font-bold text-kyu-color-11">
              {currentPool?.minted_total || 0}
            </span>
            <Progress value={0} />
            <span className="absolute right-0 -top-8">
              <span className="text-kyu-color-14 font-medium">Total</span>{' '}
              <span className="font-bold text-kyu-color-11">
                {currentPool?.pool_supply || 0}
              </span>
            </span>
          </div>

          <PrimaryButton disabled={!currentPool?.is_active}>
            {currentPool?.is_active ? 'Free Mint' : 'Not eligible'}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default memo(FCFSPool);
