import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import { ICommunityQuestion } from 'src/types/community';
import CommunityNewEditForm from './community-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentCommunityQuestion?: ICommunityQuestion | null;
}

export default function CommunityNewEditDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentCommunityQuestion,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentCommunityQuestion ? 'Edit Question' : 'Ask Question'}{' '}
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <CommunityNewEditForm
          currentCommunityQuestion={currentCommunityQuestion}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
