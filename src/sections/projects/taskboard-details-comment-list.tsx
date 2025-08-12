"use client"

import { useEffect, useRef } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
// utils
import { fToNow } from 'src/utils/format-time';
// types
// components
import Scrollbar from 'src/components/scrollbar';
import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearComments, getComments } from 'src/redux/slices/taskboard';
import TaskboardCommentsSkeleton from './taskboard-comments-skeleton';

// ----------------------------------------------------------------------

type Props = {
  task_id: string;
};

export default function KanbanDetailsCommentList({ task_id }: Props) {
  const { comments, isCommentLoading } = useSelector((state: RootState) => state.taskboard);
  const scrollbarRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearComments());
    dispatch(getComments(task_id));
  }, [dispatch, task_id]);

  useEffect(() => {
    // Scroll to bottom after comments are loaded
    if (scrollbarRef.current) {
      const scrollbar = scrollbarRef.current;
      if (scrollbar) {
        scrollbar.scrollTo({
          top: scrollbar.scrollHeight,
          behavior: "smooth",
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const slides = comments
    .filter((comment) => comment.messageType === 'image')
    .map((slide) => ({ src: slide.message }));

  const lightbox = useLightBox(slides);

  console.log(isCommentLoading, "isCommentLoading")

  return (
    <Scrollbar
      ref={scrollbarRef}
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        overflowX: "hidden"
      }}
    >
      {
        !isCommentLoading &&
        comments &&
        Array.isArray(comments) &&
        comments.length > 0 && (
          <Stack
            spacing={3}
            flexGrow={1}
            sx={{
              py: 3,
              px: 2.5,
              bgcolor: 'background.neutral',
            }}
          >
            {
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
                    <Stack direction="row" alignItems="center" justifyContent="space-between" columnGap={1} flexWrap="wrap">
                      <Stack direction="row" alignItems="center" justifyContent="space-between" columnGap={1} flexWrap="wrap">
                        <Typography variant="subtitle2">
                          {comment?.user_data?.[0]
                            ? (comment?.user_data?.[0]?.name as string)
                            : comment?.admin_data?.[0]?.email}
                        </Typography>
                        {comment.is_private && (
                          <Chip
                            label="Private"
                            size="small"
                            color='secondary'
                            variant='soft'
                            sx={{
                              height: "20px",
                              fontSize: "11px"
                            }}
                          />
                        )}
                      </Stack>
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
                      <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                        {comment.comment_text}
                      </Typography>
                    )}
                  </Stack>
                </Stack>
              ))
            }
          </Stack>
        )
      }

      {
        isCommentLoading && (
          <TaskboardCommentsSkeleton />
        )
      }

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </Scrollbar>
  );
}
