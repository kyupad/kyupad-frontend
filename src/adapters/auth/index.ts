import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doRefreshToken = async ({ refresh_token }: { refresh_token: string }) => {
  const data = await request('POST', API_ROUTES.REFRESH, { refresh_token });
  return data;
};

export { doRefreshToken };
