// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFDateField,
  RHFTextField,
  // RHFUploadAvatarBox,
} from 'src/components/hook-form';
import { Typography } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { hospitalOptions, insuranceOptions, lgaOptions, stateOptions } from 'src/utils/dummyMembers';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddMemberNewEditFrom({ currentBooking, onClose }: Props) {

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

        <RHFTextField name="firstName" label="First name" required />
        <RHFTextField name="middleName" label="Middle name" />
        <RHFTextField name="lastName" label="Last name" required />

        <RHFTextField name="email" label="Email" type="email" required />
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />

        <RHFTextField name="password" label="Password" type="password" required />
        <RHFTextField name="confirmPassword" label="Confirm Password" type="password" required />

        <RHFTextField name="address" label="Address" required />

        <RHFAutocomplete name="state" label="State" options={stateOptions} />
        <RHFAutocomplete name="lga" label="LGA" options={lgaOptions} />
        <RHFTextField name="city" label="City" required />

        <RHFDateField name="dateOfBirth" label="Date Of Birth" />

        <RHFAutocomplete name="gender" label="Gender" options={['Male', 'Female']} />
        <RHFAutocomplete name="maritalStatus" label="Marital Status" options={['Single', 'Married', 'Divorced']} />

        <RHFTextField name="stateOfOrigin" label="State Of Origin" />
        <RHFTextField name="religion" label="Religion" />
        <RHFTextField name="language" label="Language" />
        <RHFTextField name="educationSchool" label="Education School" />

        <RHFAutocomplete name="insuranceProvider" label="HMO/Insurance Provider" options={insuranceOptions} />
        <RHFTextField name="insuranceId" label="HMO/Enrollee ID" />

        <RHFAutocomplete name="preferredHospital" label="Preferred Hospital" options={hospitalOptions} />

      </Box>

      <Box>
        <Typography fontWeight='bold' mb={2}>Next Of Kin</Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(3, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="nokFirstName" label="Next Of Kin - First name" />
          <RHFTextField name="nokSurname" label="Next Of Kin - Surname" />
          <RHFTextField name="nokPhoneNumber" label="Next Of Kin - Phone Number" />
        </Box>

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
