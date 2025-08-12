import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, { RHFTextField, RHFAutocompleteMultiple, RHFAutocomplete } from 'src/components/hook-form';
import { IProject } from 'src/types/projects';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getInterns } from 'src/redux/slices/interns';
import { createProject, getProjects, updateProject } from 'src/redux/slices/projects';
import { IIntern } from 'src/types/interns';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

type Props = {
  currentProject?: IProject | null;
  onClose?: VoidFunction;
};

export default function ProjectNewEditForm({ currentProject, onClose }: Props) {
  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const { interns } = useSelector((state: RootState) => state.interns);

  useEffect(() => {
    dispatch(getInterns());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Project Name is required'),
    members_id: Yup.array().min(1, 'Project Member are required'),
    visibility: Yup.string().required('Task Visibility is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProject?.name || '',
      members_id:
        currentProject?.members?.map((member: any) => ({
          label: member.name,
          value: member._id,
        })) || [],
      visibility: currentProject?.visibility || '',
    }),
    [currentProject]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const values = watch()

  const onSubmit = handleSubmit(async (data) => {
    try {
      const membersIds =
        data.members_id && Array.isArray(data.members_id)
          ? data.members_id.map((member) => member.value)
          : undefined;
      let postData;
      let res;
      if (currentProject) {
        postData = {
          ...data,
          members_id: membersIds,
          project_id: currentProject?._id,
          organization_id: user?.organization_id
        };
        res = await dispatch(updateProject(postData));
      } else {
        postData = {
          ...data,
          members_id: membersIds,
          organization_id: user?.organization_id
        };
        res = await dispatch(createProject(postData));
      }
      if (res?.data?.status) {
        onClose?.();
        dispatch(getProjects());
      } else {
        onClose?.();
      }
    } catch (error) {
      console.error(error);
      onClose?.();
    }
  });

  const visibilityOptions = [
    { label: 'Public', value: 'public' },
    { label: 'Assignee', value: 'assignee' },
  ];

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
        <RHFTextField name="name" label="Project Name" />

        <RHFAutocompleteMultiple
          name="members_id"
          label="Project Members"
          multiple
          options={
            (interns?.filter((option: IIntern) =>
              !values?.members_id?.some((selected: IIntern) => selected?.value === option?._id))
              .map((option: IIntern) => ({
                label: option.name,
                value: option._id,
              })) as readonly any[]) ?? []
          }
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
        />

        <RHFAutocomplete
          name="visibility"
          label="Tasks Visibility"
          options={(visibilityOptions?.map((option) => option) as readonly any[]) ?? []}
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label.toUpperCase()}
            </li>
          )}
          onChange={(e, selectedOption) => {
            methods.setValue('visibility', selectedOption ? selectedOption.value : '');
          }}
          value={visibilityOptions.find(option => option.value === watch('visibility')) || null}
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
