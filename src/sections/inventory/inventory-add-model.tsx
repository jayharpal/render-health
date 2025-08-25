// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import AddInventoryNewEditFrom from './inventory-new-edit-from';

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

export default function AddInventoryDialog({
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
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>{currentBooking ? "Edit Inventory" : "Add Inventory"}</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <AddInventoryNewEditFrom currentBooking={currentBooking} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
