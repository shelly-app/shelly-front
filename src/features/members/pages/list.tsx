import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import SectionLoader from "@/components/section-loader";
import SectionError from "@/components/section-error";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "@/config/paths";
import { getNameInitials } from "@/lib/utils";
import { intlFormat, parseISO } from "date-fns";
import { useShelters } from "@/components/providers/shelters-provider";
import { useInviteMember } from "@/features/members/hooks/use-invite-member";
import { useRoleLabel } from "@/hooks/use-role-label";
import { Text } from "@/components/ui/text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MEMBER_ROLES, type MemberRole } from "@/features/members/constants";

export const MembersListPage = () => {
  const { members, isLoading, isError } = useMembers();
  const { currentShelter, isLoading: isShelterLoading } = useShelters();
  const {
    inviteAsync,
    isLoading: isInviting,
    isError: isInviteError,
    reset: resetInvite,
  } = useInviteMember();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { t } = useTranslation();
  const roleLabel = useRoleLabel();
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
    role: z.enum(MEMBER_ROLES),
  });

  type InviteForm = z.infer<typeof inviteSchema>;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { email: "", role: "volunteer" },
  });

  if (isShelterLoading) {
    return <SectionLoader text={t("app.members.loading")} />;
  }

  if (!currentShelter) {
    return (
      <section className="container mx-auto space-y-6 pt-5 md:pt-0">
        <h1 className="text-3xl font-bold">{t("app.members.title")}</h1>
        <p className="text-muted-foreground">{t("app.no_shelter")}</p>
      </section>
    );
  }

  if (isLoading) {
    return <SectionLoader text={t("app.members.loading")} />;
  }

  if (isError) {
    return <SectionError text={t("app.members.error")} />;
  }

  const visibleMembers = members.filter((m) =>
    [m.name.toLowerCase(), m.email.toLowerCase()].some((field) =>
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
        {currentShelter.role === "admin" && (
          <Button size="lg" onClick={() => setDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            {t("app.members.add_member")}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:justify-start">
        {visibleMembers.map((member: Member) => (
          <Card
            key={member.userId}
            className="flex h-68 w-52 cursor-pointer flex-col items-center justify-between overflow-hidden shadow-md transition-shadow hover:shadow-lg"
            onClick={() =>
              navigate(paths.app.members.profile.getHref(String(member.userId)))
            }
          >
            <CardHeader className="flex w-full flex-col items-center gap-2 p-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={member.avatarUrl ?? undefined}
                  alt={member.name}
                />
                <AvatarFallback className="text-lg font-medium">
                  {getNameInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-center text-base">
                {member.name}
              </CardTitle>
              <CardDescription className="flex w-full min-w-0 flex-col items-center gap-1">
                <Text variant="secondary" size="sm">
                  {roleLabel(member.role)}
                </Text>
                <Text
                  variant="primary"
                  size="sm"
                  title={member.email}
                  className="block w-full truncate text-center"
                >
                  {member.email}
                </Text>
              </CardDescription>
            </CardHeader>
            <CardContent className="text-muted-foreground flex w-full justify-center text-xs">
              {t("app.members.member_since", {
                date: intlFormat(parseISO(member.joinedAt), {
                  locale: "es-AR",
                }),
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
            resetInvite();
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
            onSubmit={handleSubmit(async (data) => {
              setHasSubmitted(true);
              try {
                await inviteAsync({
                  email: data.email,
                  role: data.role,
                });
                setDialogOpen(false);
                reset(undefined, {
                  keepErrors: false,
                  keepIsSubmitted: false,
                  keepSubmitCount: false,
                });
              } catch {
                // Error surfaced inline via `isInviteError`.
              }
            })}
          >
            <div className="space-y-4 pb-8">
              <Input
                placeholder={t("app.members.invite.email_placeholder")}
                {...register("email")}
              />
              {errors.email && hasSubmitted && (
                <p className="text-destructive text-sm">
                  {errors.email.message}
                </p>
              )}
              {isInviteError && hasSubmitted && (
                <p className="text-destructive text-sm">
                  {t("app.members.invite.error")}
                </p>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  {t("app.members.invite.role")}
                </label>
                <Controller
                  control={control}
                  name="role"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value: MemberRole) =>
                        field.onChange(value)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MEMBER_ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {roleLabel(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isInviting}
                onClick={() => {
                  setDialogOpen(false);
                  reset(undefined, {
                    keepErrors: false,
                    keepIsSubmitted: false,
                    keepSubmitCount: false,
                  });
                  resetInvite();
                }}
              >
                {t("app.members.invite.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || isInviting || !isValid}
              >
                {isInviting
                  ? t("app.members.invite.sending")
                  : t("app.members.invite.send")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
