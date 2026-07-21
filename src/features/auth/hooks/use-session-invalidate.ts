import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { SIGN_OUT_REASON_STORAGE_KEY } from "@/features/auth/constants";

export const useSessionInvalidate = () => {
  const { removeUser } = useAuth();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("logout")) {
      const reason = window.sessionStorage.getItem(SIGN_OUT_REASON_STORAGE_KEY);
      window.sessionStorage.removeItem(SIGN_OUT_REASON_STORAGE_KEY);

      void removeUser();

      if (reason === "no-shelter") {
        toast.warning(t("auth.no_shelter_access"));
      }

      setSearchParams((prev) => {
        prev.delete("logout");
        return prev;
      });
    }
  }, [searchParams, removeUser, setSearchParams, t]);
};
