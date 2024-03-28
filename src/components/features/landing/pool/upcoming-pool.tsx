import React, { memo } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helpers';
import catUpcoming from 'public/images/home/cat-upcoming.png';

function UpcomingPoll() {
  return (
    <div
      className={cn(
        'flex bg-[#FFF9EB] border-4 border-button-primary-border rounded-[12px] shadow-[19px_18px_0px_0px_rgba(42,_39,_58,_0.1)] md:w-full lg:gap-10 flex-col relative p-0 gap-0 justify-center items-center min-h-[700px]',
      )}
    >
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold">Upcoming</span>
        <span className="text-4xl font-bold">+9 Projects</span>
      </div>
      <div className="max-w-[333px]">
        <Image src={catUpcoming} alt="Upcoming" draggable={false} />
      </div>
    </div>
  );
}

export default memo(UpcomingPoll);
