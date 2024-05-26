import { cookies } from 'next/headers';
import { request } from '@/adapters';
import { API_ROUTES } from '@/utils/constants';

import 'server-only';

const doGetMyInvestments = async () => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();
  const data = await request('GET', API_ROUTES.GET_MY_INVESTMENTS, undefined, {
    headers: {
      Cookie: cookieStr,
    },
    cache: 'no-store',
  });

  return data;
};

const doGetMyParticipations = async () => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();
  const data = await request(
    'GET',
    API_ROUTES.GET_MY_PARTICIPATIONS,
    undefined,
    {
      headers: {
        Cookie: cookieStr,
      },
      cache: 'no-store',
    },
  );

  return data;
};

export { doGetMyInvestments, doGetMyParticipations };
