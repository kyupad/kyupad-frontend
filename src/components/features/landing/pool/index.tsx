import React from 'react';
import Image from 'next/image';

import PoolDetail from './pool-detail';
import UpcomingPool from './upcoming-pool';
import arrowLeft from '/public/images/home/arrow-left.svg';
import arrowRight from '/public/images/home/arrow-right.svg';

interface IPoolProps {
  title?: string;
  active?: boolean;
  data?: any[];
  upcoming?: boolean;
  paging?: boolean;
}

const Pool = ({ title, active, data, upcoming, paging }: IPoolProps) => {
  return (
    <div className="w-full">
      <h4 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-heading text-center text-button-primary-border pb-10">
        {title}
      </h4>

      {data && data.length > 0 ? (
        <div className="flex gap-[45px] flex-col xl:flex-row">
          {data
            .filter((pool, index) =>
              upcoming ? index < data.length - 1 : pool,
            )
            .map((item, index) => (
              <PoolDetail
                key={index}
                active={active}
                direction="column"
                ended_at={item?.ended_at}
              />
            ))}
          {upcoming && <UpcomingPool />}
        </div>
      ) : (
        <PoolDetail active={active} />
      )}

      {paging && (
        <div className="flex justify-center items-center gap-12 pt-8">
          <button className="p-4">
            <Image src={arrowLeft} alt="Previous" />
          </button>
          <div className="font-bold text-2xl">1/5</div>
          <button className="p-4">
            <Image src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pool;
