import React, { useContext } from 'react';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import HeadDetail from '@/components/features/detail/head-detail';
import ProjectView from '@/components/features/detail/project-view';
import Step from '@/components/features/detail/step';
import RegisterElement from '@/components/features/detail/timer-countdown';

const Registation = () => {
  const { image, coinName, coinSymbol, tradePlatform, description } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <div>
      <HeadDetail
        image={image}
        CoinName={coinName}
        CoinSymbol={coinSymbol}
        tradePlatform={tradePlatform}
      />
      <span className="text-xl my-6 block">{description}</span>
      <Step />
      <RegisterElement />
      <ProjectView />
    </div>
  );
};

export default Registation;
