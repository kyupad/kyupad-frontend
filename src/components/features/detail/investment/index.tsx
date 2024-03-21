import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { ButtonCustom } from '@/components/common/button';
import { ContexType, detailContext } from '@/components/features/detail';

import { Item, ModalItems } from '../item';

const CountdownTimer = dynamic(() => import('@/utils/helpers/countdownTimer'), {
  ssr: false,
});

const Investment = () => {
  const {
    // @ts-ignore
    image,
    coinName,
    coinSymbol,
    investment,
    totalWinners,
    ticketSize,
    numberOfWinners,
    totalTickets,
    handleChangeInvestmentStatus,
    handleInvested,
  } = useContext<ContexType | any>(detailContext);
  return (
    <div className="flex flex-row justify-center items-center p-3 ">
      <div className="flex flex-col gap-4 flex-auto">
        <div className="flex gap-5 ">
          <Image src={image} alt="logo" width={200} height={200} quality={1} />
          <div className="pt-7 w-full *:leading-relaxed">
            <h1 className="text-5xl font-bold">{coinName}</h1>
            <span className="text-4xl font-medium">{coinSymbol}</span>
          </div>
        </div>
        {investment.status ? (
          <>
            {!investment.timeEnded ? (
              <>
                <h2 className="font-bold text-4xl text-[#18CF6A]">
                  Congrats! You’ve won a ticket in the IDO!
                </h2>
                <p className="font-medium text-2xl">
                  You are one of the winners, lock in your place by being the
                  first to invest.
                </p>
              </>
            ) : (
              <div className="max-w-[534px] *:py-2">
                <h2 className="font-bold text-4xl text-[#F8A627]">
                  Ops! The Investment has Ended, See you in the next time!
                </h2>
                <p className="font-medium text-2xl">
                  {
                    "To ensure it's sold out, we have 3x the number of winners, so the investment phase will happen in the 'First come first served' (FCFS) method."
                  }
                </p>
              </div>
            )}
            <ModalItems className="border-2 border-black rounded-md bg-[#EEEDF1] p-3 w-3/4">
              <Item
                title="Number of winning tickets"
                value={numberOfWinners}
                className="w-full"
                valueClassName="text-[#F2820E]"
              />
              <Item
                title="Total Winners"
                value={totalWinners}
                className="w-full "
              />
              <Item
                title="Ticket size"
                value={ticketSize}
                className="w-full"
                valueClassName="text-[#F2820E]"
              />
              <Item
                title="Total ticket"
                value={totalTickets}
                className="w-full"
              />
            </ModalItems>
            <span className="flex gap-3 text-2xl font-bold">
              Registation Ends in:{' '}
              <CountdownTimer
                action={handleChangeInvestmentStatus}
                time={investment.timer}
              />
            </span>
            <ButtonCustom
              disabled={investment.timeEnded || investment.invested}
              onClick={handleInvested}
            >
              {!investment.timeEnded
                ? !investment.invested
                  ? 'Invest Now'
                  : 'Invested'
                : 'Invest Ended'}
            </ButtonCustom>
          </>
        ) : (
          <>
            <h2 className="font-bold text-4xl text-[#F8A627]">Keep trying!</h2>
            <p className="text-2xl font-bold py-2">
              We are rooting for you in your future endeavors as there are many
              exciting projects awaiting you.
            </p>
            <ButtonCustom>Explorer other IDO</ButtonCustom>
          </>
        )}
      </div>
      {investment?.status && !investment?.timeEnded ? (
        <Image
          src={'/images/detail/prettyCat.svg'}
          className="inline-block "
          alt="sad cat"
          width={600}
          height={600}
        />
      ) : (
        <Image
          src={'/images/detail/sadCat.svg'}
          className="inline-block "
          alt="sad cat"
          width={600}
          height={600}
        />
      )}
    </div>
  );
};
export default Investment;
