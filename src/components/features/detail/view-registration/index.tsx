import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { doViewRegistration } from '@/adapters/projects';
import SecondaryButton from '@/components/common/button/secondary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import Skeleton from '@/components/common/loading/skeleton';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { currencyFormatter } from '@/utils/helpers';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useWallet } from '@solana/wallet-adapter-react';
import Big from 'big.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import kyuViewRegistration from '/public/images/detail/kyu-view-registration.png';
import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';

dayjs.extend(utc);

function ViewRegistration({
  registrationEndAt,
  revalidatePath,
  usersAssets,
}: {
  registrationEndAt: string;
  revalidatePath?: Function;
  usersAssets?: { total_assets?: number; participants?: number };
}) {
  const now = dayjs.utc();
  const { publicKey } = useWallet();
  const { slug } = useParams();
  const [catnipInfo, setCatnipInfo] = useState<{
    catnip_point?: number;
    multi_pier?: number;
    total_assets?: number;
    is_snapshoting?: boolean;
    assets_catnip_info?: {
      asset_type: 'fungible' | 'nft' | 'stable_coin';
      assets: {
        name: string;
        symbol: string;
        multi_pier: number;
        icon: string;
      }[];
    }[];
  }>({});
  const [loading, setLoading] = useState(true);
  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );
  const changeViewMode = useProjectDetailStore((state) => state.changeViewMode);

  useEffect(() => {
    if (!isSolanaConnected) {
      changeViewMode(null);
    }
  }, [isSolanaConnected]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      if (publicKey && slug) {
        const data = await doViewRegistration(
          {
            wallet: publicKey?.toBase58(),
            slug: slug as string,
          },
          controller.signal,
        );

        if (data?.data?.catnip_info) {
          setCatnipInfo(data.data.catnip_info);
        }
      }
    };

    fetchData()
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [publicKey, slug]);

  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex flex-col gap-5 pb-4">
        <h2 className="text-4xl font-bold text-kyu-color-17">
          Great! You’ve been registered to the IDO!
        </h2>
        {loading ? (
          <Skeleton className="h-6" />
        ) : (
          !catnipInfo?.is_snapshoting && (
            <p className="text-2xl">
              <span className="font-bold">
                Your Catnip Points is {catnipInfo?.catnip_point || 0}.
              </span>{' '}
              Increase it to win more tickets and earn higher allocation
            </p>
          )
        )}

        <div className="p-4 lg:p-10 bg-kyu-color-16 rounded-[16px] border-2 border-kyu-color-10 flex justify-between gap-8 flex-wrap">
          <div className="flex flex-wrap gap-4 w-full justify-between">
            <div className="flex justify-between gap-4 flex-col w-full xl:max-w-[512px]">
              <span className="text-xl">Total Assets Connected</span>
              <span className="text-2xl font-bold">
                {usersAssets?.total_assets
                  ? currencyFormatter.format(
                      Big(usersAssets?.total_assets).toNumber(),
                    )
                  : '$0'}
              </span>
            </div>
            <div className="flex justify-between gap-4 flex-col w-full xl:max-w-[405px]">
              <span className="text-xl">Total Participants</span>
              <span className="text-2xl font-bold">
                {usersAssets?.participants?.toLocaleString('en-US') || 0}
              </span>
            </div>
          </div>

          <div className="h-[1px] bg-black w-full" />

          <div className="text-[32px] font-bold">Your Assets</div>

          <div className="flex flex-wrap gap-6 w-full justify-between">
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
              ) : !catnipInfo?.is_snapshoting ? (
                <>
                  {catnipInfo?.assets_catnip_info?.map((info) => {
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
                      <div
                        key={info.asset_type}
                        className="flex gap-4 flex-col"
                      >
                        <span className="text-xl">{name}</span>
                        <div className="text-2xl font-bold flex gap-5 items-center scrollbar overflow-auto xl:max-w-[512px] pb-5">
                          {info?.assets?.map((asset, index) => (
                            <div
                              key={`${asset.name}_${asset.symbol}_${index}`}
                              className="flex items-center gap-[10px]"
                            >
                              <span className="h-8 bg-kyu-color-4 text-base flex justify-center items-center rounded-[100px] w-fit min-w-16">
                                {asset?.multi_pier || 0}x
                              </span>

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
              ) : (
                <span className="flex items-center">
                  <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />{' '}
                  Snapshotting all your assets...
                </span>
              )}
            </div>
            <div className="flex gap-6 w-full xl:max-w-[405px] flex-col">
              <div className="flex flex-col gap-4">
                <span className="text-xl">Your Assets Connected</span>
                {loading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span className="text-2xl font-bold">
                    {catnipInfo?.is_snapshoting ? (
                      <span className="flex items-center">
                        <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />{' '}
                        Snapshotting...
                      </span>
                    ) : (
                      currencyFormatter.format(
                        Big(catnipInfo?.total_assets || 0).toNumber(),
                      )
                    )}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-xl">Your Catnip Points</span>
                {loading ? (
                  <Skeleton className="h-6 w-20" />
                ) : (
                  <span className="text-2xl font-bold">
                    {catnipInfo?.is_snapshoting ? (
                      <span className="flex items-center">
                        <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />{' '}
                        Snapshotting...
                      </span>
                    ) : (
                      catnipInfo?.catnip_point?.toLocaleString('en-US') || 0
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 justify-between items-center flex-wrap">
          <div className="flex gap-4 md:gap-8 flex-wrap">
            <div className="text-2xl font-bold">Registration Ends in</div>
            {dayjs.utc(registrationEndAt).isAfter(now) ? (
              <SimpleCountdown
                className="!text-xl md:!text-2xl"
                time={dayjs.utc(registrationEndAt).valueOf()}
                revalidatePath={revalidatePath}
              />
            ) : (
              <span className="font-bold text-2xl text-kyu-color-18">
                Ended
              </span>
            )}
          </div>
          <div>
            <SecondaryButton disabled>Registered</SecondaryButton>
          </div>
        </div>

        <div className="flex items-center gap-[80px] flex-col lg:flex-row pt-5 pb-16">
          <div className="max-w-[600px]">
            <Image
              src={kyuViewRegistration}
              alt="Kyu view registration"
              draggable={false}
            />
          </div>
          <div className="w-full">
            <div className="p-4 sm:p-10 bg-kyu-color-2 rounded-[16px] flex-col flex gap-3 border-2 border-kyu-color-10">
              <div className="text-2xl font-bold">
                How to increase your Catnip Points
              </div>
              <ul className="text-2xl list-disc pl-6 flex flex-col gap-3">
                <li>Hold more Solana Assets (SOL, JUP, JTO, USDC)</li>
                <li>Hold a Mad labs, SMB NFT</li>
                <li>Follow and share all the news of us on X</li>
                <li>Have Whitelist Pass NFT</li>
                <li>Be a OG of KyuPad</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Image
        src={viewRegistrationDeco}
        alt="decorator"
        className="mx-auto w-full absolute bottom-0 -z-[1]"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewRegistration);
