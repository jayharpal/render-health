// @mui
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog, { DialogProps } from '@mui/material/Dialog';
//
import { IProject } from 'src/types/projects';
import ProjectNewEditForm from './project-new-edit-form';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  title?: string;
  //
  onCreate?: VoidFunction;
  onUpdate?: VoidFunction;
  //
  open: boolean;
  onClose: VoidFunction;
  currentProject?: IProject | null;
}

export default function ProjectNewFolderDialog({
  title,
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  currentProject,
  //
  ...other
}: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        {' '}
        {currentProject ? 'Edit Project' : 'Create New Project'}{' '}
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <ProjectNewEditForm currentProject={currentProject} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
