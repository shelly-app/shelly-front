interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string;
  readonly VITE_APP_COGNITO_DOMAIN: string;
  readonly VITE_APP_COGNITO_LOGOUT_URI: string;
  readonly VITE_APP_COGNITO_AUTHORITY: string;
  readonly VITE_APP_COGNITO_CLIENT_ID: string;
  readonly VITE_APP_COGNITO_REDIRECT_URI: string;
  readonly VITE_APP_COGNITO_RESPONSE_TYPE: string;
  readonly VITE_APP_COGNITO_SCOPE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
