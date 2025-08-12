import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFEditor,
  RHFTextField,
  RHFUpload,
} from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'src/utils/axios';
import { Typography } from '@mui/material';
import { ITopic } from 'src/types/topic';
import Chip from '@mui/material/Chip';
import { createTopic, getTopicByChapter, updateTopic } from 'src/redux/slices/topic';

// ----------------------------------------------------------------------

type Props = {
  currentTopic?: ITopic | null;
  onClose?: VoidFunction;
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
};
export default function TopicEditForm({
  currentTopic,
  onClose,
  courseId,
  subjectId,
  chapterId,
}: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Chapter Name is required'),
    description: Yup.string().required('Description is required'),
    tags: Yup.array().of(Yup.string()).min(2, 'Must have at least 2 tags'),
    content: Yup.string().required('Content is required'),
    image: Yup.mixed<string>().nullable().required('Cover is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentTopic?.name || '',
      description: currentTopic?.description || '',
      tags: currentTopic?.tags || [],
      content: currentTopic?.content || '',
      image: currentTopic?.image || '',
    }),
    [currentTopic]
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

  useEffect(() => {
    if (currentTopic) {
      setValue('tags', currentTopic.tags || []);
    }
  }, [currentTopic, setValue]);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      let postData;
      let res;
      if (currentTopic) {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
        };
        res = await dispatch(updateTopic(currentTopic._id as string, postData));
      } else {
        postData = {
          ...data,
          organization_id: user?.organization_id,
          user_id: user?._id,
          course_id: courseId,
          subject_id: subjectId,
          chapter_id: chapterId,
        };
        res = await dispatch(createTopic(postData));
      }
      if (res?.data?.status) {
        onClose?.();
        dispatch(getTopicByChapter(chapterId as string));
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
          setValue(`image`, newFile.preview, { shouldValidate: true });
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [setValue]
  );

  const handleRemoveFile = useCallback(() => {
    setValue('image', '');
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
        <RHFTextField name="name" label="Topic Name" />
        <RHFTextField name="description" label="Description" multiline rows={3} />
        <RHFAutocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          options={[]}
          // options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <RHFEditor simple name="content" />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <RHFUpload
            name="image"
            maxSize={3145728}
            // onDrop={handleDrop}
            onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            onDelete={handleRemoveFile}
          />
        </Stack>
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {currentTopic ? 'Edit' : 'Create'}
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
