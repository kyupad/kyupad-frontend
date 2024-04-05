import React, { memo } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import Back from '../registration/back';
import winningCatTmp from '/public//images//detail//winning-cat-tmp.png';
import infoIcon from '/public/images/detail/info-icon.svg';
import percentWining from '/public/images/detail/percent-winning.svg';
import viewRegistrationDeco from '/public/images/detail/view-registration-decor.svg';

dayjs.extend(utc);

interface IViewSnapshotProps {
  data: any;
}

function ViewSnapshot({ data }: IViewSnapshotProps) {
  return (
    <>
      <div className="w-full max-w-8xl mx-auto px-4 lg:px-[60px] flex gap-4 pb-[210px] items-center justify-center flex-col lg:flex-row">
        <div className="flex flex-col gap-4 w-full">
          <Back />
          <div className="flex gap-5 items-center">
            <div>
              <Image
                className="max-w-[100px] sm:max-w-[150px] xl:max-w-[200px] rounded-full"
                src={data?.logo}
                width={200}
                height={200}
                alt="project logo"
                draggable={false}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold xl:leading-[60px] line-clamp-2">
                {data?.name || 'Project A'}
              </h1>
              <p className="text-xl sm:text-3xl xl:text-4xl font-bold xl:leading-[48px] line-clamp-1">
                ${data?.symbol || 'XXX'}
              </p>
            </div>
          </div>

          <h2 className="text-4xl font-bold text-kyu-color-17">
            Snapshot is in progress!
          </h2>

          <div className="flex items-center gap-5">
            <span className="text-2xl font-bold">
              You have <span className="text-kyu-color-18">low</span> chance of
              winning
            </span>
            <span>
              <Image src={infoIcon} alt="icon" />
            </span>
          </div>

          <div>
            <Image src={percentWining} alt="percent winning" />
          </div>

          <div className="text-2xl font-bold">
            The process will take 6 hours, please wait for the results
          </div>

          <div className="p-4 lg:p-10 bg-kyu-color-16 border-2 border-kyu-color-10 rounded-[16px] flex gap-4 flex-col lg:max-w-[704px]">
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Total Assets Connected</span>
              <span className="text-2xl font-bold">$11,232,657.13</span>
            </div>
            <div className="flex gap-4 justify-between items-center">
              <span className="text-xl">Participants</span>
              <span className="text-2xl font-bold">11,342</span>
            </div>
          </div>
        </div>
        <div className="lg:w-full">
          <Image src={winningCatTmp} alt="cAt" />
        </div>
      </div>

      <Image
        src={viewRegistrationDeco}
        alt="decorator"
        className="mx-auto w-full absolute bottom-0 -z-[1]"
        draggable={false}
      />
    </>
  );
}

export default memo(ViewSnapshot);
