'use client';

import React, { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { doGetMyParticipationsClient } from '@/adapters/my-space';
import Skeleton from '@/components/common/loading/skeleton';
import { ShowAlert } from '@/components/common/toast';
import { useWallet } from '@solana/wallet-adapter-react';
// import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Big from 'big.js';
import check from 'public/images/my-space/check.svg';
import copy from 'public/images/my-space/copy.svg';
import { useCopyToClipboard } from 'usehooks-ts';

function MySpaceBalance() {
  const { publicKey } = useWallet();
  // const { connection } = useConnection();
  // const [balance, setBalance] = useState<number>();
  const [copied, setCopied] = useState<boolean>(false);
  // eslint-disable-next-line no-unused-vars
  const [_, copyFn] = useCopyToClipboard();
  const [myAssets, setMyAssets] = useState<{
    assets_info?: any[];
    total_assets?: number;
  }>();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const getBalance = async () => {
  //     if (publicKey) {
  //       const balance = await connection?.getBalance(publicKey);
  //       setBalance(balance);
  //     }
  //   };

  //   getBalance();
  // }, [connection, publicKey]);

  const handleSetCopied = useCallback((value: boolean) => {
    setCopied(value);
  }, []);

  useEffect(() => {
    if (copied) {
      ShowAlert.success({ message: `Copied to clipboard!` });
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      const data = await doGetMyParticipationsClient(controller.signal);

      if (data?.data?.my_assets) {
        setMyAssets(data?.data?.my_assets);
      }
    };

    fetchData()
      .catch((error) => {
        console.error(error);
      })
      .finally(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 px-[20px] py-4 sm:px-[60px] sm:py-[40px]">
      <h1 className="text-2xl sm:text-[32px] font-bold text-kyu-color-11 leading-[44px]">
        My Portfolio
      </h1>
      <div className="text-4xl sm:text-[60px] font-bold text-kyu-color-13 leading-[72px]">
        {!loading ? (
          myAssets?.total_assets ? (
            `$${Big(myAssets.total_assets).toFixed(1)}`
          ) : (
            `$0`
          )
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
              {(publicKey?.toBase58()?.slice(0, 5) || '') +
                '...' +
                (publicKey?.toBase58()?.slice(-5) || '')}
            </span>
          </span>
          <button
            onClick={async () => {
              await copyFn(publicKey?.toBase58());
              handleSetCopied(true);
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

      <div className="flex flex-col gap-6 w-full xl:max-w-[512px]">
        {loading ? (
          <>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 max-w-[20%]" />
              <Skeleton className="h-6" />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 max-w-[20%]" />
              <Skeleton className="h-6" />
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="h-5 max-w-[20%]" />
              <Skeleton className="h-6" />
            </div>
          </>
        ) : (
          <>
            {myAssets?.assets_info?.map((info) => {
              if (!info.assets?.length) {
                return null;
              }
              let name = '';
              if (info.asset_type === 'nft') {
                name = 'NFT';
              }

              if (info.asset_type === 'stable_coin') {
                name = 'Stable Coin';
              }

              if (info.asset_type === 'fungible') {
                name = 'Solana Ecosystem Value';
              }
              return (
                <div key={info.asset_type} className="flex gap-4 flex-col">
                  <span className="text-xl">{name}</span>
                  <div className="text-2xl font-bold flex gap-5 items-center scrollbar overflow-auto xl:max-w-[512px] pb-5">
                    {info?.assets?.map((asset: any, index: number) => (
                      <div
                        key={`${asset.name}_${asset.symbol}_${index}`}
                        className="flex items-center gap-[10px]"
                      >
                        {/* <span className="h-8 bg-kyu-color-4 text-base flex justify-center items-center rounded-[100px] w-fit min-w-16">
                          {asset?.multi_pier || 0}x
                        </span> */}

                        <div className="overflow-hidden rounded-[100px] w-[36px] h-[36px] relative">
                          <Image
                            src={asset.icon}
                            alt={asset.name || ''}
                            draggable={false}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <span className="-ml-[2px]">{asset.symbol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default memo(MySpaceBalance);
