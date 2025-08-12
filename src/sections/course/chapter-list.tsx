import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { IChapter } from 'src/types/chapter';
import { useDebounce } from 'src/hooks/use-debounce';
import ChapterItem from './chapter-item';
import { ChapterTopicSkeleton } from './chapter-topic-skeleton';

// ----------------------------------------------------------------------

type Props = {
  chapter: IChapter[];
  onDeleteRow: (id: string) => void;
  isAdmin: boolean;
  courseId: string;
  subjectId: string;
};

const ITEMS_PER_PAGE = 10;

export default function ChapterList({ chapter, subjectId, onDeleteRow, courseId, isAdmin }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedPage = useDebounce(currentPage, 2000);

  const startIndex = (debouncedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentChapters = chapter.slice(startIndex, endIndex);

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
          currentChapters.map((chapterItem) => (
            <ChapterItem
              subjectId={subjectId}
              courseId={courseId}
              key={chapterItem._id}
              chapter={chapterItem}
              isAdmin={isAdmin}
              onDeleteRow={() => onDeleteRow(chapterItem._id as string)}
            />
          ))}
      </Box>

      {chapter.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(chapter.length / ITEMS_PER_PAGE)}
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
