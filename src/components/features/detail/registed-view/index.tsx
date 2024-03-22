import React, { useContext } from 'react';
import { detailContext } from '@/components/features/detail';

import HeadDetail from '../head-detail';
import Point from '../point';
import PointChart from '../point-chart';
import RegisterElement from '../timer-countdown';

const RegisteredView = () => {
  // @ts-ignore
  const { image, coinName, coinSymbol, tradePlatform } =
    useContext(detailContext);

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
