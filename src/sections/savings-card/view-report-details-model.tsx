// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import ViewReportDetailsNewEditForm from './view-report-details-new-edit-from';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentData?: any | null;
}

export default function ViewReportDetailsDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentData,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Transactions Details</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <ViewReportDetailsNewEditForm onClose={onClose} currentData={currentData} />
      </DialogContent>
    </Dialog>
  );
}
