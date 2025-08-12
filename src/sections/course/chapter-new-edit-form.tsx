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
import axios from 'src/utils/axios';
import { Typography } from '@mui/material';
import { IChapter } from 'src/types/chapter';
import { createChapter, getChapterBySubject, updateChapter } from 'src/redux/slices/chapter';

// ----------------------------------------------------------------------

type Props = {
  currentChapter?: IChapter | null;
  onClose?: VoidFunction;
  courseId?: string;
  subjectId?: string;
};
export default function ChapterEditForm({ currentChapter, onClose, courseId, subjectId }: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const NewUserSchema = Yup.object().shape({
    chapter_name: Yup.string().required('Chapter Name is required'),
    chapter_image: Yup.string().required('Cover is required'),
    chapter_video : Yup.mixed(),
  });

  const defaultValues = useMemo(
    () => ({
      chapter_name: currentChapter?.chapter_name || '',
      chapter_image: currentChapter?.chapter_image || '',
      chapter_video: currentChapter?.chapter_video || '',
    }),
    [currentChapter]
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
      if (currentChapter) {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
        };
        res = await dispatch(updateChapter(currentChapter._id as string, postData));
      } else {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
          course_id: courseId,
          subject_id: subjectId,
        };
        res = await dispatch(createChapter(postData));
      }
      if (res?.data?.status) {
        onClose?.();
        dispatch(getChapterBySubject(subjectId as string));
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
          setValue(`chapter_image`, newFile.preview, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('chapter_image', '');
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
        <RHFTextField name="chapter_name" label="Chapter Name" />
        <RHFTextField name="chapter_video" label="Chapter Video Link" />
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <RHFUpload
            name="chapter_image"
            maxSize={3145728}
            // onDrop={handleDrop}
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            onDelete={handleRemoveFile}
          />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {currentChapter ? 'Edit' : 'Create'}
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
