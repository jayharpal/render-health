// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
//
import { IChapter } from 'src/types/chapter';
import ChapterEditForm from './chapter-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentChapter?: IChapter | null;
  courseId?: string;
  subjectId?: string;
}

export default function ChapterNewFolderDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentChapter,
  courseId,
  subjectId,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentChapter ? 'Edit Chapter' : 'Create New Chapter'}{' '}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <ChapterEditForm
          currentChapter={currentChapter}
          onClose={onClose}
          courseId={courseId}
          subjectId={subjectId}
        />
      </DialogContent>
    </Dialog>
  );
}
