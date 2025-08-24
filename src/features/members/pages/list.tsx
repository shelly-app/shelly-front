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

export const MembersListPage = () => {
  const { members, isLoading, isError } = useMembers();

  if (isLoading) {
    return (
      <section className="text-muted-foreground container mx-auto py-10 text-center">
        Cargando miembros...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="text-destructive container mx-auto py-10 text-center">
        Error al cargar los miembros
      </section>
    );
  }

  return (
    <section className="container mx-auto space-y-6 py-10">
      <h1 className="text-3xl font-bold">Miembros del refugio</h1>
      <div className="flex flex-wrap justify-center gap-6 md:justify-start">
        {members.map((member: Member) => (
          <Card
            key={member.id}
            className="flex h-68 w-52 flex-col items-center justify-between overflow-hidden shadow-md transition-shadow hover:shadow-lg"
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
              Miembro desde {formatDate(member.joinedAt)}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
