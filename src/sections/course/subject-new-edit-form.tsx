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
import { createSubject, getSubjectByCourse, updateSubject } from 'src/redux/slices/subject';
import { ISubject } from 'src/types/subject';
import axios from 'src/utils/axios';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  currentSubject?: ISubject | null;
  onClose?: VoidFunction;
  courseId?: string;
};
export default function SubjectEditForm({ currentSubject, onClose, courseId }: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const NewUserSchema = Yup.object().shape({
    subject_name: Yup.string().required('Subject Name is required'),
    subject_image: Yup.string().required('Cover is required'),
    subject_video : Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      subject_name: currentSubject?.subject_name || '',
      subject_image: currentSubject?.subject_image || '',
      subject_video: currentSubject?.subject_video || '',
    }),
    [currentSubject]
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    // watch,
    formState: { isSubmitting },
    setValue,
  } = methods;

  // const values = watch();
  const onSubmit = handleSubmit(async (data: any) => {
    try {
      let postData;
      let res;
      if (currentSubject) {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
        };
        res = await dispatch(updateSubject(currentSubject._id as string, postData));
      } else {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
          course_id: courseId,
        };
        res = await dispatch(createSubject(postData));
      }
      if (res?.data?.status) {
        onClose?.();
        dispatch(getSubjectByCourse(courseId as string));
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
          setValue(`subject_image`, newFile.preview, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('subject_image', '');
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
        <RHFTextField name="subject_name" label="Subject Name" />
        <RHFTextField name="subject_video" label="Subject Video Link" />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <RHFUpload
            name="subject_image"
            maxSize={3145728}
            // onDrop={handleDrop}
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            onDelete={handleRemoveFile}
          />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {currentSubject ? 'Edit' : 'Create'}
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
