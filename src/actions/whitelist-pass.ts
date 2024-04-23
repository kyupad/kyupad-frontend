import { cookies } from 'next/headers';
import { request } from '@/adapters';
import { API_ROUTES } from '@/utils/constants';

import 'server-only';

const doGetSeasonActive = async () => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();
  const data = await request('GET', API_ROUTES.GET_SEASON_ACTIVE, undefined, {
    headers: {
      Cookie: cookieStr,
    },
    cache: 'no-store',
  });

  return data;
};

export { doGetSeasonActive };
