import { Dialog, DialogOverlay, DialogPortal } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';

export const SignInLoadingDialog = ({ isLoading }: { isLoading: boolean }) => (
  <Dialog open={isLoading}>
    <DialogPortal>
      <DialogOverlay />
      <Spinner absolute size="large" show={isLoading} />
    </DialogPortal>
  </Dialog>
);
