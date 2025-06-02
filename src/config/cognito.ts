export const cognitoAuthConfig = {
  authority: import.meta.env.VITE_APP_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_APP_COGNITO_REDIRECT_URI,
  response_type: import.meta.env.VITE_APP_COGNITO_RESPONSE_TYPE,
  scope: import.meta.env.VITE_APP_COGNITO_SCOPE,
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export const cognitoLogoutConfig = {
  client_id: import.meta.env.VITE_APP_COGNITO_CLIENT_ID,
  logout_uri: import.meta.env.VITE_APP_COGNITO_LOGOUT_URI,
  cognito_domain: import.meta.env.VITE_APP_COGNITO_DOMAIN,
};
