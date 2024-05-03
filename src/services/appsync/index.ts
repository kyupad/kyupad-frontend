import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { env } from 'env.mjs';

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.NEXT_PUBLIC_AWS_APPSYNC_ENDPOINT,
        defaultAuthMode: 'apiKey',
        apiKey: env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY,
        region: env.NEXT_PUBLIC_AWS_REGION,
      },
    },
  },
  {
    ssr: true,
  },
);

const appSyncClient = generateClient();

export { appSyncClient };
