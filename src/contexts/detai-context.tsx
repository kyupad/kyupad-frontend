/* eslint-disable import/no-unused-modules */
import { createContext } from 'react';
import { DetailDataTypes } from '@/components/features/detail/types';

export interface DetailContextProps extends DetailDataTypes {
  handleRegisted: () => void;
  handleInvested: () => void;
  handleChangeRegisterStatus: () => void;
  handleChangeInvestmentStatus: () => void;
  handleChangeView: () => void;
  handleChangeSnapshotStatus: () => void;
  registedView?: boolean;
}

export const DetailContext = createContext<DetailContextProps>(
  {} as DetailContextProps,
);
export default DetailContext;
