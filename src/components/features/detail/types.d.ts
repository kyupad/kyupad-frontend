import { title } from 'process';

export type DetailDataTypes = {
  image: string;
  coinName: string;
  coinSymbol: string;
  tradePlatform: string[];
  point: number;
  multiplier: string;
  totalAssetsConnected: number;
  description: string;
  paticipants: number;
  totalRaised: number;
  tokenOffered: number;
  priceTransfer: number;
  ticketSize: number;
  changeOfWinning: number;
  numberOfWinners: number;
  totalWinners: number;
  totalTickets: number;
  step: string;
  stepInfo: {
    id: string;
    step: string;
    title: string;
    datetime: string;
    description: string;
  }[];
  registration: {
    timer: string;
    registed: boolean;
    timeEnded: boolean;
  };
  snapshot: {
    timer: string;
  };
  investment: {
    timer: string;
    invested: boolean;
    timeEnded: boolean;
    status: boolean;
  };
  claim: {
    timer: string;
    claimed: boolean;
  };
  NumOfCoin: number;
  tge: string;
  vestingType: string;
  totalInvested: number;
  totalTokenReceived: number;
  claimPeiod: {
    date: string;
    tokenAmount: string;
    txid: string;
  }[];
};
