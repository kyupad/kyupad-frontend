import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { ButtonCustom } from '@/components/common/button';
import { ContexType, detailContext } from '@/components/features/detail';

const CountdownTimer = dynamic(() => import('@/utils/helpers/countdownTimer'), {
  ssr: false,
});

const RegisterElement = () => {
  // @ts-ignore
  const {
    registration,
    handleRegisted,
    handleChangeRegisterStatus,
    handleChangeView,
  } = useContext<ContexType | any>(detailContext);
  console.warn('registration', registration.registed);
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
        disabled={registration.status}
        onClick={registration.registed ? handleChangeView : handleRegisted}
      >
        {!registration.status
          ? !registration.registed
            ? 'register Now'
            : 'View Registration'
          : 'Registation Ended'}
      </ButtonCustom>
    </div>
  );
};

export default RegisterElement;
