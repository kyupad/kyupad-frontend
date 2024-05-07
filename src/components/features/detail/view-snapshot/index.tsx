import React, { memo, useEffect, useRef, useState } from 'react';
import { Nunito } from 'next/font/google';
import ImageNext from 'next/image';
import { useParams } from 'next/navigation';
import { doViewRegistration } from '@/adapters/projects';
import Skeleton from '@/components/common/loading/skeleton';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/common/tooltip';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { currencyFormatter } from '@/utils/helpers';
import { useWallet } from '@solana/wallet-adapter-react';
import Big from 'big.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import down from 'public/images/detail/down.svg';

import Back from '../back';
import catnipTable from '/public/images/detail/catnip-table.png';
import infoIcon from '/public/images/detail/info-icon.svg';
import snapshottingKyu from '/public/images/detail/snapshotting-kyu.png';
import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';

dayjs.extend(utc);

interface IViewSnapshotProps {
  data: any;
}

const fontSans = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  preload: true,
  display: 'swap',
});

function ViewSnapshot({ data }: IViewSnapshotProps) {
  const { publicKey } = useWallet();
  const [usersAssets, setUsersAssets] = useState<{
    total_assets?: number;
    participants?: number;
    chance_of_winning?: number;
  }>({});
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const catnipPointCanvas = useRef<HTMLCanvasElement>(null);
  const catnipBarCanvas = useRef<HTMLCanvasElement>(null);
  const isSolanaConnected = useGlobalStore(
    (state) => state.is_solana_connected,
  );
  const changeViewMode = useProjectDetailStore((state) => state.changeViewMode);

  useEffect(() => {
    if (
      !catnipPointCanvas.current ||
      loading ||
      (!usersAssets?.chance_of_winning && usersAssets?.chance_of_winning !== 0)
    ) {
      return;
    }
    const canvas = catnipPointCanvas.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    const image = new Image();
    image.src = catnipTable.src;

    const resizeCanvas = () => {
      canvas.width = 600;
      canvas.height = 600;
      redraw();
    };

    const redraw = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);

      context.font = `bold 24px ${fontSans.style.fontFamily}`;
      const text = 'You have';
      const textWidth = context.measureText(text).width;
      const x = (canvas.width - textWidth) / 2;
      const y = (canvas.height + 24) / 2;
      context.fillText(text, x, y);

      context.font = `bold 60px ${fontSans.style.fontFamily}`;
      const catnipPointText = `${usersAssets?.chance_of_winning || 0}%`;
      const catnipPointTextWidth = context.measureText(catnipPointText).width;
      const catnipPointTextX = (canvas.width - catnipPointTextWidth) / 2;
      const catnipPointTextY = (canvas.height + 60 + 100) / 2;

      if ((usersAssets?.chance_of_winning || 0) <= 15) {
        context.fillStyle = '#ec5347';
      } else if ((usersAssets?.chance_of_winning || 0) <= 60) {
        context.fillStyle = '#F8A627';
      } else {
        context.fillStyle = '#18CF6A';
      }
      context.fillText(catnipPointText, catnipPointTextX, catnipPointTextY);

      context.font = `bold 24px ${fontSans.style.fontFamily}`;
      const chanceOfWinningText = 'chance of winning';
      const chanceOfWinningTextWidth =
        context.measureText(chanceOfWinningText).width;
      const chanceOfWinningTextX =
        (canvas.width - chanceOfWinningTextWidth) / 2;
      const chanceOfWinningTextY = (canvas.height + 24 + 220) / 2;
      context.fillStyle = '#31313a';
      context.fillText(
        chanceOfWinningText,
        chanceOfWinningTextX,
        chanceOfWinningTextY,
      );
    };

    window.addEventListener('resize', resizeCanvas);

    image.onload = () => {
      resizeCanvas();
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [loading, usersAssets?.chance_of_winning]);

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

        if (data?.data?.users_assets) {
          setUsersAssets(data.data.users_assets);
        }
      }
    };

    try {
      fetchData().finally(() => setLoading(false));
    } catch (e) {
      console.error(e);
    }
  }, [publicKey, slug]);

  useEffect(() => {
    if (
      !catnipBarCanvas.current ||
      loading ||
      (!usersAssets?.chance_of_winning && usersAssets?.chance_of_winning !== 0)
    ) {
      return;
    }

    const canvas = catnipBarCanvas.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.fillStyle = '#EC5347';
    context.fillRect(12, 20, 80, 8);

    context.fillStyle = '#F8A627';
    context.fillRect(92, 20, 205, 8);

    context.fillStyle = '#18CF6A';
    context.fillRect(297, 20, 205, 8);

    const image = new Image();
    image.src = down.src;

    image.onload = () => {
      const c = usersAssets?.chance_of_winning || 0;
      const w = 490;
      const position = (c * w) / 100;
      context.drawImage(image, position, -4, 24, 24);
    };
  }, [loading, usersAssets?.chance_of_winning]);

  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 pb-[210px] items-center justify-center flex-col lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <Back />
          <div className="flex gap-5 items-center">
            <div>
              <ImageNext
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
          ) : !usersAssets?.chance_of_winning &&
            usersAssets?.chance_of_winning !== 0 ? null : (
            <div className="flex items-center gap-5">
              <span className="text-2xl font-bold">
                You have <span className="text-kyu-color-18">low</span> chance
                of winning
              </span>
              <>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ImageNext src={infoIcon} alt="icon" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-[274px] px-5 py-4">
                      <h3 className="font-bold text-xl">Chance of winning</h3>
                      <p className="text-base font-medium text-justify">
                        This chart shows real time data. Both percentages and
                        your allocation size can change with the growth of
                        participants.
                      </p>
                      <TooltipArrow fill="#8E8FA2" />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            </div>
          )}

          {loading ? (
            <Skeleton className="h-8 w-[75%]" />
          ) : !usersAssets?.chance_of_winning &&
            usersAssets?.chance_of_winning !== 0 ? null : (
            <canvas
              ref={catnipBarCanvas}
              className="w-full max-w-[514px]"
              width={514}
              height={32}
            />
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
        <div className="w-full flex justify-center">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : !usersAssets?.chance_of_winning &&
            usersAssets?.chance_of_winning !== 0 ? (
            <ImageNext
              src={snapshottingKyu}
              alt="cat"
              draggable={false}
              className="w-full max-w-[600px]"
            />
          ) : (
            <canvas
              ref={catnipPointCanvas}
              className="w-full max-w-[600px]"
              width={600}
              height={600}
            />
          )}
        </div>
      </div>

      <ImageNext
        src={viewRegistrationDeco}
        alt="decorator"
        className="mx-auto w-full absolute bottom-0 -z-[1]"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewSnapshot);
