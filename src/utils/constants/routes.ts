const API_ROUTES = {
  GET_SIGNIN_DATA: '/v1/auth/signin-data',
  VERIFY_SIWS: '/v1/auth/verify-siws',
  GET_PROJECTS: '/v1/projects',
  GET_PROJECT_DETAIL: '/v1/projects/[slug]',
  APPLY_PROJECT: '/v1/projects/apply',
  GET_MINTING_POOL: '/v1/nft/minting-pool',
  GENERATE_CFNT_METADATA: '/v1/nft/metadata',
  GET_SEASON_ACTIVE: '/v1/seasons/active',
  SYNC_NFT_BY_SIGNATURE: '/v1/nft/sync-nft-by-signature',
  REFRESH: '/v1/auth/refresh',
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
};

export { API_ROUTES, WEB_ROUTES };
