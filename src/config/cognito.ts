import { env } from '@/config/env';

export const cognitoAuthConfig = {
  authority: env.COGNITO_AUTHORITY,
  client_id: env.COGNITO_CLIENT_ID,
  redirect_uri: env.COGNITO_REDIRECT_URI,
  response_type: env.COGNITO_RESPONSE_TYPE,
  scope: env.COGNITO_SCOPE,
};
