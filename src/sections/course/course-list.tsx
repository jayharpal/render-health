import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';
// types
import { ICourse } from 'src/types/course';
import { useAuthContext } from 'src/auth/hooks';
import { useDebounce } from 'src/hooks/use-debounce';
import CourseItem from './course-item';
import { CourseSkeleton } from './course-skeleton';

// ----------------------------------------------------------------------

type Props = {
  courses: ICourse[];
  notFound: boolean;
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
};

const ITEMS_PER_PAGE = 6;

export default function CourseList({ courses, notFound, onOpenConfirm, onDeleteRow }: Props) {
  const { isAdmin } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const debouncedPage = useDebounce(currentPage);

  const startIndex = (debouncedPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentCourses = courses.slice(startIndex, endIndex);

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
          md: 'repeat(3, 1fr)',
        }}
      >
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <CourseSkeleton />
          ))
          :
          currentCourses.map((course) => (
            <CourseItem
              key={course._id}
              course={course}
              isAdmin={isAdmin}
              onDeleteRow={() => onDeleteRow(course._id as string)}
            />
          ))}
      </Box>

      {courses.length > ITEMS_PER_PAGE && (
        <Pagination
          count={Math.ceil(courses.length / ITEMS_PER_PAGE)}
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
