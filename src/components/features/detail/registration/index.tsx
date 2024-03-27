import React, { useContext } from 'react';
import HeadDetail from '@/components/features/detail/head-detail';
import ProjectView from '@/components/features/detail/project-view';
import Step from '@/components/features/detail/step';
import RegisterElement from '@/components/features/detail/timer-countdown';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';

const Registation = () => {
  const { image, coinName, coinSymbol, tradePlatform, description } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <>
      <div className="w-full max-w-8xl mx-auto  px-4 lg:px-[24px] py-5 gap-8">
        <HeadDetail
          image={image}
          CoinName={coinName}
          CoinSymbol={coinSymbol}
          tradePlatform={tradePlatform}
        />
        <span className="text-xl my-6 block">{description}</span>
        <Step />
        <RegisterElement />
      </div>
      <ProjectView />
    </>
  );
};

export default Registation;
