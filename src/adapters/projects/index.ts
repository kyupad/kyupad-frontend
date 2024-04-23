import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doGetUpcomingProjects = async () => {
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECTS,
    {
      type: 'upcoming',
    },
    {
      cache: 'no-store',
    },
  );
  return data;
};

const doGetSuccessProjects = async () => {
  const data = await request(
    'GET',
    API_ROUTES.GET_PROJECTS,
    {
      type: 'success',
    },
    {
      cache: 'no-store',
    },
  );

  return data;
};

const doApplyProject = async (payload: { project_id: string }) => {
  const data = await request('POST', API_ROUTES.APPLY_PROJECT, payload);
  return data;
};

export { doGetUpcomingProjects, doGetSuccessProjects, doApplyProject };
