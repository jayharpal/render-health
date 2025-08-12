// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
//
import { ICourse } from 'src/types/course';
import CourseNewEditForm from './course-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentCourse?: ICourse | null;
}

export default function CourseNewFolderDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentCourse,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentCourse ? 'Edit Course' : 'Create New Course'}{' '}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <CourseNewEditForm currentCourse={currentCourse} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
