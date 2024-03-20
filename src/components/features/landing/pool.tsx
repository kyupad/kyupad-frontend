import React from 'react';

import PoolDetail from './pool-detail';

interface IPoolProps {
  title?: string;
  active?: boolean;
  data?: any[];
}

const Pool = ({ title, active, data }: IPoolProps) => {
  return (
    <div className="w-full">
      <h4 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-heading text-center text-button-primary-border pb-10">
        {title}
      </h4>

      {data && data.length > 0 ? (
        <div className="flex gap-[45px] flex-col xl:flex-row">
          {data.map((item, index) => (
            <PoolDetail
              key={index}
              active={active}
              direction="column"
              ended_at={item?.ended_at}
            />
          ))}
        </div>
      ) : (
        <PoolDetail active={active} />
      )}
    </div>
  );
};

export default Pool;
