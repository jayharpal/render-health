'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormProvider, { RHFTextField, RHFAutocompleteMultiple } from 'src/components/hook-form';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { ICommunityQuestion } from 'src/types/community';
import {
  createCommunityQuestion,
  getAnswerFromLLM,
  getCommunityQuestion,
  updateCommunityQuestion,
} from 'src/redux/slices/community_question';
import { useAuthContext } from 'src/auth/hooks';
import MagicButton from 'src/components/magic-button/button';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';

type Props = {
  currentCommunityQuestion?: ICommunityQuestion | null;
  onClose?: VoidFunction;
};

interface PostData {
  user_id: string;
  content: string;
  tags: string[] | [];
  question_id?: string;
}

export default function CommunityNewEditForm({ currentCommunityQuestion, onClose }: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { isLLMLoading } = useSelector((state: RootState) => state.community_question);
  const router = useRouter();

  const NewCommunityQuestionSchema = Yup.object().shape({
    content: Yup.string().required('Content is required'),
    tags: Yup.array().min(1, 'Tags are required'),
  });

  const defaultValues = useMemo(
    () => ({
      content: currentCommunityQuestion?.content || '',
      tags: currentCommunityQuestion?.tags || [],
    }),
    [currentCommunityQuestion]
  );

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(NewCommunityQuestionSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    trigger,
    watch,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      let postData;
      if (currentCommunityQuestion) {
        postData = {
          content: data.content,
          tags: data.tags,
        };
        await dispatch(updateCommunityQuestion(currentCommunityQuestion._id as string, postData));
      } else {
        postData = {
          user_id: user?.id || user?._id,
          content: data.content,
          tags: data.tags,
        };
        await dispatch(createCommunityQuestion(postData));
      }
      onClose?.();
      dispatch(getCommunityQuestion());
    } catch (error) {
      console.error(error);
    }
  });

  const handleLLMResponse = async () => {
    try {
      await trigger(["content", "tags"])
      if (!!errors.tags || !!errors.content || values.content.trim() === "" || values?.tags?.length === 0) {
        return;
      }
      
      const postData: PostData = {
        user_id: user?.id || user?._id,
        content: values.content,
        tags: values.tags || [],
      };

      if(currentCommunityQuestion) {
        postData.question_id = currentCommunityQuestion?._id
      }
      const res = await dispatch(getAnswerFromLLM(postData));
      if (res?.data?.status) {
        if(currentCommunityQuestion?._id) {
          router.push(paths.dashboard.community.id(currentCommunityQuestion._id))
        } else {
          router.push(paths.dashboard.community.id(res?.data?.result?._id))
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <RHFTextField name="content" placeholder="Ask your question" />
        <RHFAutocompleteMultiple
          placeholder="Select Tags"
          name="tags"
          multiple
          freeSolo
          options={[]}
        />
        <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center" justifyContent="space-between">
          <Stack alignItems="center">
            <MagicButton loading={isLLMLoading} onClick={handleLLMResponse}>Ask TFZ AI</MagicButton>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" justifyContent="space-between">
            <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
              {currentCommunityQuestion ? 'Edit' : 'Ask'}
            </LoadingButton>
            <LoadingButton onClick={onClose} variant="soft">
              Cancel
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </FormProvider>
  );
}
