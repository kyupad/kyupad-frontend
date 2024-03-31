import React, { memo } from 'react';

const data = [
  {
    step: 'Registration period',
    time: 'Sep 1, 2024 13:00 UTC - Sep 5, 2024 13:00 UTC',
    description:
      'Participants must have at least $200 USDT tokens (Solana Chain) in their connected wallet. The more you engage on socials, the greater the chances of winning. Create an account to make the checkout process during the lottery phase smoother.',
  },

  {
    step: 'Snapshot period',
    time: 'Sep 5, 2024 13:00 UTC - 18:00 UTC',
    list: [
      'Hold min. $200 USDT tokens (Solana Chain)',
      'The snapshot will take place at 13:00 UTC on Sep 5, 2024',
      'Failure to maintain this balance during the Snapshot Period will result in ineligibility.',
    ],
  },

  {
    step: 'Investment period',
    time: 'Sep 5, 2024 18:00 UTC - 23:00 UTC',
    description: `Kyupad uses a smart contract to randomly select tickets, making it fair for all applicants to win token allocations. At this time, you'll be able to check your participation to see if you're a winner. You can only use USDT to invest. Remember to engage on Twitter/X to increase your chances.`,
  },

  {
    step: 'Claim period',
    time: 'Sep 9, 2024 13:00 UTC',
    description: `Participants selected in the token allocation lottery can check their allocation and redeem tokens before the Redemption Deadline.`,
  },
];

function Timeline() {
  return (
    <div className="flex gap-10 flex-row justify-items-start">
      <div className="text-xl sm:text-2xl font-bold flex flex-col gap-[60px] justify-between">
        {data.map((item) => (
          <div key={item.step}>{item.step}</div>
        ))}
      </div>

      <div className="relative">
        <div className="w-[1px] h-full bg-kyu-color-11" />
        <div className="absolute top-0 -left-[22px] h-full flex flex-col justify-between gap-[60px]">
          {data.map((item, index) => (
            <div
              className="size-[44px] rounded-[16px] bg-kyu-color-11 text-kyu-color-4 text-2xl font-bold flex justify-center items-center"
              key={item.step}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-[60px]">
        {data.map((item) => (
          <div key={item.step} className="flex flex-col gap-3">
            <time className="text-xl sm:text-2xl font-bold">{item.time}</time>
            {item?.description && (
              <div className="font-medium">{item.description}</div>
            )}
            {item?.list && (
              <ul className="pl-4 font-medium">
                {item.list.map((listItem) => (
                  <li key={listItem} className="list-disc">
                    {listItem}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Timeline);
