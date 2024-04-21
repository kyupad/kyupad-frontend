import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doGetMintingPool = async ({
  pool_id,
  wallet,
}: {
  pool_id?: string;
  wallet?: string;
}) => {
  const data = await request('GET', API_ROUTES.GET_MINTING_POOL, {
    pool_id,
    wallet,
  });
  return data;
};

const doGenerateMetadata = async (body: {
  id: string;
  name: string;
  symbol: string;
  description?: string;
  seller_fee_basis_points: number;
  creators?: string[];
}) => {
  const data = await request('POST', API_ROUTES.GENERATE_CFNT_METADATA, body);
  return data;
};

export { doGetMintingPool, doGenerateMetadata };
