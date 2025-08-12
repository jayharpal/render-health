import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormProvider, { RHFTextField, RHFAutocompleteMultiple } from 'src/components/hook-form';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getInterns } from 'src/redux/slices/interns';
import { createProject, getProjects, updateProject } from 'src/redux/slices/projects';
import { IRoadmap } from 'src/types/roadmap';

type Props = {
  currentProject?: IRoadmap | null;
  onClose?: VoidFunction;
};

export default function RoadMapNewEditForm({ currentProject, onClose }: Props) {
  const dispatch = useDispatch();
  const { interns } = useSelector((state: RootState) => state.interns);

  useEffect(() => {
    dispatch(getInterns());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    members_id: Yup.array().min(1, 'Project Members are required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProject?.title || '',
      members_id:
        currentProject?.members?.map((member: any) => ({
          label: member.name,
          value: member._id,
        })) || [],
    }),
    [currentProject]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const membersIds = data.members_id?.map((member) => member.value);
      const postData = {
        ...data,
        members_id: membersIds,
        project_id: currentProject?._id,
      };

      let res;

      if (currentProject) {
        res = await dispatch(updateProject(postData));
      } else {
        res = await dispatch(createProject(postData));
      }

      if (res?.data?.status) {
        onClose?.();
        dispatch(getProjects());
      }
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
        <RHFTextField name="name" label="RoadMap Name" />
        <RHFAutocompleteMultiple
          name="members_id"
          label="RoadMap Members"
          multiple
          options={(interns || []).map((option: any) => ({
            label: option.name,
            value: option._id,
          }))}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />
        <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
            {currentProject ? 'Edit' : 'Create'}
          </LoadingButton>
          <LoadingButton onClick={onClose} variant="soft">
            Cancel
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}
