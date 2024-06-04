import React, { memo } from 'react';
import Skeleton from '@/components/common/loading/skeleton';

function FurtureLoading() {
  return (
    <div className="w-full">
      <div className="pb-10">
        <Skeleton className="h-[14px] sm:h-6 md:h-[30px] lg:h-9 w-1/3 mx-auto" />
      </div>
      <div className="flex bg-[#FFF9EB] border-4 lg:p-10 border-button-primary-border rounded-[12px] shadow-[19px_18px_0px_0px_rgba(42,_39,_58,_0.1)] md:w-full lg:gap-10 flex-col lg:flex-row relative max-w-[410px] mx-auto lg:max-w-full">
        <div className="w-full lg:w-5/12 px-6 pb-6 pt-3 lg:p-0 flex gap-6 flex-col order-2 lg:order-1">
          <Skeleton className="h-5" />
          <Skeleton className="h-[180px] rounded-[24px]" />
          <Skeleton className="h-5 rounded-[24px]" />
          <Skeleton className="h-5 rounded-[24px]" />
          <Skeleton className="h-5 rounded-[24px]" />
          <Skeleton className="h-5 rounded-[24px]" />
          <Skeleton className="h-[48px] rounded-[8px]" />
        </div>
        <div className="lg:w-7/12 relative rounded-tl-[8px] rounded-tr-[8px] lg:rounded-[8px] overflow-hidden order-1 lg:order-2 pb-[56.25%] lg:pb-0">
          <Skeleton className="h-full w-full absolute" />
        </div>
      </div>

      <Skeleton className="h-[56px] mt-8 w-[250px] mx-auto" />
    </div>
  );
}

export default memo(FurtureLoading);
