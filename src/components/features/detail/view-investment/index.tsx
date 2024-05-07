import React, { memo, useEffect, useState } from 'react';
import ImageNext from 'next/image';
import { useParams } from 'next/navigation';
import { doViewRegistration } from '@/adapters/projects';
import PrimaryButton from '@/components/common/button/primary';
import SimpleCountdown from '@/components/common/coutdown/simple';
import Skeleton from '@/components/common/loading/skeleton';
import { useGlobalStore } from '@/contexts/global-store-provider';
import { useProjectDetailStore } from '@/contexts/project-detail-store-provider';
import { useWallet } from '@solana/wallet-adapter-react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Back from '../back';
// import lossTicket from '/public/images/detail/loss-ticket.png';
// import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';
import wonTicketDecor from '/public/images/detail/won-ticket-decor.svg';
import wonTicket from '/public/images/detail/won-ticket.png';

dayjs.extend(utc);

interface IViewSnapshotProps {
  data: any;
}

function ViewInvestment({ data }: IViewSnapshotProps) {
  const { publicKey } = useWallet();
  const [investmentInfo, setInvestmentInfo] = useState<{
    total_owner_winning_tickets?: number;
    tickets_used?: number;
    total_winner?: number;
    ticket_size?: number;
    currency?: string;
    token_offered?: number;
  }>({});
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

        if (data?.data?.investment_info) {
          setInvestmentInfo(data.data.investment_info);
        }
      }
    };

    try {
      fetchData().finally(() => setLoading(false));
    } catch (e) {
      console.error(e);
    }
  }, [publicKey, slug]);

  const now = dayjs.utc();

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
            Congrats! You’ve won a ticket in the IDO!
          </h2>

          <div className="text-2xl">
            You are one of the winners, lock in your place by being the first to
            invest.
          </div>

          <div className="p-4 lg:p-10 bg-kyu-color-12 border-2 border-kyu-color-10 rounded-[16px] flex gap-4 flex-col lg:max-w-[704px]">
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Number of winning tickets</span>
              <span className="text-2xl font-bold text-kyu-color-13">
                {investmentInfo?.total_owner_winning_tickets
                  ? investmentInfo?.total_owner_winning_tickets < 10
                    ? `0${investmentInfo?.total_owner_winning_tickets}`
                    : investmentInfo?.total_owner_winning_tickets
                  : 0}
              </span>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Number of invested tickets</span>
              <span className="text-2xl font-bold text-kyu-color-13">
                {investmentInfo?.tickets_used
                  ? investmentInfo?.tickets_used < 10
                    ? `0${investmentInfo?.tickets_used}`
                    : investmentInfo?.tickets_used
                  : 0}
              </span>
            </div>

            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Ticket size</span>
              <span className="text-2xl font-bold text-kyu-color-13">
                {investmentInfo?.ticket_size || 0}{' '}
                {investmentInfo?.currency || 'USDT'}
              </span>
            </div>

            <div className="h-[2px] bg-kyu-color-10" />

            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Total Winners</span>
              <span className="text-2xl font-bold">
                {investmentInfo?.total_winner?.toLocaleString('en-US') || 0}
              </span>
            </div>

            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Total ticket</span>
              <span className="text-2xl font-bold">
                {investmentInfo?.token_offered?.toLocaleString('en-US') || 0}
              </span>
            </div>
          </div>

          <div className="flex gap-4 md:gap-8 items-center flex-wrap">
            <div className="text-2xl font-bold">Investment Ends in</div>
            {dayjs.utc(data?.timeline?.investment_end_at).isAfter(now) ? (
              <SimpleCountdown
                className="!text-xl md:!text-2xl"
                time={dayjs.utc(data?.timeline?.investment_end_at).valueOf()}
              />
            ) : (
              <span className="font-bold text-2xl text-kyu-color-18">
                Ended
              </span>
            )}
          </div>

          <div>
            <PrimaryButton block={false}>Invest</PrimaryButton>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {loading ? (
            <Skeleton className="h-[600px] w-full" />
          ) : (
            <ImageNext
              src={wonTicket}
              alt="cat"
              draggable={false}
              className="w-full max-w-[600px]"
            />
          )}
        </div>
      </div>

      <ImageNext
        src={wonTicketDecor}
        alt="decorator"
        className="mx-auto w-full absolute bottom-0 -z-[1]"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewInvestment);
