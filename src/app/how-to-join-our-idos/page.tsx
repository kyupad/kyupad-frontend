import React from 'react';
import Image from 'next/image';
import { cn } from '@/utils/helpers';

import latDecorator from '/public/images/home/last-decorator.svg';
import howToJoinOurIDOs from '/public/images/how-to-join-our-idos/image.png';

function HowToJoinOurIDOs() {
  return (
    <>
      <div
        className={cn(
          'px-4 lg:px-[60px] py-5 mx-auto flex flex-col items-center gap-[100px]',
        )}
      >
        <div
          className={cn(
            'flex max-w-[1198px] gap-10 mt-[60px] flex-wrap justify-center items-center xl:justify-between w-full',
          )}
        >
          <Image
            src={howToJoinOurIDOs}
            alt="Kyupad - How To Join Our IDOs"
            draggable={false}
          />
        </div>
      </div>
      <Image
        src={latDecorator}
        alt="decorator"
        className="mx-auto w-full"
        draggable={false}
      />
    </>
  );
}

export default HowToJoinOurIDOs;
