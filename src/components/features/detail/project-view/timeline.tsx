import React from 'react';

const Timeline = () => {
  return (
    <main className="relative min-h-screen py-5' justify-center bg-slate-50 overflow-hidden">
      <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">
        <div className="w-full  pl-[110px] mr-0">
          <div className="-my-6">
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex after:top-3 flex-col sm:flex-row after:content-['1'] items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-10 after:h-10 after:w-10  after:bg-[#25252C] after:flex after:justify-center after:items-center after:text-2xl after:text-[#FABF52] after:border-4 after:box-content after:border-slate-50 after:rounded-2xl sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute -left-24 top-5 translate-y-0.5 flex flex-col items-start w-fit justify-center font-bold text-2xl rounded-2xl">
                  <p>Registation</p>
                  <p>Period</p>
                </time>
                <div className="text-2xl font-bold text-slate-900 ml-6">
                  Sep 1, 2024 13:00 UTC - Sep 5, 2024 13:00 UTC
                </div>
              </div>

              <div className="text-[#5A5B6F] text-base ml-6">
                Participants must have at least $200 USDT tokens (Solana Chain)
                in their connected wallet. The more you engage on socials, the
                greater the chances of winning. Create an account to make the
                checkout process during the lottery phase smoother.
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex after:top-3 flex-col sm:flex-row after:content-['2'] items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-10 after:h-10 after:w-10  after:bg-[#25252C] after:flex after:justify-center after:items-center after:text-2xl after:text-[#FABF52] after:border-4 after:box-content after:border-slate-50 after:rounded-2xl sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute -left-24 top-5 translate-y-0.5 flex flex-col items-start w-fit justify-center font-bold text-2xl rounded-2xl">
                  <p>Snapshot</p>
                  <p>Period</p>
                </time>{' '}
                <div className="text-2xl font-bold text-slate-900 ml-6">
                  Sep 5, 2024 13:00 UTC - 18:00 UTC
                </div>
              </div>
              <div className="text-[#5A5B6F] text-base ml-6">
                <ul className="list-disc ml-5">
                  <li>Hold min. $200 USDT tokens (Solana Chain)</li>
                  <li>
                    The snapshot will take place at 13:00 UTC on Sep 5, 2024
                  </li>
                  <li>
                    Failure to maintain this balance during the Snapshot Period
                    will result in ineligibility.
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex after:top-3 flex-col sm:flex-row after:content-['3'] items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-10 after:h-10 after:w-10  after:bg-[#25252C] after:flex after:justify-center after:items-center after:text-2xl after:text-[#FABF52] after:border-4 after:box-content after:border-slate-50 after:rounded-2xl sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute -left-24 top-5 translate-y-0.5 flex flex-col items-start w-fit justify-center font-bold text-2xl rounded-2xl">
                  <p>Investment</p>
                  <p>Period</p>
                </time>{' '}
                <div className="text-2xl font-bold text-slate-900 ml-6">
                  Sep 5, 2024 18:00 UTC - 23:00 UTC
                </div>
              </div>
              <div className="text-[#5A5B6F] text-base ml-6">
                {
                  "Kyupad uses a smart contract to randomly select tickets, making it fair for all applicants to win token allocations. At this time, you'll be able to check your participation to see if you're a winner. You can only use USDT to invest. Remember to engage on Twitter/X to increase your chances."
                }
              </div>
            </div>

            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex after:top-3 flex-col sm:flex-row after:content-['4'] items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-10  after:h-10 after:w-10  after:bg-[#25252C] after:flex after:justify-center after:items-center after:text-2xl after:text-[#FABF52] after:border-4 after:box-content after:border-slate-50 after:rounded-2xl sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                <time className="sm:absolute -left-24 top-5 translate-y-0.5 flex flex-col items-start w-fit justify-center font-bold text-2xl rounded-2xl">
                  <p>Claim</p>
                  <p>Period</p>
                </time>{' '}
                <div className="text-2xl font-bold text-slate-900 ml-6">
                  Sep 9, 2024 13:00 UTC
                </div>
              </div>
              <div className="text-[#5A5B6F] text-base ml-6">
                Participants selected in the token allocation lottery can check
                their allocation and redeem tokens before the Redemption
                Deadline.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Timeline;
