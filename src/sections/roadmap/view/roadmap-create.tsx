'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getProjects } from 'src/redux/slices/projects';
import { RHFAutocompleteMultiple, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import {
  clearNotification,
  clearRoadmap,
  createRoadmap,
  getRoadMapById,
  updateRoadmap,
} from 'src/redux/slices/roadmap';
import { enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';
import { IRoadmapPostData, IRoadmapProject } from 'src/types/roadmap';
import { IProject } from 'src/types/projects';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import { useAuthContext } from 'src/auth/hooks';

type RoadMapProps = {
  roadmapId?: string;
};

function RoadMapCreate({ roadmapId }: RoadMapProps) {
  interface FormValues {
    title?: string;
    description: string;
    project_id?: { value: string }[];
  }

  const dispatch = useDispatch();
  const { user } = useAuthContext();

  const { notification, variant, roadmap } = useSelector((state: RootState) => state.roadmap);
  const { projects } = useSelector((state: RootState) => state.projects);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProjects());
    if (roadmapId) {
      dispatch(getRoadMapById(roadmapId));
    }
  }, [dispatch, roadmapId]);

  const defaultValues = useMemo(() => {
    if (roadmapId) {
      return {
        title: roadmap?.title || '',
        description: roadmap?.description || '',
        project_id:
          roadmap?.projects?.map((project: any) => ({
            label: project.name,
            value: project._id,
          })) || [],
      };
    }
    return {
      title: '',
      description: '',
      project_id: [],
    };
  }, [roadmap, roadmapId]);
  
  const NewRoadmapSchema = Yup.object().shape({
    title: Yup.string().required('Roadmap Name is required'),
    description: Yup.string().required('Description is required'),
    project_id: Yup.array().min(1, 'Project are required'),
  });

  const methods = useForm({
    resolver: yupResolver(NewRoadmapSchema),
    defaultValues,
  });

  useEffect(() => {
    if (roadmap) {
      methods.reset({
        title: roadmap.title || '',
        description: roadmap.description || '',
        project_id:
          roadmap.projects?.map((project: IRoadmapProject) => ({
            label: project.name,
            value: project._id,
          })) || [],
      });
    } else {
      methods.reset({
        title: '',
        description: '',
        project_id: [],
      });
    }
  }, [roadmap, methods]);

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    dispatch(getProjects());
    if (roadmapId) {
      dispatch(getRoadMapById(roadmapId));
    } else {
      dispatch(clearRoadmap());
      reset();
    }
  }, [dispatch, roadmapId,reset]);

  const onSubmit = async (data: FormValues) => {
    try {
      const projectId = data.project_id || [];
      if (roadmapId) {
        const updatedRoadmapData: IRoadmapPostData = {
          ...data,
          _id: roadmapId,
          projects: projectId.map((project, index) => ({
            project_id: project.value,
            sequence: index + 1,
          })),
          organization_id: user?.organization_id
        };
        await dispatch(updateRoadmap(roadmapId as string, updatedRoadmapData));
        dispatch(getProjects());
        if (roadmapId) {
          dispatch(getRoadMapById(roadmapId));
        }
      } else {
        const newRoadmapData: IRoadmapPostData = {
          title: data.title,
          description: data.description,
          projects: projectId.map((project, index) => ({
            project_id: project.value,
            sequence: index + 1,
          })),
          organization_id: user?.organization_id
        };
        await dispatch(createRoadmap(newRoadmapData));
      }
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, variant, dispatch]);

  const handleListClick = () => {
    router.push(paths.dashboard.roadmap.list);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          justifyContent="start"
        >
          <Typography variant="h4"> {roadmapId ? 'Update RoadMap' : 'Create RoadMap'}</Typography>
        </Stack>

        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="title" label="RoadMap Name" />
          <RHFTextField name="description" label="Description" />
          <RHFAutocompleteMultiple
            name="project_id"
            label="Project"
            multiple
            options={
              (projects?.map((option: IProject) => ({
                label: option.name,
                value: option._id,
              })) as readonly any[]) ?? []
            }
            renderOption={(props, option) => (
              <li {...props} key={option.value}>
                {option.label}
              </li>
            )}
            filterOptions={(options: any[], { inputValue, getOptionSelected }: any) => {
              const selectedProjects =
                methods.getValues().project_id?.map((project: any) => project.value) || [];
              return options.filter(
                (option) =>
                  !selectedProjects.includes(option.value) ||
                  (getOptionSelected && getOptionSelected(option, selectedProjects))
              );
            }}
          />

          <Stack direction="row" gap={1} alignItems="center" justifyContent="end">
            <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}>
              {roadmapId ? 'Update' : 'Create'}
            </LoadingButton>
            <LoadingButton variant="soft" onClick={handleListClick}>Cancel</LoadingButton>
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
}

export default RoadMapCreate;
