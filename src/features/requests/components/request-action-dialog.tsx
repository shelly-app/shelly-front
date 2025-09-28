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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <Dialog open={action !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {action === "approve" && (
          <>
            <DialogHeader>
              <DialogTitle>
                {t("app.requests.actions_dialog.approve.title")}
              </DialogTitle>
              <DialogDescription>
                {t("app.requests.actions_dialog.approve.description", {
                  petName: request.petName,
                  requesterName: request.requesterName,
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <label className="text-sm font-medium" htmlFor="approve-msg">
                {t("app.requests.actions_dialog.approve.message_label")}
              </label>
              <Textarea
                id="approve-msg"
                placeholder={t(
                  "app.requests.actions_dialog.approve.message_placeholder",
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                {t("app.requests.actions_dialog.cancel")}
              </Button>
              <Button
                onClick={() => {
                  // TODO: approve mutation
                  onClose();
                }}
              >
                {t("app.requests.actions_dialog.approve.confirm")}
              </Button>
            </DialogFooter>
          </>
        )}

        {action === "reject" && (
          <>
            <DialogHeader>
              <DialogTitle>
                {t("app.requests.actions_dialog.reject.title")}
              </DialogTitle>
              <DialogDescription>
                {t("app.requests.actions_dialog.reject.description", {
                  requesterName: request.requesterName,
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <label className="text-sm font-medium" htmlFor="reject-msg">
                {t("app.requests.actions_dialog.reject.message_label")}
              </label>
              <Textarea
                id="reject-msg"
                placeholder={t(
                  "app.requests.actions_dialog.reject.message_placeholder",
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                {t("app.requests.actions_dialog.cancel")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  // TODO: reject mutation
                  onClose();
                }}
              >
                {t("app.requests.actions_dialog.reject.confirm")}
              </Button>
            </DialogFooter>
          </>
        )}

        {action === "contact" && (
          <>
            <DialogHeader>
              <DialogTitle>
                {t("app.requests.actions_dialog.contact.title")}
              </DialogTitle>
              <DialogDescription>
                {t("app.requests.actions_dialog.contact.description", {
                  requesterName: request.requesterName,
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-2 py-4 text-sm">
              <p>
                {t("app.requests.actions_dialog.contact.name")}:{" "}
                {request.requesterName}
              </p>
              <p>
                {t("app.requests.actions_dialog.contact.email")}:{" "}
                <a
                  className="text-primary underline"
                  href={`mailto:${request.requesterEmail}`}
                >
                  {request.requesterEmail}
                </a>
              </p>
              <p>
                {t("app.requests.actions_dialog.contact.phone")}:{" "}
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
                {t("app.requests.actions_dialog.contact.message_label")}
              </label>
              <Textarea
                id="contact-msg"
                placeholder={t(
                  "app.requests.actions_dialog.contact.message_placeholder",
                )}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                {t("app.requests.actions_dialog.close")}
              </Button>
              <Button
                onClick={() => {
                  // TODO: send contact message
                  onClose();
                }}
              >
                {t("app.requests.actions_dialog.contact.send")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
