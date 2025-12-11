import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { useMembers } from "@/features/members/hooks/use-members";
import type { Member } from "@/features/members/types/member";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import SectionLoader from "@/components/section-loader";
import SectionError from "@/components/section-error";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";

export const MembersListPage = () => {
  const { members, isLoading, isError } = useMembers();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (dialogOpen === false) {
      setHasSubmitted(false);
    }
  }, [dialogOpen]);

  const inviteSchema = z.object({
    email: z
      .string()
      .email({ message: t("app.members.validation.invalid_email") }),
  });

  type InviteForm = z.infer<typeof inviteSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    mode: "onSubmit", // validate only on submit
    reValidateMode: "onChange", // but clear/validate errors as user edits after a submit
    defaultValues: { email: "" },
  });

  if (isLoading) {
    return <SectionLoader text={t("app.members.loading")} />;
  }

  if (isError) {
    return <SectionError text={t("app.members.error")} />;
  }

  const visibleMembers = members.filter((m) =>
    [m.fullName.toLowerCase(), m.location.toLowerCase()].some((field) =>
      field.includes(search.toLowerCase()),
    ),
  );

  return (
    <section className="container mx-auto space-y-6 pt-5 md:pt-0">
      <h1 className="text-3xl font-bold">{t("app.members.title")}</h1>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={t("app.members.search_placeholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:w-64"
        />
        <Button size="lg" onClick={() => setDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          {t("app.members.add_member")}
        </Button>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:justify-start">
        {visibleMembers.map((member: Member) => (
          <Card
            key={member.id}
            className="flex h-68 w-52 cursor-pointer flex-col items-center justify-between overflow-hidden shadow-md transition-shadow hover:shadow-lg"
            onClick={() =>
              navigate(paths.app.members.profile.getHref(String(member.id)))
            }
          >
            <CardHeader className="flex w-full flex-col items-center gap-2 p-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={member.profilePhoto} alt={member.fullName} />
                <AvatarFallback className="text-lg font-medium">
                  {member.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center text-base">
                {member.fullName}
              </CardTitle>
              <CardDescription className="text-center text-sm">
                {member.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground flex w-full justify-center text-xs">
              {t("app.members.member_since", {
                date: formatDate(member.joinedAt),
              })}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add member dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            reset();
          }
          setDialogOpen(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("app.members.invite.title")}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-sm">
            {t("app.members.invite.description")}
          </DialogDescription>
          <form
            onSubmit={handleSubmit((data) => {
              setHasSubmitted(true);
              // TODO: trigger invite API
              void data.email;
              setDialogOpen(false);
              reset(undefined, {
                keepErrors: false,
                keepIsSubmitted: false,
                keepSubmitCount: false,
              });
            })}
          >
            <div className="grid gap-2 py-4">
              <Input
                placeholder={t("app.members.invite.email_placeholder")}
                {...register("email")}
              />
              {errors.email && hasSubmitted && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  reset(undefined, {
                    keepErrors: false,
                    keepIsSubmitted: false,
                    keepSubmitCount: false,
                  });
                }}
              >
                {t("app.members.invite.cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {t("app.members.invite.send")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
