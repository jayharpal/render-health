import { useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// utils
import { fToNow } from 'src/utils/format-time';
// types
// components
import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearComments, getComments } from 'src/redux/slices/taskboard';

// ----------------------------------------------------------------------

type Props = {
  task_id: string;
};

export default function KanbanDetailsCommentList({ task_id }: Props) {
  const { comments } = useSelector((state: RootState) => state.taskboard);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearComments());
    dispatch(getComments(task_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const slides = comments
    .filter((comment) => comment.messageType === 'image')
    .map((slide) => ({ src: slide.message }));

  const lightbox = useLightBox(slides);

  if (!comments || !Array.isArray(comments) || comments.length === 0) {
    return null;
  }

  return (
    <>
      <Stack
        spacing={3}
        flexGrow={1}
        sx={{
          py: 3,
          px: 2.5,
          bgcolor: 'background.neutral',
        }}
      >
        {comments &&
          Array.isArray(comments) &&
          comments.length > 0 &&
          comments.map((comment) => (
            <Stack key={comment.task_id} direction="row" spacing={2}>
              <Avatar
                src={
                  comment?.user_data?.[0]?.name
                    ? comment?.user_data?.[0]?.name
                    : comment?.admin_data?.[0]?.email
                }
                alt={
                  comment?.user_data?.[0]?.name
                    ? comment?.user_data?.[0]?.name
                    : comment?.admin_data?.[0]?.email
                }
              />
              <Stack spacing={comment.messageType === 'image' ? 1 : 0.5} flexGrow={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle2">
                    {comment?.user_data?.[0]
                      ? (comment?.user_data?.[0]?.name as string)
                      : comment?.admin_data?.[0].email}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                    {fToNow(comment.createdAt)}
                  </Typography>
                </Stack>

                {comment.messageType === 'image' ? (
                  <Image
                    alt={comment.message}
                    src={comment.message}
                    onClick={() => lightbox.onOpen(comment.message)}
                    sx={{
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      transition: (theme) => theme.transitions.create(['opacity']),
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                  />
                ) : (
                  <Typography variant="body2">{comment.comment_text}</Typography>
                )}
              </Stack>
            </Stack>
          ))}
      </Stack>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}
