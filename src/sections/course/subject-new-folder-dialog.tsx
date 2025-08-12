// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
//
import { ISubject } from 'src/types/subject';
import SubjectEditForm from './subject-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentSubject?: ISubject | null;
  courseId?: string;
}

export default function SubjectNewFolderDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentSubject,
  courseId,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentSubject ? 'Edit Subject' : 'Create New Subject'}{' '}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <SubjectEditForm currentSubject={currentSubject} onClose={onClose} courseId={courseId} />
      </DialogContent>
    </Dialog>
  );
}
