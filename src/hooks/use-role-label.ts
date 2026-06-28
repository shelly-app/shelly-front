import { useTranslation } from "react-i18next";

/**
 * Translates a backend role identifier (e.g. "admin", "volunteer") into a
 * localized label. Unknown roles fall back to the raw value so the UI never
 * shows an empty string or a missing-translation key.
 */
export const useRoleLabel = () => {
  const { t } = useTranslation();

  return (role?: string | null) =>
    role ? t(`roles.${role}`, { defaultValue: role }) : "";
};
