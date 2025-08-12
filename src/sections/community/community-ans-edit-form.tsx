'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'src/redux/store';
import { ICommunityQuestion } from 'src/types/community';
import { getCommunityAnswer, updateCommunityAnswer } from 'src/redux/slices/community_answer';

type Props = {
  currentCommunityAnswer?: ICommunityQuestion | null;
  onClose?: VoidFunction;
};
export default function CommunityAnsEditForm({ currentCommunityAnswer, onClose }: Props) {
  const dispatch = useDispatch();

  const NewCommunityQuestionSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
  });
  const defaultValues = useMemo(
    () => ({
      content: currentCommunityAnswer?.content || '',
    }),
    [currentCommunityAnswer]
  );

  const methods = useForm({
    resolver: yupResolver(NewCommunityQuestionSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      let postData;
      if (currentCommunityAnswer) {
        postData = {
          content: data.content,
        };
        await dispatch(updateCommunityAnswer(currentCommunityAnswer._id as string, postData));
        await dispatch(getCommunityAnswer());
      }
      onClose?.();
      dispatch(getCommunityAnswer());
    } catch (error) {
      console.error(error);
    }
  });

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
        <RHFTextField fullWidth multiline rows={3} name="content" placeholder="Ask your Answer" />

        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            Edit
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
