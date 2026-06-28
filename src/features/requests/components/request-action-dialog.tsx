import { useEffect, useState } from "react";
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
import { useUpdateRequestStatus } from "@/features/requests/hooks/use-update-request-status";
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
  const [message, setMessage] = useState("");
  const { updateStatusAsync, isLoading, isError, reset } =
    useUpdateRequestStatus();

  useEffect(() => {
    if (action) {
      setMessage("");
      reset();
    }
  }, [action, reset]);

  const handleConfirm = async (status: "approved" | "rejected") => {
    try {
      await updateStatusAsync({
        requestId: request.id,
        status,
        rejectionReason: status === "rejected" ? message : undefined,
      });
      onClose();
    } catch {
      // Error surfaced inline via `isError`; keep the dialog open.
    }
  };

  const decisionConfig = {
    approve: { status: "approved", variant: "default" },
    reject: { status: "rejected", variant: "destructive" },
  } as const;

  return (
    <Dialog open={action !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        {(action === "approve" || action === "reject") && (
          <>
            <DialogHeader>
              <DialogTitle>
                {t(`app.requests.actions_dialog.${action}.title`)}
              </DialogTitle>
              <DialogDescription>
                {t(`app.requests.actions_dialog.${action}.description`, {
                  petName: request.petName,
                  requesterName: request.requesterName,
                })}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 pb-4">
              <label
                className="text-sm font-medium"
                htmlFor="request-action-msg"
              >
                {t(`app.requests.actions_dialog.${action}.message_label`)}
              </label>
              <Textarea
                id="request-action-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t(
                  `app.requests.actions_dialog.${action}.message_placeholder`,
                )}
              />
            </div>
            {isError && (
              <p className="text-destructive text-sm">
                {t("app.requests.actions_dialog.error")}
              </p>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                {t("app.requests.actions_dialog.cancel")}
              </Button>
              <Button
                variant={decisionConfig[action].variant}
                onClick={() => handleConfirm(decisionConfig[action].status)}
                disabled={isLoading}
              >
                {isLoading
                  ? t("app.requests.actions_dialog.processing")
                  : t(`app.requests.actions_dialog.${action}.confirm`)}
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
            <div className="grid gap-2 pb-4 text-sm">
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
              {request.requesterPhone && (
                <p>
                  {t("app.requests.actions_dialog.contact.phone")}:{" "}
                  <a
                    className="text-primary underline"
                    href={`tel:${request.requesterPhone}`}
                  >
                    {request.requesterPhone}
                  </a>
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={onClose}>
                {t("app.requests.actions_dialog.close")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
