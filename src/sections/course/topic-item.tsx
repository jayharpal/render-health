// @mui
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// import ListItemText from '@mui/material/ListItemText';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
// import { fDate } from 'src/utils/format-time';
// types
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button, Stack } from '@mui/material';
import { ITopic } from 'src/types/topic';
// import TextMaxLine from 'src/components/text-max-line';
import { dispatch } from 'src/redux/store';
import { deleteTopic, getTopicByChapter } from 'src/redux/slices/topic';
import TopicNewFolderDialog from './topic-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  topic: ITopic;
  onDeleteRow: VoidFunction;
  isAdmin: boolean;
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
};

export default function TopicItem({
  topic,
  onDeleteRow,
  courseId,
  subjectId,
  chapterId,
  isAdmin,
}: Props) {
  const popover = usePopover();
  const edit = useBoolean();
  const confirm = useBoolean();
  const { name, image } = topic;

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteTopic(topic._id as string));
      if (res.data.status) {
        dispatch(getTopicByChapter(chapterId as string));
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
        <Stack sx={{ p: 2 }} flexDirection="row" alignItems="center" columnGap="20px">
          <Image
            alt={name}
            src={image || '/logo/Render-helth.png'}
            // ratio="1/1"
            sx={{ width: 48, height: 48, borderRadius: 1 }}
          />
          <Link
            component={RouterLink}
            href={paths.dashboard.courses.topic(
              courseId as string,
              subjectId as string,
              chapterId as string,
              topic._id as string
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
            {name}
          </Link>
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="left-top"
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
            popover.onClose();
            // router.push(paths.dashboard.post.details(title));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
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

      <TopicNewFolderDialog
        currentTopic={topic}
        open={edit.value}
        onClose={edit.onFalse}
        courseId={courseId}
        subjectId={subjectId}
        chapterId={chapterId}
      />
    </>
  );
}
