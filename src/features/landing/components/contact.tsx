import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { H2, H3, Lead, Paragraph } from "@/components/ui/text";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Heart, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useContactForm } from "@/features/landing/hooks/use-contact-form";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "react-i18next";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState("shelter");
  const {
    formData,
    isSubmitted,
    progress,
    isPending,
    handleInputChange,
    handleSubmit,
  } = useContactForm();
  const { t } = useTranslation();

  if (isSubmitted) {
    return (
      <section
        id="contact"
        className="relative flex min-h-[600px] flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50 px-4 pb-32"
      >
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="rounded-full bg-green-100 p-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <H2 className="text-center text-3xl font-bold md:text-4xl">
            {t("landing.contact.success.title")}
          </H2>
          <Lead className="text-lg">
            {t("landing.contact.success.subtitle")}
          </Lead>
          <Progress value={progress} className="w-full" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-[800px] flex-col items-center justify-center gap-16 overflow-hidden bg-gradient-to-b from-amber-100 to-amber-50 px-4 pb-32"
    >
      <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
        <H2 className="text-center text-4xl font-bold md:text-5xl">
          {t("landing.contact.title")}
        </H2>
        <Lead className="max-w-2xl text-lg md:text-xl">
          {t("landing.contact.subtitle")}
        </Lead>
      </div>

      <Separator className="w-full max-w-3xl bg-transparent bg-radial-[at_50%_50%] from-amber-400/80 to-transparent" />

      <div className="mx-auto w-full max-w-4xl px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="shelter"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Building2 className="h-4 w-4" />
              {t("landing.contact.shelter.tab")}
            </TabsTrigger>
            <TabsTrigger
              value="sponsor"
              disabled={isPending}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              {t("landing.contact.sponsor.tab")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shelter" className="mt-8">
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 text-center">
                <H3 className="text-2xl font-semibold">
                  {t("landing.contact.shelter.title")}
                </H3>
                <Paragraph className="mt-2 text-gray-600">
                  {t("landing.contact.shelter.subtitle")}
                </Paragraph>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="shelter-name">
                      {t("landing.contact.shelter.form.shelter_name")} *
                    </Label>
                    <Input
                      id="shelter-name"
                      value={formData.shelterName}
                      onChange={(e) =>
                        handleInputChange("shelterName", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.shelter.form.shelter_name_placeholder",
                      )}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shelter-type">
                      {t("landing.contact.shelter.form.shelter_type")} *
                    </Label>
                    <Input
                      id="shelter-type"
                      value={formData.shelterType}
                      onChange={(e) =>
                        handleInputChange("shelterType", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.shelter.form.shelter_type_placeholder",
                      )}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelter-location">
                    {t("landing.contact.shelter.form.shelter_location")} *
                  </Label>
                  <Input
                    id="shelter-location"
                    value={formData.shelterLocation}
                    onChange={(e) =>
                      handleInputChange("shelterLocation", e.target.value)
                    }
                    placeholder={t(
                      "landing.contact.shelter.form.shelter_location_placeholder",
                    )}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">
                      {t("landing.contact.shelter.form.contact_name")} *
                    </Label>
                    <Input
                      id="contact-name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.shelter.form.contact_name_placeholder",
                      )}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">
                      {t("landing.contact.shelter.form.email")} *
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.shelter.form.email_placeholder",
                      )}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">
                    {t("landing.contact.shelter.form.phone")}
                  </Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder={t(
                      "landing.contact.shelter.form.phone_placeholder",
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shelter-message">
                    {t("landing.contact.shelter.form.message")} *
                  </Label>
                  <Textarea
                    id="shelter-message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder={t(
                      "landing.contact.shelter.form.message_placeholder",
                    )}
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {t("landing.contact.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("landing.contact.shelter.cta")}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="sponsor" className="mt-8">
            <div className="rounded-2xl bg-white/80 p-8 shadow-lg backdrop-blur-sm">
              <div className="mb-6 text-center">
                <H3 className="text-2xl font-semibold">
                  {t("landing.contact.sponsor.title")}
                </H3>
                <Paragraph className="mt-2 text-gray-600">
                  {t("landing.contact.sponsor.subtitle")}
                </Paragraph>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">
                      {t("landing.contact.sponsor.form.full_name")} *
                    </Label>
                    <Input
                      id="sponsor-name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.full_name_placeholder",
                      )}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-email">
                      {t("landing.contact.sponsor.form.email")} *
                    </Label>
                    <Input
                      id="sponsor-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.email_placeholder",
                      )}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-organization">
                      {t("landing.contact.sponsor.form.organization")}
                    </Label>
                    <Input
                      id="sponsor-organization"
                      value={formData.organization}
                      onChange={(e) =>
                        handleInputChange("organization", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.organization_placeholder",
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-phone">
                      {t("landing.contact.sponsor.form.phone")}
                    </Label>
                    <Input
                      id="sponsor-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.phone_placeholder",
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contacthip-type">
                      {t("landing.contact.sponsor.form.sponsorship_type")} *
                    </Label>
                    <Input
                      id="contacthip-type"
                      value={formData.contacthipType}
                      onChange={(e) =>
                        handleInputChange("contacthipType", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.sponsorship_type_placeholder",
                      )}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-budget">
                      {t("landing.contact.sponsor.form.budget")}
                    </Label>
                    <Input
                      id="sponsor-budget"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      placeholder={t(
                        "landing.contact.sponsor.form.budget_placeholder",
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sponsor-message">
                    {t("landing.contact.sponsor.form.message")} *
                  </Label>
                  <Textarea
                    id="sponsor-message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder={t(
                      "landing.contact.sponsor.form.message_placeholder",
                    )}
                    rows={4}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {t("landing.contact.sending")}
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      {t("landing.contact.sponsor.cta")}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
