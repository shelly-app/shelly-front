import Axios, { InternalAxiosRequestConfig } from "axios";

// import { useNotifications } from '@/components/ui/notifications';
import { paths } from "@/config/paths";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;
  return config;
};

export const api = Axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

/**
 * Set the authentication token for API requests
 * This should be called when the user logs in or when the token changes
 */
export function setAuthToken(token: string | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotifications.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    if (error.response?.status === 401) {
      const searchParams = new URLSearchParams();
      const redirectTo =
        searchParams.get("redirectTo") || window.location.pathname;
      window.location.href = paths.auth.signIn.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
