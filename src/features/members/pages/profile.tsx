import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Mail, Calendar, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import SectionLoader from "@/components/section-loader";
import SectionError from "@/components/section-error";

import { getNameInitials } from "@/lib/utils";
import { useMembers } from "@/features/members/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { intlFormat, parseISO } from "date-fns";

export const MemberProfilePage = () => {
  const { memberId } = useParams();
  const { t } = useTranslation();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { data: user, isLoading: isUserLoading } = useUser();
  const { members, isLoading: isMembersLoading, isError } = useMembers();

  const member = useMemo(() => {
    if (memberId === "me" && user && !members.length) {
      return {
        name: user.name,
        email: user.email,
        role: user.shelters[0]?.role ?? "—",
        joinedAt: new Date().toISOString(),
        userId: 0,
      };
    }
    if (!members.length) return null;
    if (memberId === "me") {
      return members.find((m) => m.email === user?.email) ?? null;
    }
    return members.find((m) => m.userId === Number(memberId)) ?? null;
  }, [members, memberId, user]);

  const isOwnProfile = useMemo(() => {
    if (memberId === "me") return true;
    if (!member || !user) return false;
    return member.email === user.email;
  }, [memberId, member, user]);

  const profileSchema = z.object({
    name: z
      .string()
      .min(2, { message: t("app.profile.validation.name_required") }),
  });

  type ProfileFormData = z.infer<typeof profileSchema>;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleEditProfile = (data: ProfileFormData) => {
    // TODO: call PATCH /users/:id API
    console.log("Update profile:", data);
    setIsEditDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    if (member) {
      form.reset({
        name: member.name,
      });
    }
    setIsEditDialogOpen(true);
  };

  if (isUserLoading || isMembersLoading) {
    return <SectionLoader text={t("app.profile.loading")} />;
  }

  if (isError || !member) {
    return <SectionError text={t("app.profile.error.not_found")} />;
  }

  return (
    <section className="container mx-auto max-w-2xl space-y-6 py-6">
      {/* Profile Header */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center gap-4 pb-2">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
              <AvatarFallback className="text-3xl font-medium">
                {getNameInitials(member.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CardTitle className="text-2xl font-bold">{member.name}</CardTitle>
            {isOwnProfile && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenEditDialog}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                {t("app.profile.edit_profile")}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Mail className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <Text size="xs" variant="secondary">
                  {t("app.profile.email")}
                </Text>
                <Text size="sm" weight="medium" variant="primary">
                  {member.email}
                </Text>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Shield className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <Text size="xs" variant="secondary">
                  {t("app.profile.role")}
                </Text>
                <Text size="sm" weight="medium" variant="primary">
                  {member.role}
                </Text>
              </div>
            </div>

            {/* Member Since */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Calendar className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <Text size="xs" variant="secondary">
                  {t("app.profile.member_since")}
                </Text>
                <Text size="sm" weight="medium" variant="primary">
                  {intlFormat(parseISO(member.joinedAt), { locale: "es-AR" })}
                </Text>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("app.profile.edit_dialog.title")}</DialogTitle>
            <DialogDescription>
              {t("app.profile.edit_dialog.description")}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditProfile)}
              className="space-y-4"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("app.profile.edit_dialog.full_name")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "app.profile.edit_dialog.full_name_placeholder",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  {t("app.profile.edit_dialog.cancel")}
                </Button>
                <Button type="submit">
                  {t("app.profile.edit_dialog.save")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};
