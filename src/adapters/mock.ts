import { API_ROUTES } from '@/utils/constants';

import { request } from './xhr';

const doGetMock = async ({
  delay,
  error,
}: {
  delay?: number;
  error?: boolean;
}) => {
  const data = await request('GET', API_ROUTES.GET_MOCK, { delay, error });
  return data;
};

export { doGetMock };
