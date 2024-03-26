import React, { useContext } from 'react';
import Image from 'next/image';
import ButtonCustom from '@/components/common/button/button-custom';
import {
  DetailContext,
  DetailContextProps,
} from '@/components/common/context/detai-context';
import HeadDetail from '@/components/features/detail/head-detail';
import { Item, ModalItems } from '@/components/features/detail/item';

const InvesmentView = () => {
  const {
    image,
    coinName,
    coinSymbol,
    tradePlatform,
    totalInvested,
    totalTokenReceived,
    vestingType,
    tge,
    claimPeiod,
  } = useContext<DetailContextProps>(DetailContext);

  return (
    <div className="py-5 w-full">
      <HeadDetail
        image={image}
        CoinName={coinName}
        CoinSymbol={coinSymbol}
        tradePlatform={tradePlatform}
      />
      <h2 className="text-4xl font-bold text-[#18CF6A] py-2">
        Congrats! You are receiving {totalTokenReceived} STAR
      </h2>
      <p className="text-2xl py-2">
        You are one of the winners, lock in your place by being the first to
        invest.
      </p>
      <ModalItems className="border-2 border-black rounded-md bg-[#EEEDF1] p-3 w-full mt-6">
        <div className="flex justify-evenly">
          <Item
            title="Total Invested"
            value={totalInvested.toLocaleString('en-US') + ' USDT'}
            valueClassName="text-[#F2820E]"
          />
          <Item
            title="Total Token Received"
            value={totalTokenReceived.toLocaleString('en-US') + ' STAR'}
            valueClassName="text-[#F2820E]"
          />
        </div>
        <div className="flex justify-evenly">
          <Item title="TGE" value={tge} />
          <Item title="Vesting Type" value={vestingType} />
        </div>
      </ModalItems>
      <div className="flex justify-end py-5">
        <ButtonCustom>Claim now</ButtonCustom>
      </div>
      <div className="flex relative">
        <div className="w-8/12">
          <h2 className="text-3xl font-bold">Claim Period</h2>
          <table className="w-full overflow-hidden border-2  boder-solid border-[#31313A] !rounded-lg border-separate border-spacing-0 my-4">
            <thead className="bg-[#FDEDC8] ">
              <tr className="*:py-2 *:text-xl font-bold">
                <th className="rounded-tl-lg">Date</th>
                <th>Token Amount</th>
                <th className="rounded-tr-lg">TXID</th>
              </tr>
            </thead>
            <tbody className="bg-[#F7F7F8]">
              {claimPeiod.length &&
                claimPeiod?.map(
                  (
                    item: { date: string; tokenAmount: string; txid: string },
                    index: number,
                  ) => (
                    <tr key={index} className="*:text-center *:py-3 *:text-xl">
                      <td>{item.date}</td>
                      <td>{item.tokenAmount}</td>
                      <td className="underline">{item.txid}</td>
                    </tr>
                  ),
                )}
            </tbody>
          </table>
        </div>
        <Image
          src="images/detail/cat-pilot.svg"
          className="absolute -right-48"
          width={517}
          height={353}
          alt="pilot cat"
        />
      </div>
    </div>
  );
};

export default InvesmentView;
