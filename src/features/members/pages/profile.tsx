import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, MapPin, Phone, Calendar, Camera } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Text } from "@/components/ui/text";
import SectionError from "@/components/section-error";

import { formatDate, getNameInitials } from "@/lib/utils";
import { MOCK_MEMBERS } from "@/features/members/constants";
import type { Member } from "@/features/members/types/member";

// Skeleton component shown while fetching data
const ProfileSkeleton = () => (
  <div className="container mx-auto max-w-2xl space-y-6 py-6">
    <div className="flex flex-col items-center gap-6">
      <Skeleton className="h-32 w-32 rounded-full" />
      <Skeleton className="h-8 w-48" />
    </div>
    <Skeleton className="h-64 w-full" />
  </div>
);

export const MemberProfilePage = () => {
  const { memberId } = useParams();
  const { t } = useTranslation();

  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Check if this is the current user's profile
  // In a real app, you'd compare member.userId with the authenticated user's ID
  // For now, we'll use "me" as a special route or compare with member id 1 as the current user
  const isOwnProfile = useMemo(() => {
    if (memberId === "me") return true;
    // For demo purposes, assume the logged-in user is member id 1
    return memberId === "1";
  }, [memberId]);

  // Form schema for editing profile
  const profileSchema = z.object({
    fullName: z
      .string()
      .min(2, { message: t("app.profile.validation.name_required") }),
    location: z
      .string()
      .min(2, { message: t("app.profile.validation.location_required") }),
    phoneNumber: z.string().optional(),
  });

  type ProfileFormData = z.infer<typeof profileSchema>;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      location: "",
      phoneNumber: "",
    },
  });

  // Simulate fetching member data
  useEffect(() => {
    const fetchMember = async () => {
      setIsLoading(true);
      setIsError(false);

      // Simulate API delay
      await new Promise((res) => setTimeout(res, 500));

      try {
        let foundMember: Member | undefined;

        if (memberId === "me") {
          // For "me" route, get current user's profile
          // In a real app, this would fetch the authenticated user's member profile
          foundMember = MOCK_MEMBERS[0]; // Assume first member is current user
        } else {
          foundMember = MOCK_MEMBERS.find((m) => m.id === Number(memberId));
        }

        if (foundMember) {
          setMember(foundMember);
          form.reset({
            fullName: foundMember.fullName,
            location: foundMember.location,
            phoneNumber: foundMember.phoneNumber || "",
          });
        } else {
          setIsError(true);
        }
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [memberId, form]);

  const handleEditProfile = (data: ProfileFormData) => {
    if (!member) return;

    // Update the member data (in real app, this would be an API call)
    const updatedMember: Member = {
      ...member,
      fullName: data.fullName,
      location: data.location,
      phoneNumber: data.phoneNumber,
      profilePhoto: previewImage || member.profilePhoto,
    };

    setMember(updatedMember);
    setIsEditDialogOpen(false);
    setPreviewImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEditDialog = () => {
    if (member) {
      form.reset({
        fullName: member.fullName,
        location: member.location,
        phoneNumber: member.phoneNumber || "",
      });
      setPreviewImage(null);
    }
    setIsEditDialogOpen(true);
  };

  if (isLoading) {
    return <ProfileSkeleton />;
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
              <AvatarImage src={member.profilePhoto} alt={member.fullName} />
              <AvatarFallback className="text-3xl font-medium">
                {getNameInitials(member.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CardTitle className="text-2xl font-bold">
              {member.fullName}
            </CardTitle>
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
            {/* Location */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <MapPin className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <Text size="xs" variant="secondary">
                  {t("app.profile.location")}
                </Text>
                <Text size="sm" weight="medium" variant="primary">
                  {member.location}
                </Text>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                <Phone className="text-primary h-5 w-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <Text size="xs" variant="secondary">
                  {t("app.profile.phone")}
                </Text>
                <Text size="sm" weight="medium" variant="primary">
                  {member.phoneNumber || t("app.profile.not_provided")}
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
                  {formatDate(member.joinedAt)}
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
              {/* Profile Photo */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={previewImage || member.profilePhoto}
                      alt={member.fullName}
                    />
                    <AvatarFallback className="text-2xl">
                      {getNameInitials(member.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="profile-photo"
                    className="bg-primary hover:bg-primary/90 absolute -right-1 -bottom-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    <input
                      id="profile-photo"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <Text size="xs" variant="secondary">
                  {t("app.profile.edit_dialog.change_photo")}
                </Text>
              </div>

              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
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

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("app.profile.edit_dialog.location")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "app.profile.edit_dialog.location_placeholder",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("app.profile.edit_dialog.phone")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "app.profile.edit_dialog.phone_placeholder",
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
                  onClick={() => {
                    setIsEditDialogOpen(false);
                    setPreviewImage(null);
                  }}
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
