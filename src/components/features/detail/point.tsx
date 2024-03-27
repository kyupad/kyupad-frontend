import React, { useContext } from 'react';
import { DetailContext, DetailContextProps } from '@/contexts/detai-context';
import { currencyFormatter } from '@/utils/helpers/currency';

import { Item, ModalItems } from './item';

const Point = () => {
  const { point, multiplier, totalAssetsConnected, paticipants } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <div className="*:py-3">
      <p className="text-4xl font-bold  text-[#18CF6A]">
        Great! You’ve been registered in the IDO!
      </p>
      <p className="text-2xl">
        <span className="font-bold ">Your Catnip Points is {point}.</span>{' '}
        Increase it to win more tickets and earn higher allocation
      </p>
      <ModalItems className=" mx-auto bg-[#EEEDF1] py-4 px-6 rounded-lg border-2 border-[#25252C]">
        <div className="flex justify-between">
          <Item title={'Your Catnip Points'} value={point} />
          <Item title={'Multipier'} value={multiplier} />
        </div>
        <div className="flex justify-between">
          <Item
            title={'Total Assets Connected'}
            value={currencyFormatter.format(totalAssetsConnected)}
          />
          <Item
            title={'Participants'}
            value={paticipants.toLocaleString('en-US')}
          />
        </div>
      </ModalItems>
    </div>
  );
};

export default Point;
