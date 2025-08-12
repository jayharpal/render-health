// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
//
import { ITopic } from 'src/types/topic';
import TopicEditForm from './topic-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentTopic?: ITopic | null;
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
}

export default function TopicNewFolderDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentTopic,
  courseId,
  subjectId,
  chapterId,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentTopic ? 'Edit Topic' : 'Create New Topic'}{' '}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <TopicEditForm
          currentTopic={currentTopic}
          onClose={onClose}
          courseId={courseId}
          chapterId={chapterId}
          subjectId={subjectId}
        />
      </DialogContent>
    </Dialog>
  );
}
