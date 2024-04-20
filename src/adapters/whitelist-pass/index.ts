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

export { doGetMintingPool };
