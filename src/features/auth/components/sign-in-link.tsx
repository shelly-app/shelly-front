import { Button } from "@/components/ui/button";
import { useIsScrolled } from "@/hooks/use-is-scrolled";
import { cn } from "@/lib/utils";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const SignInLink = ({ className }: { className?: string }) => {
  const { isAuthenticated } = useAuth();
  const isScrolled = useIsScrolled(50);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/app/pets");
    } else {
      navigate("/auth/sign-in");
    }
  };

  return (
    <Button
      size="lg"
      onClick={handleClick}
      className={cn(
        "hover:bg-primary/90 rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out",
        isScrolled
          ? "shadow-lg hover:shadow-xl active:scale-95"
          : "backdrop-blur-sm hover:shadow-md active:scale-95",
        className,
      )}
    >
      {isAuthenticated ? t("auth.access") : t("auth.sign_in")}
    </Button>
  );
};
