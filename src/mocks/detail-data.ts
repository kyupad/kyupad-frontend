import { DetailDataTypes } from '@/components/features/detail/types';

const initData: DetailDataTypes = {
  image: '/images/detail/starhero.png',
  coinName: 'StarHeroes',
  coinSymbol: '$STAR',
  tradePlatform: ['Perp DEX', 'DeFi'],
  point: 0.31,
  multiplier: '1x',
  totalAssetsConnected: 11232657.13,
  description:
    'Dive into intense multiplayer battles in the most competitive space shooter ever! Developed by industry veterans from Cyberpunk 2077, the Witcher, and Ubisoft- Powered by GameSwift and a Microsoft grant, with 400k * pre - registered players!',
  paticipants: 11342,
  totalRaised: 1000000,
  tokenOffered: 100000000,
  priceTransfer: 0.1,
  ticketSize: 300,
  changeOfWinning: 1,
  numberOfWinners: 1,
  totalWinners: 3000,
  totalTickets: 1000,
  step: 'registration', // step of the process
  registration: {
    timer: '2024-03-27T10:34:00',
    registed: false, // trạng thái đã đăng ký
    status: false, // trạng thái thời gian đăng ký
  },
  snapshot: {
    timer: '2024-03-28T18:00:00',
  },
  investment: {
    timer: '2024-03-29T18:00:00',
    invested: false, // trạng thái đã đầu tư
    timeEnded: false, // trạng thái thời gian đầu tư
    status: true, // trạng thái investment
  },
  claim: {
    timer: '2024-03-30T18:00:00',
    claimed: false,
  },
  stepInfo: [
    {
      id: 'registration',
      step: 'Step 1',
      title: 'Registration',
      datetime: '2024-03-27T10:34:00',
      description:
        'Participants must have at least $200 USDT tokens (Solana Chain) in their connected wallet. The more you engage on socials, the greater the chances of winning. Create an account to make the checkout process during the lottery phase smoother.',
    },
    {
      id: 'snapshot',
      step: 'Step 2',
      title: 'Snapshot',
      datetime: '2024-03-28T18:00:00',
      description:
        ' <ul style="list-style-type: disc; padding-left: 20px"> <li>Hold min. $200 USDT tokens (Solana Chain)</li> <li> The snapshot will take place at 13:00 UTC on Sep 5, 2024</li><li>Failure to maintain this balance during the Snapshot Period will result in ineligibility.</li> </ul>',
    },
    {
      id: 'invensment',
      step: 'Step 3',
      title: 'Investment',
      datetime: '2024-03-29T18:00:00',
      description:
        "Kyupad uses a smart contract to randomly select tickets, making it fair for all applicants to win token allocations. At this time, you'll be able to check your participation to see if you're a winner. You can only use USDT to invest. Remember to engage on Twitter/X to increase your chances.",
    },
    {
      id: 'claim',
      step: 'Step 4',
      title: 'Claim',
      datetime: '2024-03-30T18:00:00',
      description:
        'Participants selected in the token allocation lottery can check their allocation and redeem tokens before the Redemption Deadline.',
    },
  ],
  NumOfCoin: 1000,
  tge: '15%',
  vestingType: 'Linear',
  totalInvested: 10000,
  totalTokenReceived: 100000,
  claimPeiod: [
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
    {
      date: '2022-10-10',
      tokenAmount: '1000',
      txid: '0x1234567890',
    },
  ],
};

export { initData };
