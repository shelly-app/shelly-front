import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AdoptionRequest } from "@/features/requests/types/request";
import {
  RequestActionDialog,
  RequestAction,
} from "@/features/requests/components/request-action-dialog";
import { cn, formatDate } from "@/lib/utils";
import { ChevronDown, Ellipsis } from "lucide-react";
import {
  QUESTIONNAIRE_LABELS,
  REQUEST_STATUS,
} from "@/features/requests/constants";

interface RequestCardProps {
  request: AdoptionRequest;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<RequestAction>(null);

  return (
    <>
      <Card
        className="w-full cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CardHeader className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <ChevronDown
              className={cn(
                "transition-transform",
                isOpen ? "rotate-180" : "rotate-0",
              )}
            />
            {/* Pet avatar */}
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.petPhotoUrl} alt={request.petName} />
              <AvatarFallback>{request.petName.charAt(0)}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="leading-tight">
                <a
                  href={`/app/pets/${request.petId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {request.petName}
                </a>
              </CardTitle>
              <CardDescription className="flex flex-col text-sm">
                <span>Solicitado por {request.requesterName}</span>
                <span className="text-muted-foreground text-xs">
                  {formatDate(request.createdAt)}
                </span>
              </CardDescription>
            </div>
          </div>
          {/* Contextual menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => e.stopPropagation()}
              >
                <Ellipsis className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAction("approve");
                }}
              >
                Aprobar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAction("reject");
                }}
              >
                Rechazar
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setAction("contact");
                }}
              >
                Contactar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        {isOpen && (
          <CardContent className="grid gap-3 pb-4 text-sm">
            {request.status === REQUEST_STATUS.APPROVED && (
              <span className="text-muted-foreground text-xs">
                Aprobado el: {formatDate(request.approvedAt)}
              </span>
            )}
            {request.status === REQUEST_STATUS.REJECTED && (
              <span className="text-muted-foreground text-xs">
                Rechazado el: {formatDate(request.rejectedAt)}
              </span>
            )}
            <p>
              <strong>Correo:&nbsp;</strong>
              {request.requesterEmail}
            </p>

            {request.requesterPhone && (
              <p>
                <strong>Teléfono:&nbsp;</strong>
                {request.requesterPhone}
              </p>
            )}

            {Object.entries(request.questionnaire).map(([key, value]) => (
              <p key={key}>
                <strong>
                  {
                    QUESTIONNAIRE_LABELS[
                      key as keyof typeof QUESTIONNAIRE_LABELS
                    ]
                  }
                  :&nbsp;
                </strong>
                {typeof value === "boolean" ? (value ? "Sí" : "No") : value}
              </p>
            ))}

            {request.message && (
              <p>
                <strong>Mensaje:&nbsp;</strong>
                {request.message}
              </p>
            )}

            {request.rejectionReason && (
              <p>
                <strong>Motivo del rechazo:&nbsp;</strong>
                {request.rejectionReason}
              </p>
            )}
          </CardContent>
        )}
      </Card>

      <RequestActionDialog
        action={action}
        request={request}
        onClose={() => setAction(null)}
      />
    </>
  );
};
