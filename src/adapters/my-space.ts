import { API_ROUTES } from '@/utils/constants';

import { request } from './xhr';

const doGetMyParticipationsClient = async (signal?: AbortSignal) => {
  const data = await request(
    'GET',
    API_ROUTES.GET_MY_PARTICIPATIONS,
    undefined,
    {
      cache: 'no-store',
      signal,
    },
  );

  return data;
};

export { doGetMyParticipationsClient };
