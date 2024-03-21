import React from 'react';

import { Item, ModalItems } from './item';

const Point = () => {
  const point = {
    points: '0.32',
    mutipier: '1.5x',
    totalAssets: '$11,343,335',
    patixipaint: '11,342',
  };
  return (
    <div className="*:py-3">
      <p className="text-4xl font-bold  text-[#18CF6A]">
        Great! You’ve been registered in the IDO!
      </p>
      <p className="text-2xl">
        <span className="font-bold ">
          Your Catnip Points is {point.points}.
        </span>{' '}
        Increase it to win more tickets and earn higher allocation
      </p>
      <ModalItems className=" mx-auto bg-[#EEEDF1] py-4 rounded-sm border-2 border-[#25252C]">
        <div className="flex justify-around">
          <Item title={'Your Catnip Points'} value={point.points} />
          <Item title={'Multipier'} value={point.mutipier} />
        </div>
        <div className="flex justify-around">
          <Item title={'Total Assets Connected'} value={point.totalAssets} />
          <Item title={'Participants'} value={point.patixipaint} />
        </div>
      </ModalItems>
    </div>
  );
};

export default Point;
