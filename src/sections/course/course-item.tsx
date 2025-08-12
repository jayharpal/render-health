import { useState } from 'react';
// @mui
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// utils
import { fDateTime } from 'src/utils/format-time';
// types
// components
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ICourse } from 'src/types/course';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Button } from '@mui/material';
import ReactPlayer from 'react-player';
import { deleteCourse, getCourses, startVideoLoading, stopVideoLoading } from 'src/redux/slices/course';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import CourseNewFolderDialog from './course-new-folder-dialog';

type Props = {
  course: ICourse;
  onDeleteRow: VoidFunction;
  isAdmin: boolean;
};

export default function CourseItem({ course, onDeleteRow, isAdmin }: Props) {
  const popover = usePopover();
  const edit = useBoolean();
  const confirm = useBoolean();
  const [showVideo, setShowVideo] = useState(false);
  const dispatch = useDispatch();
  const { videoLoadingId } = useSelector((state: RootState) => state.course);

  const handleShowVideo = () => {
    if (course.course_video) {
      dispatch(startVideoLoading(course._id));
      setShowVideo(true);
      setTimeout(() => {
        dispatch(stopVideoLoading());
      }, 2000);
    }
  };
  const { course_name, createdAt, course_image, course_video } = course;

  const isLoading = videoLoadingId === course._id;
  const renderImagesWithHover = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '164px',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <Image
        alt={course_name}
        src={course_image || '/logo/Render-helth.png'}
        sx={{
          borderRadius: 1,
          height: 164,
          width: 1,
          objectFit: 'cover',
        }}
      />
      {course_video && (
        <IconButton
          onClick={handleShowVideo}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.6)',
            opacity: 0, // Hidden initially
            transition: 'opacity 0.3s ease-in-out',
            '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)', opacity: 1 },
            '&:hover svg': { transform: 'scale(1.1)' },
          }}
          className="play-button"
        >
          <Iconify icon="mdi:play-circle" width={48} height={48} />
        </IconButton>
      )}
    </div>
  );

  const renderContent = (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '164px',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      {isLoading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            borderRadius: 1,
            height: '100%',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      {showVideo && !isLoading && (
        <ReactPlayer
          url={course_video}
          controls
          width="100%"
          height="100%"
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      )}
      {!showVideo && renderImagesWithHover}
    </div>
  );

  const handleDelete = async () => {
    try {
      const res = await dispatch(deleteCourse(course._id as string));
      if (res.data.status) {
        dispatch(getCourses());
      }
      onDeleteRow();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <Card
        sx={{
          p: (theme) => theme.spacing(2.5, 2.5, 2, 2.5),
        }}
      >
        {isAdmin && (
          <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', bottom: 13, right: 0 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}

        {renderContent}

        <ListItemText
          sx={{
            mt: 2,
            maxWidth: '300px',
          }}
          primary={`Posted date: ${fDateTime(createdAt)}`}
          secondary={
            <Link
              component={RouterLink}
              href={paths.dashboard.courses.id(course._id as string)}
              color="inherit"
            >
              {course_name}
            </Link>
          }
          primaryTypographyProps={{
            typography: 'caption',
            color: 'text.disabled',
          }}
          secondaryTypographyProps={{
            mt: 1,
            noWrap: true,
            component: 'span',
            color: 'text.primary',
            typography: 'subtitle1',
          }}
        />
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

      <CourseNewFolderDialog currentCourse={course} open={edit.value} onClose={edit.onFalse} />
    </>
  );
}
