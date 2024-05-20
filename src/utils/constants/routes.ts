const API_ROUTES = {
  GET_SIGNIN_DATA: '/v1/auth/signin-data',
  DO_VERIFY: '/v1/auth/verify',
  GET_PROJECTS: '/v1/projects',
  GET_PROJECT_DETAIL: '/v1/projects/[slug]',
  APPLY_PROJECT: '/v1/projects/apply',
  GET_MINTING_POOL: '/v1/nft/minting-pool',
  GENERATE_CFNT_METADATA: '/v1/nft/metadata',
  GET_SEASON_ACTIVE: '/v1/seasons/active',
  SYNC_NFT_BY_SIGNATURE: '/v1/nft/sync-nft-by-signature',
  REFRESH: '/v1/auth/refresh',
  GENERATE_REFER_LINK: '/v1/nft/generate-prefer-code',
  VIEW_REGISTRATION: '/v1/projects/[slug]/registration-detail',
  DO_INVESTING_SUCCESS: '/v1/projects/sync-investing-by-signature',
};

const WEB_ROUTES = {
  HOME: '/',
  NOTFOUND: '/404',
  FAQ: '/faq',
  WHITELIST_PASS: '/mint-nft',
  MY_SPACE: '/my-space',
  CATNIP_POINTS: '/catnip-points',
  PERFORMANCE: '/performance',
  TERMS: '/terms',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/[id]',
  HOW_TO_JOIN_OUR_IDOS: '/how-to-join-our-idos',
  APP: '/launchpad',
};

export { API_ROUTES, WEB_ROUTES };
