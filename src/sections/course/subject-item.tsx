// @mui
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDate } from 'src/utils/format-time';
// types
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button, Stack } from '@mui/material';
import { ISubject } from 'src/types/subject';
import { dispatch } from 'src/redux/store';
import { deleteSubject, getSubjectByCourse } from 'src/redux/slices/subject';
import SubjectNewFolderDialog from './subject-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  subject: ISubject;
  onDeleteRow: VoidFunction;
  isAdmin: boolean;
  // editRowData: ISubject | null;
  courseId: string;
};

export default function SubjectItem({ subject, onDeleteRow, courseId, isAdmin }: Props) {
  const popover = usePopover();
  const edit = useBoolean();
  const confirm = useBoolean();

  const { subject_name, subject_image, createdAt } = subject;

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteSubject(subject._id as string));
      if (res.data.status) {
        dispatch(getSubjectByCourse(courseId));
      }
      onDeleteRow();
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };
  return (
    <>

      <Card>
        {isAdmin && (
          <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
        <Stack sx={{ p: 3, pb: 2 }}>
          <Image
            alt={subject_image}
            src={subject_image || '/logo/Render-helth.png'}
            // ratio="1/1"
            sx={{ width: 60, height: 60, mb: 2, borderRadius: 1 }}
          />
          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                component={RouterLink}
                href={paths.dashboard.courses.subjectId(courseId as string, subject._id as string)}
                color="inherit"
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                  width: '100%'
                }}
              >
                {subject_name}
              </Link>
            }
            secondary={`Posted date: ${fDate(createdAt)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>
      </Card>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            edit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />

      <SubjectNewFolderDialog
        currentSubject={subject}
        open={edit.value}
        onClose={edit.onFalse}
        courseId={courseId}
      />
    </>
  );
}
