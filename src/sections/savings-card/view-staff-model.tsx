// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import StaffNewEditFrom from './add-staff-new-edit-from';
import StaffViewFrom from './view-staff-new-edit-from';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentBooking?: any | null;
}

export default function ViewStaffDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentBooking,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>View Staff</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <StaffViewFrom onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
