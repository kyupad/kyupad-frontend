/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RegisteredView from '@/components/features/detail/registed-view';
import { DetailDataTypes } from '@/components/features/detail/types';
import DetailContext from '@/contexts/detai-context';
import { initData } from '@/mocks/detail-data';

const Snapshot = dynamic(
  () => import('@/components/features/detail/snapshot'),
  {
    ssr: true,
  },
);
const Claim = dynamic(() => import('@/components/features/detail/claim'), {
  ssr: true,
});
const Registration = dynamic(
  () => import('@/components/features/detail/registration'),
  { ssr: true },
);
const Investment = dynamic(
  () => import('@/components/features/detail/investment'),
  { ssr: true },
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
      registration: { ...data.registration, timeEnded: true },
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
  const handleChangeSnapshotStatus = useCallback(() => {
    setData({
      ...data,
      step: 'investment',
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
    <DetailContext.Provider
      value={{
        ...data,
        handleChangeView,
        handleInvested,
        handleRegisted,
        handleChangeRegisterStatus,
        handleChangeInvestmentStatus,
        handleChangeSnapshotStatus,
        registedView,
      }}
    >
      <div className="flex items-center size-full  h-auto  mx-auto ">
        <div className="size-full relative">
          <div className="flex w-full max-w-8xl mx-auto justify-between px-4 lg:px-[24px] py-5 flex-wrap gap-8">
            <Image
              src="/images/detail/arrow-left.svg"
              width={30}
              height={30}
              alt="arrow-left"
              className="cursor-pointer "
              onClick={router.back}
            />
          </div>
          {renderStep(data.step)}
        </div>
      </div>
    </DetailContext.Provider>
  );
};
export default Detail;
