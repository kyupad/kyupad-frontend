import { cookies } from 'next/headers';
import { request } from '@/adapters';
import { API_ROUTES } from '@/utils/constants';

import 'server-only';

import { ENETWORK_ID } from '@/utils/enums/common';

const doGetSignInData = async (params: { publicKey: string }) => {
  'use server';

  const data = await request('GET', API_ROUTES.GET_SIGNIN_DATA, params);
  return data;
};

const doVerifySignInWithSolana = async (body: {
  message: string;
  signature: string;
  publicKey: string;
  network: ENETWORK_ID;
}) => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();

  const data = await request('POST', API_ROUTES.DO_VERIFY, body, {
    headers: {
      Cookie: cookieStr,
    },
  });
  return data;
};

export { doGetSignInData, doVerifySignInWithSolana };
