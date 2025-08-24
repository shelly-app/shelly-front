import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AdoptionRequest } from "@/features/requests/types/request";

export type RequestAction = "approve" | "reject" | "contact" | null;

interface RequestActionDialogProps {
  action: RequestAction;
  request: AdoptionRequest;
  onClose: () => void;
}

export const RequestActionDialog = ({
  action,
  request,
  onClose,
}: RequestActionDialogProps) => {
  return (
    <Dialog open={action !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {action === "approve" && (
          <>
            <DialogHeader>
              <DialogTitle>Confirmar aprobación</DialogTitle>
              <DialogDescription>
                Estás por aprobar la adopción de {request.petName} para {""}
                {request.requesterName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <label className="text-sm font-medium" htmlFor="approve-msg">
                Mensaje para el adoptante
              </label>
              <Textarea id="approve-msg" placeholder="Escribe un mensaje..." />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  // TODO: approve mutation
                  onClose();
                }}
              >
                Confirmar aprobación
              </Button>
            </DialogFooter>
          </>
        )}

        {action === "reject" && (
          <>
            <DialogHeader>
              <DialogTitle>Rechazar solicitud</DialogTitle>
              <DialogDescription>
                Indica la razón del rechazo para {request.requesterName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <label className="text-sm font-medium" htmlFor="reject-msg">
                Mensaje para el solicitante
              </label>
              <Textarea id="reject-msg" placeholder="Motivo del rechazo..." />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // TODO: reject mutation
                  onClose();
                }}
              >
                Rechazar solicitud
              </Button>
            </DialogFooter>
          </>
        )}

        {action === "contact" && (
          <>
            <DialogHeader>
              <DialogTitle>Contactar solicitante</DialogTitle>
              <DialogDescription>
                Información de contacto de {request.requesterName}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4 text-sm">
              <p>Nombre: {request.requesterName}</p>
              <p>
                Email:{" "}
                <a
                  className="text-primary underline"
                  href={`mailto:${request.requesterEmail}`}
                >
                  {request.requesterEmail}
                </a>
              </p>
              <p>
                Teléfono:{" "}
                <a
                  className="text-primary underline"
                  href={`tel:${request.requesterPhone}`}
                >
                  {request.requesterPhone}
                </a>
              </p>
            </div>
            <div className="grid gap-4 py-2">
              <label className="text-sm font-medium" htmlFor="contact-msg">
                Mensaje
              </label>
              <Textarea id="contact-msg" placeholder="Escribe un mensaje..." />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cerrar
              </Button>
              <Button
                onClick={() => {
                  // TODO: send contact message
                  onClose();
                }}
              >
                Enviar mensaje
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
