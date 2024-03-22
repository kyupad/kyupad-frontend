import React, { useContext } from 'react';
import { detailContext } from '@/components/features/detail';

import HeadDetail from '../head-detail';
import ProjectView from '../project-view';
import Step from '../step';
import RegisterElement from '../timer-countdown';

const Registation = () => {
  // @ts-ignore
  const { image, coinName, coinSymbol, tradePlatform, registration } =
    useContext(detailContext);
  return (
    <div>
      <HeadDetail
        image={image}
        CoinName={coinName}
        CoinSymbol={coinSymbol}
        tradePlatform={tradePlatform}
      />
      <Step step={registration.registed} />
      <RegisterElement />
      <ProjectView />
    </div>
  );
};

export default Registation;
