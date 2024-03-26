/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Provider } from '@/components/common/context/detai-context';
import RegisteredView from '@/components/features/detail/registed-view';
import { DetailDataTypes } from '@/components/features/detail/types';
import { initData } from '@/mocks/detail-data';

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

const Detail = () => {
  const [registedView, setRegistedView] = React.useState(false);
  const [data, setData] = React.useState<DetailDataTypes>(initData);
  const router = useRouter();

  const handleChangeView = useCallback(() => {
    setRegistedView(true);
  }, []);
  const handleRegisted = useCallback(() => {
    setData({
      ...data,
      registration: { ...data.registration, registed: true },
    });
  }, []);
  const handleInvested = useCallback(() => {
    setData({
      ...data,
      investment: { ...data.investment, invested: true },
    });
  }, []);
  const handleChangeRegisterStatus = useCallback(() => {
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
  }, [data.registration.registed]);

  const handleChangeInvestmentStatus = useCallback(() => {
    setData({
      ...data,
      step: 'claim',
      investment: { ...data.investment, status: true },
    });
  }, []);

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
      </div>
    </Provider>
  );
};
export default Detail;
