// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFTextField,
} from 'src/components/hook-form';
import { Typography } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { stateOptions } from 'src/utils/dummyMembers';
import { RHFDateField } from 'src/app/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddPatientNewEditFrom({ currentBooking, onClose }: Props) {

  const methods = useForm();

  return (
    <FormProvider methods={methods} >
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
        }}
        mb={3}
      >
        <RHFAutocomplete
          name="title"
          label="Title"
          options={['Dr.', 'Professor', 'Mr.', 'Mrs.', 'Miss']}
          renderOption={(props, option) => (
            <li {...props} key={option}>{option}</li>
          )}
        />
      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="firstName" label="First name" required />
        <RHFTextField name="lastName" label="Last name" required />
      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="email" label="Email" type="email" required />
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
        <RHFAutocomplete name="gender" label="Gender" options={['Male', 'Female']} />
        <RHFDateField name="dateOfBirth" label="Date Of Birth" />
      </Box>

      <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
        <LoadingButton
          type="submit"
          variant="contained"
          size="medium"
        // loading={isLoading}
        >
          {currentBooking ? "Update" : "Create"}
        </LoadingButton>
        <LoadingButton onClick={onClose} variant="soft">
          Cancel
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
