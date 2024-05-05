import React from 'react';
import Image from 'next/image';

import PoolDetail from './pool-detail';
import UpcomingPool from './upcoming-pool';
import arrowLeft from '/public/images/home/arrow-left.svg';
import arrowRight from '/public/images/home/arrow-right.svg';

interface IPoolProps {
  title?: string;
  pagination?: any;
  mode: 'upcoming' | 'active' | 'success';
  direction?: 'row' | 'column';
  data?: any[];
  revalidatePath?: Function;
}

const Pool = ({
  title,
  pagination,
  mode,
  direction = 'column',
  data,
  revalidatePath,
}: IPoolProps) => {
  return (
    <div className="w-full">
      <h4 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-heading text-center text-button-primary-border pb-10">
        {title}
      </h4>

      <div className="flex gap-[45px] flex-col xl:flex-row justify-center items-center xl:items-stretch">
        {data?.map((item: any) => (
          <PoolDetail
            key={item.id}
            direction={direction}
            data={item}
            mode={mode}
            revalidatePath={revalidatePath}
          />
        ))}
        {mode === 'upcoming' &&
          data &&
          data?.length > 0 &&
          data?.length < 3 && <UpcomingPool />}
      </div>

      {pagination?.total > 1 && (
        <div className="flex justify-center items-center gap-12 pt-8">
          <button
            disabled={pagination?.page === 1}
            className="p-4"
            onClick={() => {
              pagination?.handleNext && pagination.handleNext();
            }}
          >
            <Image src={arrowLeft} alt="Previous" />
          </button>
          <div className="font-bold text-2xl">
            {pagination?.page}/{pagination?.total}
          </div>
          <button
            disabled={pagination?.page === pagination?.total}
            className="p-4"
            onClick={() => {
              pagination?.handlePrevious && pagination.handlePrevious();
            }}
          >
            <Image src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pool;
