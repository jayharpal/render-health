'use client';

import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useSnackbar } from 'src/components/snackbar';
// redux
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification } from 'src/redux/slices/taskboard';
import { getQuestionById, updateCommunityQuestion } from 'src/redux/slices/community_question';
import { Box } from '@mui/system';
import {
  createCommunityAnswer,
  deleteCommunityAnswer,
  getAnswersByQuestionId,
} from 'src/redux/slices/community_answer';
import { useAuthContext } from 'src/auth/hooks';
import {
  Avatar,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Skeleton,
  Switch,
} from '@mui/material';
import { fToNow } from 'src/utils/format-time';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TableNoData } from 'src/components/table';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AIResponseCard from 'src/components/ai/ai-response-card';
import CommunityAnsEditForm from '../community-ans-edit-form';

// ---------------------------------------------------------------------

type CommunityQuestionProps = {
  questionId: string;
};

export default function CommunityQuestionAnswerView({ questionId }: CommunityQuestionProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user, isAdmin } = useAuthContext();
  const popover = usePopover();
  const confirm = useBoolean();
  const open = useBoolean(false);

  const [currentAnswerData, setCurrentAnswerData] = useState({});
  const handleOpenDialog = () => {
    popover.onClose();
    open.onTrue();
  };
  const handleCloseDialog = () => {
    open.onFalse();
  };

  const handleOpeneditdelete = (event: React.MouseEvent<HTMLElement>, community_answer: any) => {
    popover.onOpen(event);
    setCurrentAnswerData(community_answer);
  };

  const {
    isLoading: question_Loading,
    notification: question_Notification,
    variant: question_Variant,
  } = useSelector((state: RootState) => state.community_question);

  const {
    isLoading: answer_Loading,
    notification: answer_Notification,
    variant: answer_Variant,
  } = useSelector((state: RootState) => state.community_answer);

  const skeletonArray = Array.from({ length: 5 }, (_, index) => index);

  const { community_questions } = useSelector((state: RootState) => state.community_question);
  const { community_answers } = useSelector((state: RootState) => state.community_answer);

  const [isPrivate, setIsPrivate] = useState(false);

  const isSelf = user?._id === community_questions?.user_id;

  useEffect(() => {
    if (community_questions) {
      setIsPrivate(community_questions?.is_private as boolean);
    }
  }, [community_questions]);

  useEffect(() => {
    dispatch(getQuestionById(questionId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  useEffect(() => {
    dispatch(getAnswersByQuestionId(questionId as string));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  const defaultValues = useMemo(
    () => ({
      content: '',
    }),
    []
  );

  const NewCommunityAnswerSchema = Yup.object().shape({
    content: Yup.string().required('Answer is required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewCommunityAnswerSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const postData = {
        user_id: user?.id || user?._id,
        content: data?.content,
        community_question_id: questionId,
      };
      const res = await dispatch(createCommunityAnswer(postData));
      if (res?.data?.status) {
        dispatch(getAnswersByQuestionId(questionId as string));
        reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  });

  useEffect(() => {
    if (question_Notification) {
      enqueueSnackbar(question_Notification, { variant: question_Variant });
      dispatch(clearNotification());
    }
  }, [question_Notification, dispatch, enqueueSnackbar, question_Variant]);

  useEffect(() => {
    if (answer_Notification) {
      enqueueSnackbar(answer_Notification, { variant: answer_Variant });
      dispatch(clearNotification());
    }
  }, [answer_Notification, dispatch, enqueueSnackbar, answer_Variant]);

  const handleDelete = async (community_answer: any) => {
    try {
      const res = await dispatch(deleteCommunityAnswer(community_answer._id as string));
      if (res.data.status) {
        dispatch(getAnswersByQuestionId(questionId as string));
        confirm.onFalse();
      }
    } catch (error) {
      console.error('Error deleting Answered:', error);
    }
  };

  const handleIsPrivate = async (is_private: boolean) => {
    try {
      const postData = {
        is_private
      }
      if (community_questions?._id) {
        await dispatch(updateCommunityQuestion(community_questions?._id as string, postData));
        dispatch(getQuestionById(community_questions?._id as string));
      }
    } catch (error) {
      console.error('Error deleting Answered:', error);
    }
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Community
      </Typography>
      <Card elevation={1} sx={{ display: 'flex', flexDirection: 'column', px: 3, py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap">
          <Stack direction="row" gap={0.5} alignItems="center" flexWrap="wrap">
            <Typography fontSize="18px" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>
              Question :
            </Typography>
            {question_Loading ? (
              <Skeleton>
                <Typography fontSize="18px" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>
                  {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                  {'community_questions?.content'}
                </Typography>
              </Skeleton>
            ) : (
              <Typography fontSize="18px" fontWeight="bold" sx={{ wordBreak: 'break-all' }}>
                {community_questions?.content}
              </Typography>
            )}
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fToNow(community_questions?.createdAt)}
          </Typography>
        </Stack>
        {community_questions?.updatedAt &&
          community_questions.updatedAt !== community_questions.createdAt && (
            <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
              (edited)
            </Typography>
          )}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10px',
              marginTop: "10px"
            }}
          >
            <RHFTextField fullWidth multiline rows={3} name="content" placeholder="Your Answer" />
            <Stack direction="row" gap={2} alignItems="center">
              <LoadingButton
                type="submit"
                variant="contained"
                size="medium"
                loading={isSubmitting}
                disabled={question_Loading}
                sx={{ px: 4 }}
              >
                Answer
              </LoadingButton>
              {
                (isSelf || isAdmin) && (
                  <Stack direction="row" alignItems="center">
                    <Switch
                      onChange={(e) => handleIsPrivate(e.target.checked)}
                      checked={isPrivate}
                      disabled={question_Loading}
                    />
                    <Typography
                      fontSize="15px"
                      fontWeight="bold"
                    >
                      Private
                    </Typography>
                  </Stack>
                )
              }
            </Stack>
          </Box>
        </FormProvider>
      </Card>

      {
        community_questions?.llm_response && (
          <AIResponseCard llm_response={community_questions.llm_response} />
        )
      }

      <Typography fontSize="18px" fontWeight="bold" padding={2}>
        Answers :
      </Typography>

      <Stack rowGap="10px">
        <>
          {!answer_Loading &&
            community_answers &&
            Array.isArray(community_answers) &&
            community_answers.length > 0 &&
            community_answers.map((community_answer) => (
              <Stack
                key={community_answer._id}
                sx={{
                  padding: { xs: 0, sm: 2 },
                  '&:hover': {
                    backgroundColor: 'background.paper',
                    boxShadow: theme.customShadows.z20,
                    borderRadius: 2,
                  },
                }}
                direction="row"
                spacing={2}
              >
                <Avatar
                  src={community_answer?.user?.name || community_answer?.user?.email}
                  alt={community_answer?.user?.name || community_answer?.user?.email}
                />
                <Stack spacing={1} flexGrow={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    flexWrap="wrap"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle2">
                      {community_answer?.user?.name || community_answer?.user?.email}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {fToNow(community_answer.createdAt)}
                      </Typography>
                      <Typography
                        align="right"
                        sx={{
                          px: 1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {(isAdmin || user?._id === community_answer.user_id) && (
                          <IconButton
                            color={popover.open ? 'inherit' : 'default'}
                            onClick={(event) => {
                              handleOpeneditdelete(event, community_answer);
                            }}
                          >
                            <Iconify icon="eva:more-vertical-fill" />
                          </IconButton>
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {community_answer.content}
                  </Typography>
                  {community_answer.updatedAt &&
                    community_answer.updatedAt !== community_answer.createdAt && (
                      <Typography variant="caption" sx={{ color: theme.palette.grey[500] }}>
                        (edited)
                      </Typography>
                    )}
                </Stack>
              </Stack>
            ))}
          <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            arrow="right-top"
            sx={{ width: 160 }}
          >
            <MenuItem onClick={() => handleOpenDialog()}>
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
          <Dialog fullWidth maxWidth="sm" open={open.value} onClose={handleCloseDialog}>
            <DialogTitle sx={{ p: (themed) => themed.spacing(3, 3, 2, 3) }}>Edit Answer</DialogTitle>
            <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
              <CommunityAnsEditForm
                currentCommunityAnswer={currentAnswerData}
                // currentCommunityQuestion={currentCommunityQuestion}
                onClose={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
          {answer_Loading &&
            skeletonArray.map((item, index) => (
              <Stack
                key={index}
                sx={{
                  padding: { xs: 0, sm: 2 },
                }}
                direction="row"
                spacing={2}
              >
                <Skeleton>
                  <Avatar sx={{ width: 60 }} />
                </Skeleton>
                <Stack spacing={1} flexGrow={1}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    flexWrap="wrap"
                    justifyContent="space-between"
                  >
                    <Skeleton>
                      <Typography variant="subtitle2">
                        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                        {'community_answer?.user?.name || community_answer?.user?.email'}
                      </Typography>
                    </Skeleton>
                    <Skeleton>
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                        {'fToNow(community_answer.createdAt)'}
                      </Typography>
                    </Skeleton>
                  </Stack>
                  <Skeleton>
                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                      {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                      {'community'}
                    </Typography>
                  </Skeleton>
                </Stack>
              </Stack>
            ))}

          {!answer_Loading &&
            (!community_answers ||
              !Array.isArray(community_answers) ||
              community_answers.length === 0) && (
              <Stack alignItems="center" justifyContent="center">
                <TableNoData
                  notFound
                  sx={{
                    m: -2,
                  }}
                />
              </Stack>
            )}
        </>
      </Stack>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => handleDelete(currentAnswerData)}>
            Delete
          </Button>
        }
      />
    </Container>
  );
}
