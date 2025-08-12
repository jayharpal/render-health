import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { useAuthContext } from 'src/auth/hooks';
import { ISubject } from 'src/types/subject';
import { useDebounce } from 'src/hooks/use-debounce';
import SubjectItem from './subject-item';
import { SubjectSkeleton } from './subject-skeleton';

// ----------------------------------------------------------------------

type Props = {
  subject: ISubject[];
  notFound: boolean;
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
  courseId: string;
};

const ITEMS_PER_PAGE = 12;

export default function SubjectList({
  subject,
  notFound,
  onOpenConfirm,
  onDeleteRow,
  courseId,
}: Props) {
  const { isAdmin } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedPage = useDebounce(currentPage);

  const startIndex = (debouncedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentSubjects = subject.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setIsLoading(true);
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
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
      >
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <SubjectSkeleton />
          ))
          :
          currentSubjects.map((subjectItem) => (
            <SubjectItem
              courseId={courseId}
              key={subjectItem._id}
              subject={subjectItem}
              isAdmin={isAdmin}
              onDeleteRow={() => onDeleteRow(subjectItem._id as string)}
            />
          ))}
      </Box>

      {subject.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(subject.length / ITEMS_PER_PAGE)}
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
