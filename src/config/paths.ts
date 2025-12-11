export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  shelters: {
    path: "/shelters",
    getHref: () => "/shelters",
  },

  auth: {
    signIn: {
      path: "/auth/sign-in",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/sign-in${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    pets: {
      path: "/app/pets",
      getHref: () => "/app/pets",
      pet: {
        path: "/app/pets/:petId",
        getHref: (id: string) => `/app/pets/${id}`,
      },
    },
    requests: {
      path: "/app/requests",
      getHref: () => "/app/requests",
    },
    members: {
      path: "/app/members",
      getHref: () => "/app/members",
      profile: {
        path: "/app/members/:memberId",
        getHref: (id: string) => `/app/members/${id}`,
      },
    },
  },
} as const;
