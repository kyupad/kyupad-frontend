import React, { memo } from 'react';
import Image from 'next/image';

type Props = {
  image: string;
  CoinName: string;
  CoinSymbol: string;
  tradePlatform: string[];
};
const HeadDetail = ({ image, CoinName, CoinSymbol, tradePlatform }: Props) => {
  return (
    <div className="*:py-2 flex flex-row">
      <div className="flex gap-5 w-2/4">
        <Image src={image} alt="logo" width={200} height={200} priority />
        <div className="pt-7 w-full *:leading-relaxed">
          <h1 className="text-5xl font-bold">{CoinName}</h1>
          <span className="text-4xl font-bold">{CoinSymbol}</span>
        </div>
      </div>
      <div className="w-2/4 flex justify-center flex-col gap-5 items-end *:py-1">
        <div className="flex gap-2 items-center *:block font-bold ">
          <span className="text-2xl font-bold">Socials</span>
          <a href="#">
            <Image
              src={'/images/detail/X.svg'}
              alt="x"
              width={25}
              height={25}
            />
          </a>
          <a href="#">
            <Image
              src={'/images/detail/tele.svg'}
              className="h-auto w-auto aspect-square m-0 p-0"
              alt="telegram"
              width={25}
              height={25}
            />
          </a>
          <a href="#">
            <Image
              src={'/images/detail/web.svg'}
              alt="web"
              width={25}
              height={25}
            />
          </a>
          <a href="#">
            <Image
              src={'/images/detail/Discord.svg'}
              alt="x"
              width={25}
              height={25}
            />
          </a>
        </div>
        <p className="flex justify-between py-1 ">
          <span className="*:bg-[#D8D9DF] *:rounded-md flex gap-1 text-base items-center *:py-2 *:px-4 text-blue-500">
            {tradePlatform?.map((item: string) => (
              <span
                className="text-[#25252C] cursor-pointer font-medium"
                key={item}
              >
                {item}
              </span>
            ))}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(HeadDetail);
