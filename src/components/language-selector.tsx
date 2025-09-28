import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/text";

const LANGUAGE_FLAGS = {
  en: "🇺🇸",
  es: "🇦🇷",
};

const LanguageSelector = ({
  className,
  isCollapsed,
}: {
  className?: string;
  isCollapsed?: boolean;
}) => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: "en", name: t("languages.en") },
    { code: "es", name: t("languages.es") },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn("w-full justify-start gap-2", className)}
        >
          {LANGUAGE_FLAGS[i18n.language as keyof typeof LANGUAGE_FLAGS]}
          {!isCollapsed && (
            <Text size="sm" weight="medium">
              {languages.find((lang) => lang.code === i18n.language)?.name}
            </Text>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="flex gap-2"
          >
            {LANGUAGE_FLAGS[lang.code as keyof typeof LANGUAGE_FLAGS]}{" "}
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
