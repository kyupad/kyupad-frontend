import { cookies } from 'next/headers';
import { request } from '@/adapters';
import { API_ROUTES } from '@/utils/constants';

import 'server-only';

const doGetProjectDetail = async (slug: string) => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECT_DETAIL.replace('[slug]', slug),
    undefined,
    {
      headers: {
        Cookie: cookieStr,
      },
    },
  );

  return data;
};

export { doGetProjectDetail };
