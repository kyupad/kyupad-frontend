import { cookies } from 'next/headers';
import { request } from '@/adapters';
import { API_ROUTES } from '@/utils/constants';
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from '@solana/wallet-standard-features';

import 'server-only';

const doGetSignInData = async () => {
  'use server';
  const data = await request('GET', API_ROUTES.GET_SIGNIN_DATA);
  return data;
};

const doVerifySignInWithSolana = async (
  input: SolanaSignInInput,
  output: SolanaSignInOutput,
) => {
  'use server';
  const cookiesStore = cookies();
  const cookieStr = cookiesStore.toString();

  const data = await request(
    'POST',
    API_ROUTES.VERIFY_SIWS,
    { input, output },
    {
      headers: {
        Cookie: cookieStr,
      },
    },
  );
  return data;
};

export { doGetSignInData, doVerifySignInWithSolana };
