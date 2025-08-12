import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { ITopic } from 'src/types/topic';
import { useAuthContext } from 'src/auth/hooks';
import { useDebounce } from 'src/hooks/use-debounce';
import TopicItem from './topic-item';
import { ChapterTopicSkeleton } from './chapter-topic-skeleton';

// ----------------------------------------------------------------------

type Props = {
  topic: ITopic[];
  onDeleteRow: (id: string) => void;
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
};

const ITEMS_PER_PAGE = 10;

export default function TopicList({ topic, onDeleteRow, courseId, subjectId, chapterId }: Props) {
  const { isAdmin } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedPage = useDebounce(currentPage);

  const startIndex = (debouncedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentTopics = topic.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setIsLoading(true)
  };

  useEffect(() => {
    if (debouncedPage === currentPage) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [debouncedPage, currentPage]);

  return (
    <>
      <Box display="flex" flexDirection="column" rowGap="15px">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <ChapterTopicSkeleton />
          ))
          :
          currentTopics.map((topicItem) => (
            <TopicItem
              chapterId={chapterId}
              subjectId={subjectId}
              courseId={courseId}
              key={topicItem._id}
              topic={topicItem}
              isAdmin={isAdmin}
              onDeleteRow={() => onDeleteRow(topicItem._id as string)}
            />
          ))}
      </Box>

      {topic.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(topic.length / ITEMS_PER_PAGE)}
          page={debouncedPage}
          onChange={handlePageChange}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}
