import React, { useContext } from 'react';
import Image from 'next/image';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import { Item, ModalItems } from '@/components/features/detail/item';
import { currencyFormatter } from '@/utils/helpers/currency';

const Snapshot = () => {
  const { image, coinName, coinSymbol, totalAssetsConnected, paticipants } =
    useContext<DetailContextProps>(DetailContext);
  return (
    <div className="flex flex-row justify-center items-center px-3 gap-9 ">
      <div className="flex flex-col gap-4 flex-auto max-w-[704px] w-full">
        <div className="flex gap-5 ">
          <Image src={image} alt="logo" width={200} height={200} />
          <div className="pt-7 w-full *:leading-relaxed">
            <h1 className="text-5xl font-bold">{coinName}</h1>
            <span className="text-4xl font-medium">{coinSymbol}</span>
          </div>
        </div>
        <h2 className="font-bold text-4xl text-[#18CF6A]">
          Snapshot is in progress!
        </h2>
        <p className="font-bold text-2xl">
          The process will take 6 hours, please wait for the results
        </p>
        <ModalItems className="border-2 border-black rounded-md bg-[#EEEDF1] p-3 w-full">
          <Item
            title="Total Assets Connected"
            value={currencyFormatter.format(totalAssetsConnected)}
            className="w-full "
          />
          <Item
            title="Paticipants"
            value={paticipants.toLocaleString('en-US')}
            className="w-full"
          />
        </ModalItems>
      </div>
      <Image
        src={'/images/detail/happy-cat.svg'}
        className="inline-block "
        alt="sad cat"
        width={600}
        height={600}
      />
    </div>
  );
};

export default Snapshot;
