import React, { useContext } from 'react';
import Image from 'next/image';
import HeadDetail from '@/components/features/detail/head-detail';
import Point from '@/components/features/detail/point';
import PointChart from '@/components/features/detail/point-chart';
import RegisterElement from '@/components/features/detail/timer-countdown';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';

const RegisteredView = () => {
  const { image, coinName, coinSymbol, tradePlatform } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <>
      <div className="max-w-8xl mx-auto">
        <HeadDetail
          image={image}
          CoinName={coinName}
          CoinSymbol={coinSymbol}
          tradePlatform={tradePlatform}
        />
        <Point />
        <RegisterElement />
        <PointChart />
      </div>
      <Image
        src={'/images/detail/yellow-cloud.svg'}
        alt="sad cat"
        fill
        className="!-bottom-[50px] !inset-[unset] !h-auto !w-screen -z-10"
      />
    </>
  );
};
// eslint-disable-next-line import/no-unused-modules
export default RegisteredView;
