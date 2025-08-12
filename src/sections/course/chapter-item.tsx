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
import { IChapter } from 'src/types/chapter';
import { dispatch } from 'src/redux/store';
import { deleteChapter, getChapterBySubject } from 'src/redux/slices/chapter';
import ChapterNewFolderDialog from './chapter-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  chapter: IChapter;
  onDeleteRow: VoidFunction;
  isAdmin: boolean;
  // editRowData: ISubject | null;
  courseId: string;
  subjectId: string;
};

export default function ChapterItem({ chapter, onDeleteRow, courseId, subjectId, isAdmin }: Props) {
  const popover = usePopover();
  const edit = useBoolean();
  const confirm = useBoolean();

  const { chapter_name, chapter_image, createdAt } = chapter;

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteChapter(chapter._id as string));
      if (res.data.status) {
        dispatch(getChapterBySubject(subjectId));
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
          <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 25, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
        <Stack
          sx={{ p: 2, alignItems: 'center' }}
          flexDirection="row"
          columnGap="20px"
        >
          <Image
            alt={chapter_name}
            src={chapter_image || '/logo/Render-helth.png'}
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1,
              flexShrink: 0,
            }}
          />
          <ListItemText
            primary={
              <Link
                component={RouterLink}
                href={paths.dashboard.courses.chapterId(
                  courseId as string,
                  subjectId as string,
                  chapter._id as string
                )}
                color="inherit"
                sx={{
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '30%',
                  width: '100%'
                }}
              >
                {chapter_name}
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

      <ChapterNewFolderDialog
        currentChapter={chapter}
        open={edit.value}
        onClose={edit.onFalse}
        courseId={courseId}
        subjectId={subjectId}
      />
    </>
  );
}
