import * as Yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, { RHFTextField, RHFUpload } from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from 'src/auth/hooks';
import { ICourse } from 'src/types/course';
import { createCourse, getCourses, updateCourse } from 'src/redux/slices/course';
import { Typography } from '@mui/material';
import axios from 'src/utils/axios';
// ----------------------------------------------------------------------

type Props = {
  currentCourse?: ICourse | null;
  onClose?: VoidFunction;
};
export default function CourseNewEditForm({ currentCourse, onClose }: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const NewUserSchema = Yup.object().shape({
    course_name: Yup.string().required('Course Name is required'),
    course_image: Yup.string().required('Cover is required'),
    course_video : Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      course_name: currentCourse?.course_name || '',
      course_video: currentCourse?.course_video || '',
      course_image: currentCourse?.course_image || '',
    }),
    [currentCourse]
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      let postData;
      let res;
      if (currentCourse) {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
        };
        res = await dispatch(updateCourse(currentCourse._id as string, postData));
      } else {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
        };
        res = await dispatch(createCourse(postData));
      }
      if (res?.data?.status) {
        onClose?.();
        dispatch(getCourses());
      } else {
        onClose?.();
      }
    } catch (error) {
      console.error(error);
      onClose?.();
    }
  });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        const imageUrl = response.data.result.image_url;
        const newFile = Object.assign(file, {
          preview: imageUrl,
        });

        if (file) {
          setValue(`course_image`, newFile.preview, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('course_image', '');
  }, [setValue]);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="course_name" label="Course Name" />
        <RHFTextField name="course_video" label="Course Video Link" />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <RHFUpload
            name="course_image"
            maxSize={3145728}
            // onDrop={handleDrop}
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            onDelete={handleRemoveFile}
          />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {currentCourse ? 'Edit' : 'Create'}
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
