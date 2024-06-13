'use client';

import React, { memo, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import Skeleton from '@/components/common/loading/skeleton';
import Slide from '@/components/common/slide';

import vector from '/public/images/home/vector.png';

type ChooseWinnerProps = {
  title: string;
  image: string | StaticImageData;
  description: string;
};
const ChooseWinner = ({ data }: { data: ChooseWinnerProps[] }) => {
  const [isMobile, setIsMobile] = React.useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 800);
      }
    };
    window.addEventListener('resize', () => {
      handleResize();
    });
    handleResize();
    return () => {
      window.removeEventListener('resize', () => {
        handleResize();
      });
    };
  }, []);
  if (isMobile === null) {
    return (
      <div className=" border-4 border-black rounded-xl bg-kyu-color-1 flex flex-col justify-between p-5 h-64 md:h-80 w-[95%] md:w-[80%] md:my-20 mx-auto ">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-10 w-2/4" />
        <div>
          <Skeleton className="h-10 w-5/6" />
          <Skeleton className="h-10 w-5/6 mt-1" />
        </div>
      </div>
    );
  }
  return (
    <>
      {!isMobile ? (
        <div className="flex gap-4 flex-col md:flex-row xl:gap-24 px-4 justify-center sm:my-6 lg:my-16">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex hover:bg-kyu-color-2 duration-500 hover:shadow-sm relative shadow-[9px_8px_0px_0px_rgba(0,0,0,0.1)] lg:shadow-[19px_18px_0px_0px_rgba(0,0,0,0.1)] flex-col items-start sm:gap-4 md:w-[30%] xl:w-[372px] h-72 rounded-xl p-5 border-4 border-kyu-color-11 bg-kyu-color-1 "
            >
              {index < data.length - 1 ? (
                <Image
                  src={vector}
                  alt="vector"
                  className="absolute hidden xl:block -right-[104px] top-[30%]"
                />
              ) : null}
              <div className="text-2xl font-heading text-center relative ">
                <Image
                  src={item.image}
                  className="max-w-10 lg:max-w-20"
                  alt="guard"
                />
              </div>
              <div className="lg:my-4 text-2xl  font-bold">{item.title}</div>
              <div className="text-kyu-color-8">{item.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <Slide showCount infinite autoPlay>
          {data.map((item, index) => (
            <div
              key={index}
              className="flex px-3 mt-3 hover:bg-kyu-color-2 duration-500 hover:shadow-sm relative shadow-[9px_8px_0px_0px_rgba(0,0,0,0.1)] flex-col items-start h-auto min-h-[250px] rounded-xl p-5 border-4 border-kyu-color-11 bg-kyu-color-1 "
            >
              <div className="text-2xl font-heading text-center relative ">
                <Image src={item.image} className="max-w-10" alt="guard" />
              </div>
              <div className="my-4 text-2xl font-bold">{item.title}</div>
              <div className="text-kyu-color-8">{item.description}</div>
            </div>
          ))}
        </Slide>
      )}
    </>
  );
};

export default memo(ChooseWinner);
