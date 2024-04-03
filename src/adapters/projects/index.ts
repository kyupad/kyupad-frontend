import { API_ROUTES } from '@/utils/constants';

import { request } from '../xhr';

const doGetUpcomingProjects = async () => {
  const data = await request('GET', API_ROUTES.GET_PROJECTS, {
    time: 'upcoming',
  });
  return data;
};

const doGetSuccessProjects = async () => {
  const data = await request('GET', API_ROUTES.GET_PROJECTS, {
    time: 'success',
  });

  return data;
};

export { doGetUpcomingProjects, doGetSuccessProjects };
