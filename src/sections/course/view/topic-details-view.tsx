'use client';

import { useEffect, useCallback, useState } from 'react';
// @mui
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
// _mock
import { POST_PUBLISH_OPTIONS } from 'src/_mock';
// api
// components
import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';
//
// import PostCommentList from '../post-comment-list';
// import PostCommentForm from '../post-comment-form';
import { dispatch, RootState, useSelector } from 'src/redux/store';
import { getTopicById } from 'src/redux/slices/topic';
import { TopicDetailsSkeleton } from '../topic-skeleton';
import TopicDetailsHero from '../topic-details-hero';
import TopicDetailsToolbar from '../topic-details-toolbar';

// ----------------------------------------------------------------------

// type Props = {
//   title: string;
// };
type TopicDetailsProps = {
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
};
export default function TopicDetailsView({
  courseId,
  subjectId,
  chapterId,
  topicId,
}: TopicDetailsProps) {
  const [publish, setPublish] = useState('');

  const { topic, isLoading, error } = useSelector((state: RootState) => state.topic);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (topicId) {
      dispatch(getTopicById(topicId as string));
    }
  }, [topicId]);

  const renderSkeleton = <TopicDetailsSkeleton />;

  const renderError = (
    <EmptyContent
      filled
      // title={`${postError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.courses.chapterId(
            courseId as string,
            subjectId as string,
            chapterId as string
          )}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );

  const renderPost = topic && (
    <>
      <TopicDetailsToolbar
        backLink={paths.dashboard.courses.chapterId(
          courseId as string,
          subjectId as string,
          chapterId as string
        )}
        editLink={paths.dashboard.post.edit(`${topic?.name}`)}
        liveLink={paths.post.details(`${topic?.name}`)}
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={POST_PUBLISH_OPTIONS}
      />

      <TopicDetailsHero name={topic.name} image={topic.image || '/logo/Render-helth.png'} />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="subtitle1" sx={{ mb: 5 }}>
          {topic.description}
        </Typography>

        <Markdown children={topic.content} />

        <Stack
          spacing={3}
          sx={{
            py: 3,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            // borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {topic?.tags?.map((tag) => <Chip key={tag} label={tag} variant="soft" />)}
          </Stack>

          {/* <Stack direction="row" alignItems="center">
            <FormControlLabel
              control={
                <Checkbox
                  defaultChecked
                  size="small"
                  color="error"
                  icon={<Iconify icon="solar:heart-bold" />}
                  checkedIcon={<Iconify icon="solar:heart-bold" />}
                />
              }
              label={fShortenNumber(post.totalFavorites)}
              sx={{ mr: 1 }}
            />

            <AvatarGroup
              sx={{
                [`& .${avatarGroupClasses.avatar}`]: {
                  width: 32,
                  height: 32,
                },
              }}
            >
              {post.favoritePerson.map((person) => (
                <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
              ))}
            </AvatarGroup>
          </Stack> */}
        </Stack>

        {/* <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
          <Typography variant="h4">Comments</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            ({post.comments.length})
          </Typography>
        </Stack> */}

        {/* <PostCommentForm /> */}

        {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}

        {/* <PostCommentList comments={post.comments} /> */}
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {isLoading && renderSkeleton}

      {error && renderError}

      {topic && renderPost}
    </Container>
  );
}
