import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doGetFurtureProjects = async (
  params: {
    limit?: number;
    page?: number;
  },
  signal?: AbortSignal,
) => {
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECTS,
    {
      type: 'furture',
      ...(params?.limit ? { limit: params.limit } : {}),
      ...(params?.page ? { page: params.page } : {}),
    },
    {
      cache: 'no-store',
      signal,
    },
  );
  return data;
};

const doGetUpcomingProjects = async (
  params: {
    limit?: number;
    page?: number;
  },
  signal?: AbortSignal,
) => {
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECTS,
    {
      type: 'upcoming',
      ...(params?.limit ? { limit: params.limit } : {}),
      ...(params?.page ? { page: params.page } : {}),
    },
    {
      cache: 'no-store',
      signal,
    },
  );
  return data;
};

const doGetSuccessProjects = async (
  params: {
    limit?: number;
    page?: number;
  },
  signal?: AbortSignal,
) => {
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECTS,
    {
      type: 'success',
      ...(params?.limit ? { limit: params.limit } : {}),
      ...(params?.page ? { page: params.page } : {}),
    },
    {
      cache: 'no-store',
      signal,
    },
  );

  return data;
};

const doApplyProject = async (payload: {
  project_id: string;
  notification_email?: string;
}) => {
  const data = await request('POST', API_ROUTES.APPLY_PROJECT, payload);
  return data;
};

const doViewRegistration = async (
  params: { wallet: string; slug: string },
  signal?: AbortSignal,
) => {
  const data = await request(
    'GET',
    API_ROUTES.VIEW_REGISTRATION.replace('[slug]', params.slug),
    { wallet: params.wallet },
    {
      signal,
    },
  );
  return data;
};

const doInvestingSuccess = async (payload: {
  project__id: string;
  total: number;
  signature: string;
}) => {
  const data = await request('POST', API_ROUTES.DO_INVESTING_SUCCESS, payload);
  return data;
};

const doGetMyVesting = async (slug: string, signal?: AbortSignal) => {
  const data = await request(
    'GET',
    API_ROUTES.GET_MY_VESTING,
    { project_slug: slug },
    {
      cache: 'no-store',
      signal,
    },
  );

  return data;
};

export {
  doGetUpcomingProjects,
  doGetSuccessProjects,
  doApplyProject,
  doViewRegistration,
  doGetFurtureProjects,
  doInvestingSuccess,
  doGetMyVesting,
};
