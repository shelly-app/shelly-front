import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Mail, Calendar, Shield, XIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUploader } from "@/components/file-uploader";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import SectionLoader from "@/components/section-loader";
import SectionError from "@/components/section-error";

import { getNameInitials } from "@/lib/utils";
import { useMembers } from "@/features/members/hooks/use-members";
import { useUpdateProfile } from "@/features/members/hooks/use-update-profile";
import { useUser } from "@/hooks/use-user";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useRoleLabel } from "@/hooks/use-role-label";
import { intlFormat, parseISO } from "date-fns";
import { useShelters } from "@/components/providers/shelters-provider";
import { useUpdateMemberRole } from "@/features/members/hooks/use-update-member-role";
import { MEMBER_ROLES, type MemberRole } from "@/features/members/constants";
import type { Member } from "@/features/members/types/member";

export const MemberProfilePage = () => {
  const { memberId } = useParams();
  const { t } = useTranslation();
  const roleLabel = useRoleLabel();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<MemberRole>("volunteer");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  const { data: user, isLoading: isUserLoading } = useUser();
  const { currentShelter } = useShelters();
  const { members, isLoading: isMembersLoading, isError } = useMembers();
  const { upload: uploadAvatar, isUploading } = useImageUpload(
    "/users/me/avatar-upload-url",
  );

  const member = useMemo<Member | null>(() => {
    if (memberId === "me" && user && !members.length) {
      return {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl ?? null,
        role: (currentShelter?.role ??
          user.shelters[0]?.role ??
          "volunteer") as MemberRole,
        pending: false,
        joinedAt: new Date().toISOString(),
        userId: 0,
      };
    }
    if (!members.length) return null;
    if (memberId === "me") {
      return members.find((m) => m.email === user?.email) ?? null;
    }
    return members.find((m) => m.userId === Number(memberId)) ?? null;
  }, [currentShelter?.role, members, memberId, user]);

  const isOwnProfile = useMemo(() => {
    if (memberId === "me") return true;
    if (!member || !user) return false;
    return member.email === user.email;
  }, [memberId, member, user]);

  const { updateProfileAsync, isLoading: isUpdating } = useUpdateProfile(
    member?.userId ?? 0,
  );
  const {
    updateMemberRoleAsync,
    isLoading: isUpdatingRole,
    isError: isRoleUpdateError,
    reset: resetRoleUpdate,
  } = useUpdateMemberRole(member?.userId ?? 0, currentShelter?.id ?? 0);

  const canManageRole = currentShelter?.role === "admin" && !isOwnProfile;

  const showExistingAvatar =
    !!member?.avatarUrl && !avatarRemoved && !avatarFile;

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

  const handleEditProfile = async (data: ProfileFormData) => {
    let avatarKey: string | undefined;
    if (avatarFile) {
      avatarKey = await uploadAvatar(avatarFile);
    } else if (avatarRemoved) {
      avatarKey = "";
    }

    await updateProfileAsync({
      name: data.name,
      ...(avatarKey !== undefined ? { avatarKey } : {}),
    });

    setIsEditDialogOpen(false);
  };

  const handleOpenEditDialog = () => {
    if (member) {
      form.reset({
        name: member.name,
      });
    }
    setAvatarFile(null);
    setAvatarRemoved(false);
    setIsEditDialogOpen(true);
  };

  const handleOpenRoleDialog = () => {
    if (!member) return;
    setSelectedRole(member.role as MemberRole);
    resetRoleUpdate();
    setIsRoleDialogOpen(true);
  };

  const handleRoleUpdate = async () => {
    try {
      await updateMemberRoleAsync({ role: selectedRole });
      setIsRoleDialogOpen(false);
    } catch {
      // Error is surfaced inline via `isRoleUpdateError`.
    }
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
              <AvatarImage
                src={member.avatarUrl ?? undefined}
                alt={member.name}
              />
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
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Shield className="text-primary h-5 w-5" />
                </div>
                <div className="flex items-baseline gap-2">
                  <Text size="xs" variant="secondary">
                    {t("app.profile.role")}
                  </Text>
                  <Text size="sm" weight="medium" variant="primary">
                    {roleLabel(member.role)}
                  </Text>
                </div>
              </div>
              {canManageRole && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleOpenRoleDialog}
                >
                  {t("app.profile.role_dialog.change")}
                </Button>
              )}
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
              {/* Avatar */}
              <div className="space-y-2">
                <FormLabel>{t("app.profile.edit_dialog.photo")}</FormLabel>
                {showExistingAvatar ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={member.avatarUrl ?? undefined}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {getNameInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setAvatarRemoved(true)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground shrink-0"
                    >
                      <XIcon className="mr-1 h-3 w-3" />
                      {t("app.profile.edit_dialog.remove_photo")}
                    </Button>
                  </div>
                ) : (
                  <FileUploader
                    types={["image"]}
                    onFileChange={setAvatarFile}
                    onRemoveFile={() => setAvatarFile(null)}
                  />
                )}
              </div>

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
                  disabled={isUploading || isUpdating}
                >
                  {t("app.profile.edit_dialog.cancel")}
                </Button>
                <Button type="submit" disabled={isUploading || isUpdating}>
                  {t("app.profile.edit_dialog.save")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog
        open={isRoleDialogOpen}
        onOpenChange={(open) => {
          setIsRoleDialogOpen(open);
          if (!open) resetRoleUpdate();
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("app.profile.role_dialog.title")}</DialogTitle>
            <DialogDescription>
              {t("app.profile.role_dialog.description", {
                name: member.name,
              })}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("app.profile.role")}
            </label>
            <Select
              value={selectedRole}
              onValueChange={(value: MemberRole) => setSelectedRole(value)}
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
            {isRoleUpdateError && (
              <p className="text-destructive text-sm">
                {t("app.profile.role_dialog.error")}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isUpdatingRole}
              onClick={() => setIsRoleDialogOpen(false)}
            >
              {t("app.profile.role_dialog.cancel")}
            </Button>
            <Button
              type="button"
              disabled={isUpdatingRole || selectedRole === member.role}
              onClick={handleRoleUpdate}
            >
              {isUpdatingRole
                ? t("app.profile.role_dialog.saving")
                : t("app.profile.role_dialog.save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
