'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Skeleton from '@/components/common/loading/skeleton';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Big from 'big.js';
import check from 'public/images/my-space/check.svg';
import copy from 'public/images/my-space/copy.svg';

function MySpaceBalance() {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number>();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const getBalance = async () => {
      if (publicKey) {
        const balance = await connection?.getBalance(publicKey);
        setBalance(balance);
      }
    };

    getBalance();
  }, [connection, publicKey]);

  const handleSetCopied = useCallback((value: boolean) => {
    setCopied(value);
  }, []);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="flex flex-col gap-4 px-[20px] py-4 sm:px-[60px] sm:py-[40px]">
      <h1 className="text-2xl sm:text-[32px] font-bold text-kyu-color-11 leading-[44px]">
        My Portfolio
      </h1>
      <div className="text-4xl sm:text-[60px] font-bold text-kyu-color-13 leading-[72px]">
        {balance || balance === 0 ? (
          Big(balance).div(LAMPORTS_PER_SOL).toFixed(5) + ' SOL'
        ) : (
          <Skeleton className="h-16 w-[320px]" />
        )}
      </div>
      {!publicKey ? (
        <Skeleton className="h-8 w-[274px]" />
      ) : (
        <div className="flex gap-4 items-center">
          <span>
            <span className="font-bold text-xl">Address:</span>{' '}
            <span className="text-xl">
              {publicKey?.toBase58()?.slice(0, 5) +
                '...' +
                publicKey?.toBase58()?.slice(-5)}
            </span>
          </span>
          <button
            onClick={() => {
              handleSetCopied(true);
              navigator.clipboard.writeText(publicKey?.toBase58());
            }}
            className="min-w-[32px]"
          >
            {copied ? (
              <Image src={check} alt="Copy" />
            ) : (
              <Image src={copy} alt="Copy" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default memo(MySpaceBalance);
