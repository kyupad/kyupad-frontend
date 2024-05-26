import React, { memo } from 'react';
import Skeleton from '@/components/common/loading/skeleton';

function MyInvestmentsLoading() {
  return (
    <div className="px-4 py-10 sm:p-10 border-2 border-kyu-color-10 rounded-[16px] max-w-[1080px] mx-auto flex gap-6 flex-col overflow-x-auto">
      {[...Array(5)].map((_: any, index: number) => (
        <div
          key={index}
          className="flex items-center justify-between gap-[100px]"
        >
          <div className="flex items-center gap-4">
            <Skeleton className="max-w-16 min-w-16 min-h-16 rounded-[100px]" />
            <div className="font-bold text-2xl whitespace-nowrap">
              <Skeleton className="w-[200px] h-[32px]" />
            </div>
          </div>
          <div className="flex items-center gap-[100px]">
            <div className="text-2xl whitespace-nowrap">
              <Skeleton className="w-[200px] h-[32px]" />
            </div>
            <Skeleton className="w-[200px] h-[32px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(MyInvestmentsLoading);
