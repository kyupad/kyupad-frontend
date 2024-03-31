import React from 'react';
import Image from 'next/image';
import Registration from '@/components/features/detail/registration';

import arrowLeft from '/public/images/detail/arrow-left.svg';
import bird from '/public/images/detail/bird.png';
import discord from '/public/images/detail/discord.svg';
import telegram from '/public/images/detail/telegram.svg';
import web from '/public/images/detail/web.svg';
import x from '/public/images/detail/x.svg';

function ProjectDetail() {
  return (
    <div className="pt-[60px]">
      <div className="max-w-8xl mx-auto px-4 lg:px-[60px] pt-5 flex items-center">
        <button>
          <Image src={arrowLeft} alt="Back" />
        </button>
      </div>
      <div className="max-w-8xl py-5 px-4 lg:px-[60px] mx-auto flex justify-between gap-5 items-center flex-col md:items-center md:flex-row">
        <div className="flex gap-5 items-center">
          <div>
            <Image
              className="max-w-[100px] sm:max-w-[150px] xl:max-w-[200px]"
              src={bird}
              alt="project logo"
              draggable={false}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-4xl xl:text-5xl font-bold xl:leading-[60px] line-clamp-2">
              Star Heroes
            </h1>
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold xl:leading-[48px] line-clamp-1">
              $STAR
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          <div className="flex gap-3 items-center">
            <div className="text-2xl font-bold">Social:</div>
            <div>
              <Image src={x} alt="X" draggable={false} />
            </div>
            <div>
              <Image src={discord} alt="Discord" draggable={false} />
            </div>
            <div>
              <Image src={telegram} alt="Telegram" draggable={false} />
            </div>
            <div>
              <Image src={web} alt="Web" draggable={false} />
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="px-4 py-2 rounded-[8px] bg-kyu-color-6 font-medium whitespace-nowrap">
              Perp DEX
            </div>
            <div className="px-4 py-2 rounded-[8px] bg-kyu-color-6 font-medium whitespace-nowrap">
              DeFi
            </div>
          </div>
        </div>
      </div>

      <Registration />
    </div>
  );
}

// eslint-disable-next-line import/no-unused-modules
export default ProjectDetail;
