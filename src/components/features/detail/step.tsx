import React from 'react';
import clsx from 'clsx';
import stepCss from '@styles/step.module.css';

const Step = ({ step }: { step: Boolean }) => {
  const data = {
    status: true,
    timer: 0,
    description:
      'Dive into intense multiplayer battles in the most competitive space shooter ever! Developed by industry veterans from Cyberpunk 2077, the Witcher, and Ubisoft- Powered by GameSwift and a Microsoft grant, with 400k * pre - registered players!',
  };
  return (
    <div className="*:py-2">
      <p className="text-xl my-6">{data.description}</p>
      <div className="flex p-8 border-2 border-[#31313A] rounded-md w-full">
        <div className={clsx(stepCss.stepblock, step && stepCss.stepdone)}>
          <div className="text-2xl font-bold py-2">Step 1</div>
          <div className={stepCss.rounddot}></div>
          <div className={stepCss.title}>Registration</div>
          <div className={stepCss.text}>Sep 1, 2024 13:00 UTC</div>
        </div>
        <div className={clsx(stepCss.stepblock, step && stepCss.blockactive)}>
          <div className="text-2xl font-bold py-2">Step 2</div>
          <div className={stepCss.rounddot}></div>
          <div className={stepCss.title}>Snapshot</div>
          <div className={stepCss.text}>Sep 5, 2024 13:00 UTC</div>
        </div>
        <div className={stepCss.stepblock}>
          <div className="text-2xl font-bold py-2">Step 3</div>
          <div className={stepCss.rounddot}></div>
          <div className={stepCss.title}>Investment</div>
          <div className={stepCss.text}>Sep 7, 2024 13:00 UTC</div>
        </div>
        <div className={stepCss.stepblock}>
          <div className="text-2xl font-bold py-2">Step 4</div>
          <div className={stepCss.rounddot}></div>
          <div className={stepCss.title}>Claim</div>
          <div className={stepCss.text}>Sep 7, 2024 13:00 UTC</div>
        </div>
      </div>
    </div>
  );
};
// eslint-disable-next-line import/no-unused-modules
export default Step;
