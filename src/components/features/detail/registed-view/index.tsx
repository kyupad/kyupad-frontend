import React, { useContext } from 'react';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import HeadDetail from '@/components/features/detail/head-detail';
import Point from '@/components/features/detail/point';
import PointChart from '@/components/features/detail/point-chart';
import RegisterElement from '@/components/features/detail/timer-countdown';

const RegisteredView = () => {
  const { image, coinName, coinSymbol, tradePlatform } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <div className="">
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
  );
};
// eslint-disable-next-line import/no-unused-modules
export default RegisteredView;
