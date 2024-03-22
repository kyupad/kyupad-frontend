'use client';

import React, { createContext } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import RegisteredView from './registed-view';

const Snapshot = dynamic(
  () => import('@/components/features/detail/snapshot'),
  {
    ssr: false,
  },
);
const Claim = dynamic(() => import('@/components/features/detail/claim'), {
  ssr: false,
});
const Registration = dynamic(
  () => import('@/components/features/detail/registration'),
  { ssr: false },
);
const Investment = dynamic(
  () => import('@/components/features/detail/investment'),
  { ssr: false },
);

type Data = {
  image: string;
  coinName: string;
  coinSymbol: string;
  tradePlatform: string[];
  point: number;
  multiplier: string;
  totalAssetsConnected: number;
  paticipants: number;
  totalRaised: number;
  tokenOffered: number;
  priceTransfer: number;
  ticketSize: number;
  changeOfWinning: number;
  numberOfWinners: number;
  totalWinners: number;
  totalTickets: number;
  step: string;
  registration: {
    timer: string;
    registed: boolean;
    status: boolean;
  };
  snapshot: {
    timer: string;
  };
  investment: {
    timer: string;
    invested: boolean;
    timeEnded: boolean;
    status: boolean;
  };
  claim: {
    timer: string;
    claimed: boolean;
  };
  NumOfCoin: number;
  tge: string;
  vestingType: string;
  totalInvested: number;
  totalTokenReceived: number;
  claimPeiod: {
    date: string;
    tokenAmount: string;
    txid: string;
  }[];
};
interface ContexType extends Data {
  handleRegisted?: () => void;
  handleInvested?: () => void;
  handleChangeRegisterStatus?: () => void;
  handleChangeInvestmentStatus?: () => void;
  handleChangeView?: () => void;
  registedView?: boolean;
}
// eslint-disable-next-line import/no-unused-modules
export const detailContext = createContext<ContexType | {}>({});
const initData: Data = {
  image: '/images/detail/starhero.png',
  coinName: 'StarHeroes',
  coinSymbol: '$STAR',
  tradePlatform: ['Perp DEX', 'DeFi'],
  point: 0.31,
  multiplier: '1x',
  totalAssetsConnected: 111111111,
  paticipants: 11342,
  totalRaised: 1000000,
  tokenOffered: 100000,
  priceTransfer: 0.1,
  ticketSize: 300,
  changeOfWinning: 1,
  numberOfWinners: 1,
  totalWinners: 3000,
  totalTickets: 1000,
  step: 'registration', // step of the process
  registration: {
    timer: '2024-03-25T18:00:00',
    registed: false, // trạng thái đã đăng ký
    status: false, // trạng thái thời gian đăng ký
  },
  snapshot: {
    timer: '2024-03-17T18:00:00',
  },
  investment: {
    timer: '2024-03-22T18:00:00',
    invested: false, // trạng thái đã đầu tư
    timeEnded: false, // trạng thái thời gian đầu tư
    status: true, // trạng thái investment
  },
  claim: {
    timer: '2024-03-17T18:00:00',
    claimed: false,
  },
  NumOfCoin: 1000,
  tge: '15%',
  vestingType: 'Linear',
  totalInvested: 10000,
  totalTokenReceived: 100000,
  claimPeiod: [
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
  ],
};
const Detail = () => {
  const [registedView, setRegistedView] = React.useState(false);
  const [data, setData] = React.useState<Data>(initData);
  const router = useRouter();
  const { Provider } = detailContext;

  const handleChangeView = () => {
    setRegistedView(true);
  };
  const handleRegisted = () => {
    setData({
      ...data,
      registration: { ...data.registration, registed: true },
    });
  };
  const handleInvested = () => {
    setData({ ...data, investment: { ...data.investment, invested: true } });
  };
  const handleChangeRegisterStatus = () => {
    setData({
      ...data,
      registration: { ...data.registration, status: true },
    });
    if (data.registration.registed) {
      setData({
        ...data,
        step: 'snapshot',
      });
    }
  };
  const handleChangeInvestmentStatus = () => {
    setData({
      ...data,
      step: 'claim',
      investment: { ...data.investment, status: true },
    });
  };
  const renderStep = (step: string) => {
    switch (step) {
      case 'registration':
        return registedView ? <RegisteredView /> : <Registration />;
      case 'snapshot':
        return <Snapshot />;
      case 'investment':
        return <Investment />;
      case 'claim':
        return <Claim />;
      default:
        return null;
    }
  };

  return (
    <Provider
      value={{
        ...data,
        handleChangeView,
        handleInvested,
        handleRegisted,
        handleChangeRegisterStatus,
        handleChangeInvestmentStatus,
        registedView,
      }}
    >
      <div className="px-10 flex items-center bg-[#F7F7F8] p-4 max-w-[1440px] h-auto min-h-[calc(100dvh_-_90px)] mx-auto ">
        <div className="w-full h-fit">
          <div>
            <Image
              src="/images/detail/arrow-left.svg"
              width={30}
              height={30}
              alt="arrow-left"
              className="cursor-pointer"
              onClick={router.back}
            />
          </div>
          {renderStep(data.step)}
        </div>
        {/* <RegisteredView /> */}
      </div>
    </Provider>
  );
};
// eslint-disable-next-line import/no-unused-modules
export type { ContexType };
export default Detail;
