import React, { memo } from 'react';
import Skeleton from '@/components/common/loading/skeleton';

function UpcomingLoading() {
  return (
    <div className="w-full">
      <div className="pb-10">
        <Skeleton className="h-[14px] sm:h-6 md:h-[30px] lg:h-9 w-1/3 mx-auto" />
      </div>
      <div className="flex gap-[45px] flex-col xl:flex-row justify-center items-center xl:items-stretch">
        {[...new Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex bg-[#FFF9EB] border-4 lg:p-10 border-button-primary-border rounded-[12px] shadow-[19px_18px_0px_0px_rgba(42,_39,_58,_0.1)] md:w-full lg:gap-10 lg:flex-row relative !flex-col !p-0 !gap-0 max-w-[410px] w-full"
          >
            <div className="lg:w-5/12 lg:p-0 flex gap-6 flex-col lg:order-1 !order-2 !w-full !pb-6 !pt-3 !px-6">
              <Skeleton className="h-5" />
              <Skeleton className="h-[180px] rounded-[24px]" />
              <Skeleton className="h-5 rounded-[24px]" />
              <Skeleton className="h-5 rounded-[24px]" />
              <Skeleton className="h-5 rounded-[24px]" />
              <Skeleton className="h-5 rounded-[24px]" />
              <Skeleton className="h-[48px] rounded-[8px]" />
            </div>
            <div className="lg:w-7/12 relative rounded-tl-[8px] rounded-tr-[8px] lg:rounded-[8px] overflow-hidden border-[#25252C] lg:order-2 lg:pb-0 lg:border-2 !order-1 !w-full !pb-[56.25%] !rounded-bl-none !rounded-br-none !border-b-4 !border-r-0 !border-l-0 !border-t-0">
              <Skeleton className="h-full w-full absolute" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="h-[56px] mt-8 w-[250px] mx-auto" />
    </div>
  );
}

export default memo(UpcomingLoading);
