import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hook';
// components
import Label from 'src/components/label';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFAutocomplete,
  RHFAutocompleteMultiple,
} from 'src/components/hook-form';
import { IInquiry } from 'src/types/inquiry';
import { availability, role_preference, status } from 'src/assets/data/config';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification, convertToUser, updateInquiry } from 'src/redux/slices/inquiry';

// ----------------------------------------------------------------------

type Props = {
  currentInquiry?: IInquiry;
};

export default function UserNewEditForm({ currentInquiry }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const { notification, variant, isLoading } = useSelector((state: RootState) => state.inquiry);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    mobile_no: Yup.string().required('Phone number is required'),
    status: Yup.string().required('Status is required'),
    skills: Yup.array().min(1, 'Skills are required'),
    availability: Yup.string().required('Availability is required'),
    role_preference: Yup.string().required('Role Preference is required'),
    experience: Yup.string().required('Experience is required'),
    dob: Yup.mixed(),
    additional_information: Yup.string().required('Additional Information is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentInquiry?.name || '',
      email: currentInquiry?.email || '',
      status: currentInquiry?.status || '',
      mobile_no: currentInquiry?.mobile_no || '',
      availability: currentInquiry?.availability || '',
      role_preference: currentInquiry?.role_preference || '',
      experience: currentInquiry?.experience || '',
      dob: currentInquiry?.dob || '',
      additional_information: currentInquiry?.additional_information || '',
      skills: currentInquiry?.skills || [],
    }),
    [currentInquiry]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const { watch, setValue, handleSubmit } = methods;

  useEffect(() => {
    setValue('name', currentInquiry?.name as string);
    setValue('email', currentInquiry?.email as string);
    setValue('mobile_no', currentInquiry?.mobile_no as string);
    setValue('skills', currentInquiry?.skills as string[]);
    setValue('availability', currentInquiry?.availability as string);
    setValue('status', currentInquiry?.status as string);
    setValue('role_preference', currentInquiry?.role_preference as string);
    setValue('experience', currentInquiry?.experience as string);
    setValue('dob', currentInquiry?.dob);
    setValue('additional_information', currentInquiry?.additional_information as string);
  }, [currentInquiry, setValue]);

  const values = watch();

  const handleConvertUser = async () => {
    const res = await dispatch(convertToUser(currentInquiry?._id as string));
    if (res?.data?.status) {
      router.push(paths.dashboard.inquiry.list);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const postData = {
        ...data,
        inquiry_id: currentInquiry?._id as string,
      };
      await dispatch(updateInquiry(postData as any));
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, dispatch, enqueueSnackbar, variant]);

  // const handleDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     const file = acceptedFiles[0];

  //     const newFile = Object.assign(file, {
  //       preview: URL.createObjectURL(file),
  //     });

  //     if (file) {
  //       setValue('avatarUrl', newFile, { shouldValidate: true });
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Card sx={{ pt: 3, pb: 3, px: 3 }}>
            <Stack justifyContent="space-between" alignItems="center" direction="row">
              {(currentInquiry?.status || values?.status) && (
                <Label
                  color={
                    (values.status === 'submitted' && 'warning') ||
                    (values.status === 'contacted' && 'info') ||
                    (values.status === 'testScheduled' && 'secondary') ||
                    (values.status === 'testCompleted' && 'primary') ||
                    (values.status === 'internshipApproved' && 'success') ||
                    'default'
                  }
                  // sx={{ position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Stack direction="row" gap={1} alignItems="flex-end">
                <LoadingButton type="submit" variant="outlined" loading={isLoading}>
                  Save Changes
                </LoadingButton>
                <LoadingButton onClick={handleConvertUser} variant="contained" loading={isLoading}>
                  Convert to User
                </LoadingButton>
              </Stack>

              {/* <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box> */}
            </Stack>
          </Card>
        </Grid>

        <Grid xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="email" label="Email Address" />
              <RHFTextField name="mobile_no" label="Phone Number" />

              <RHFAutocompleteMultiple
                name="skills"
                label="Skills"
                freeSolo
                multiple
                options={
                  (currentInquiry?.skills?.map((option: any) => option) as readonly any[]) ?? []
                }
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option.toUpperCase()}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="status"
                label="Status"
                options={(status?.map((option: any) => option) as readonly any[]) ?? []}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option.toUpperCase()}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="availability"
                label="Availability"
                options={(availability?.map((option: any) => option) as readonly any[]) ?? []}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option.toUpperCase()}
                  </li>
                )}
              />

              <RHFAutocomplete
                name="role_preference"
                label="Role Preference"
                options={(role_preference?.map((option: any) => option) as readonly any[]) ?? []}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option.toUpperCase()}
                  </li>
                )}
              />

              <RHFTextField name="experience" label="Experience" />
              <RHFTextField type="date" name="dob" label="DOB" />
              <RHFTextField name="additional_information" label="Additional Information" />
            </Box>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
