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

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddHmoNewEditFrom({ currentBooking, onClose }: Props) {

  const methods = useForm();

  return (
    <FormProvider methods={methods} >
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="firstName" label="First name" required />

        <RHFTextField name="address" label="Address" required />
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
        <RHFAutocomplete name="state" label="State" options={stateOptions} />
        <RHFTextField name="city" label="City" required />
      </Box>

      <Box>
        <Typography fontWeight='bold' mb={2}>Point of Contact</Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="FirstName" label="First name" />
          <RHFTextField name="Surname" label="Surname" />
          <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
          <RHFTextField name="email" label="Email" type="email" required />
        </Box>
      </Box>


      <Box>
        <Typography fontWeight='bold' mb={2}>2nd Point of Contact</Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="FirstName" label="First name" />
          <RHFTextField name="Surname" label="Surname" />
          <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
          <RHFTextField name="email" label="Email" type="email" required />
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
