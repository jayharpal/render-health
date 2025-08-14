// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import AddFacilitiesNewEditFrom from './facilities-new-edit-from';

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

export default function AddFacilitiesDialog({
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
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {currentBooking ? "Edit Hospital" : "Add New Hospital"} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <AddFacilitiesNewEditFrom currentBooking={currentBooking} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
