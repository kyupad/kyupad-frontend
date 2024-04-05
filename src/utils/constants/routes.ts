const API_ROUTES = {
  GET_SIGNIN_DATA: '/v1/auth/signin-data',
  VERIFY_SIWS: '/v1/auth/verify-siws',
  GET_PROJECTS: '/v1/projects',
  GET_PROJECT_DETAIL: '/v1/project/[slug]',
  APPLY_PROJECT: '/v1/project/[slug]',
};

const WEB_ROUTES = {
  HOME: '/',
  NOTFOUND: '/404',
  FAQ: '/faq',
  WHITELIST_PASS: '/whitelist-pass',
  MY_SPACE: '/my-space',
  CATNIP_POINTS: '/catnip-points',
  PERFORMANCE: '/performance',
  TERMS: '/terms',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/[id]',
};

export { API_ROUTES, WEB_ROUTES };
