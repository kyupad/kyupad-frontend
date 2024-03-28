type PortfolioProps = {
  walletAddress: string;
  wallet: number;
  investments: {
    image: string;
    potocol: string;
    claim: number;
    symbol: string;
  }[];
  paticipants: {
    image: string;
    potocol: string;
    symbol: string;
    status: {
      title: string;
      color: string;
    };
  }[];
};

const mockPortfolioData: PortfolioProps = {
  walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
  wallet: 133943.1,
  investments: [
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      claim: 10000,
      symbol: '$BPT',
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      claim: 10000,
      symbol: '$BPT',
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      claim: 10000,
      symbol: '$BPT',
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      claim: 10000,
      symbol: '$BPT',
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      claim: 10000,
      symbol: '$BPT',
    },
  ],
  paticipants: [
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      symbol: '$BPT',
      status: {
        title: 'Ended',
        color: '#EC5347',
      },
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      symbol: '$BPT',
      status: {
        title: 'Ongoing',
        color: '#18CF6A',
      },
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      symbol: '$BPT',
      status: {
        title: 'Ongoing',
        color: '#18CF6A',
      },
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      symbol: '$BPT',
      status: {
        title: 'Ended',
        color: '#EC5347',
      },
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',

      symbol: '$BPT',
      status: {
        title: 'Won',
        color: '#F8A627',
      },
    },
    {
      image: '/images/home/robot.webp',
      potocol: 'Bunny Protocol',
      symbol: '$BPT',
      status: {
        title: 'Won',
        color: '#F8A627',
      },
    },
  ],
};
export type { PortfolioProps };
export { mockPortfolioData };
