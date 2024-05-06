import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doGetUpcomingProjects = async (params: {
  limit?: number;
  page?: number;
}) => {
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

const doApplyProject = async (payload: { project_id: string }) => {
  const data = await request('POST', API_ROUTES.APPLY_PROJECT, payload);
  return data;
};

const doViewRegistration = async (params: { wallet: string; slug: string }) => {
  const data = await request(
    'GET',
    API_ROUTES.VIEW_REGISTRATION.replace('[slug]', params.slug),
    { wallet: params.wallet },
  );
  return data;
};

export {
  doGetUpcomingProjects,
  doGetSuccessProjects,
  doApplyProject,
  doViewRegistration,
};
