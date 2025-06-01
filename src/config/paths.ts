export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    signIn: {
      path: '/auth/sign-in',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
  },
} as const;
