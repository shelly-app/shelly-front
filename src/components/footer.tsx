import { Separator } from "@/components/ui/separator";
import { Text } from "@/components/ui/text";
import { ShellyGradient } from "@/components/ui/shelly-gradient";
import { Image } from "@/components/ui/image";
import { Button } from "@/components/ui/button";
import { Heart, Mail, ArrowUp } from "lucide-react";
import ShellyLogo from "@/assets/images/shelly-logo.webp";
import { cn } from "@/lib/utils";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { TermsConditionsDialog } from "./terms-conditions-dialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Footer = ({ className }: { className?: string }) => {
  const { t } = useTranslation();
  const { scrollToSection } = useHashScroll();
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);

  const FOOTER_LINKS = [
    { id: "about", label: t("footer.about"), href: "#about" },
    { id: "adopt", label: t("footer.adopt"), href: "#adopt" },
    { id: "contact", label: t("footer.contact"), href: "#contact" },
    { id: "terms", label: t("footer.terms"), href: "#" },
  ] as const;

  return (
    <footer className={cn("bg-amber-100 text-amber-900", className)}>
      {/* Main Footer Content */}
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-8">
        {/* Brand Section */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <Image src={ShellyLogo} alt="Shelly Logo" className="h-8 w-8" />
            <ShellyGradient className="text-xl font-bold">
              {t("brand.name")}
            </ShellyGradient>
          </div>
          <Text className="mb-3 text-sm text-amber-700">
            {t("footer.slogan")}
          </Text>
          <div className="flex items-center gap-2 text-xs text-amber-600">
            <Heart className="h-3 w-3" />
            <span>{t("footer.made_with_love")}</span>
          </div>
        </div>

        <Separator className="mb-6 bg-amber-300" />

        {/* Links */}
        <div className="mb-6 flex flex-wrap justify-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.id === "terms") {
                  setTermsDialogOpen(true);
                } else {
                  scrollToSection(link.href);
                }
              }}
              className="cursor-pointer text-sm text-amber-700 transition-colors hover:text-amber-900 hover:underline"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="mb-6 flex justify-center">
          <a
            href={`mailto:${t("brand.email")}`}
            className="flex items-center gap-2 text-sm text-amber-700 transition-colors hover:text-amber-900 hover:underline"
          >
            <Mail className="h-4 w-4" />
            <span>{t("brand.email")}</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Text className="text-xs text-amber-600">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToSection("/")}
            className="text-amber-700 transition-all duration-200 hover:bg-amber-200 hover:text-amber-900"
          >
            <ArrowUp className="mr-2 h-3 w-3" />
            {t("footer.back_to_top")}
          </Button>
        </div>
      </div>

      <TermsConditionsDialog
        open={termsDialogOpen}
        onOpenChange={setTermsDialogOpen}
      />
    </footer>
  );
};
