import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import ButtonCustom from '@/components/common/button/button-custom';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';

const CountdownTimer = dynamic(() => import('@/utils/helpers/countdownTimer'), {
  ssr: false,
});

const RegisterElement = () => {
  const {
    registration,
    handleRegisted,
    handleChangeRegisterStatus,
    handleChangeView,
    registedView,
  } = useContext<DetailContextProps>(DetailContext);

  return (
    <div className="flex justify-between  w-full py-9 items-center text-2xl font-bold">
      <span className="flex gap-3">
        Registation Ends in:{' '}
        <CountdownTimer
          action={handleChangeRegisterStatus}
          time={registration.timer}
        />
      </span>
      <ButtonCustom
        disabled={registration.timeEnded || registedView}
        onClick={registration.registed ? handleChangeView : handleRegisted}
      >
        {!registration.timeEnded
          ? !registration.registed
            ? 'Register Now'
            : registedView
              ? 'Registed'
              : 'View Registration'
          : 'Registation Ended'}
      </ButtonCustom>
    </div>
  );
};

export default RegisterElement;
