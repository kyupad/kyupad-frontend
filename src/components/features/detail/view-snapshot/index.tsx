import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { doViewRegistration } from '@/adapters/projects';
import Skeleton from '@/components/common/loading/skeleton';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { currencyFormatter } from '@/utils/helpers';
import { useWallet } from '@solana/wallet-adapter-react';
import Big from 'big.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Back from '../back';
import infoIcon from '/public/images/detail/info-icon.svg';
import percentWining from '/public/images/detail/percent-winning.svg';
import snapshottingKyu from '/public/images/detail/snapshotting-kyu.png';
import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';
import winningCatTmp from '/public/images/detail/winning-cat-tmp.png';

dayjs.extend(utc);

interface IViewSnapshotProps {
  data: any;
  usersAssets?: { total_assets?: number; participants?: number };
}

function ViewSnapshot({ data, usersAssets }: IViewSnapshotProps) {
  const { publicKey } = useWallet();
  const [catnipInfo, setCatnipInfo] = useState<any>({});
  const { slug } = useParams();
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
    const fetchData = async () => {
      if (publicKey && slug) {
        const data = await doViewRegistration({
          wallet: publicKey?.toBase58(),
          slug: slug as string,
        });

        if (data?.data?.catnip_info) {
          setCatnipInfo(data.data.catnip_info);
        }
      }
    };

    try {
      fetchData().finally(() => setLoading(false));
    } catch (e) {
      console.error(e);
    }
  }, [publicKey, slug]);

  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 pb-[210px] items-center justify-center flex-col lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <Back />
          <div className="flex gap-5 items-center">
            <div>
              <Image
                className="max-w-[100px] min-h-[100px] sm:min-h-[150px] sm:max-w-[150px] xl:max-w-[200px] rounded-full xl:min-h-[200px] border-2 border-kyu-color-4"
                src={data?.logo}
                width={200}
                height={200}
                alt="project logo"
                draggable={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold xl:leading-[60px] line-clamp-2">
                {data?.name || ''}
              </h1>
              <p className="text-xl sm:text-3xl xl:text-4xl font-bold xl:leading-[48px] line-clamp-1">
                {data?.token_info?.symbol
                  ? `$${data?.token_info?.symbol.toUpperCase()}`
                  : ''}
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-kyu-color-17">
            Snapshot is in progress!
          </h2>

          {loading ? (
            <Skeleton className="h-6" />
          ) : catnipInfo?.is_snapshoting ? null : (
            <div className="flex items-center gap-5">
              <span className="text-2xl font-bold">
                You have <span className="text-kyu-color-18">low</span> chance
                of winning
              </span>
              <span>
                <Image src={infoIcon} alt="icon" />
              </span>
            </div>
          )}

          {loading ? (
            <Skeleton className="h-8 w-[75%]" />
          ) : catnipInfo?.is_snapshoting ? null : (
            <div>
              <Image src={percentWining} alt="percent winning" />
            </div>
          )}

          <div className="text-2xl font-bold">
            The process will take 6 hours, please wait for the results
          </div>

          <div className="p-4 lg:p-10 bg-kyu-color-16 border-2 border-kyu-color-10 rounded-[16px] flex gap-4 flex-col lg:max-w-[704px]">
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Total Assets Connected</span>
              <span className="text-2xl font-bold">
                {usersAssets?.total_assets
                  ? currencyFormatter.format(
                      Big(usersAssets.total_assets).toNumber(),
                    )
                  : '$0'}
              </span>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Participants</span>
              <span className="text-2xl font-bold">
                {usersAssets?.participants?.toLocaleString('en-US') || 0}
              </span>
            </div>
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : catnipInfo?.is_snapshoting ? (
            <Image src={snapshottingKyu} alt="cat" draggable={false} />
          ) : (
            <Image src={winningCatTmp} alt="cat" draggable={false} />
          )}
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

export default memo(ViewSnapshot);
