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
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import { MenuItem, Typography } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { assignedFacility, categoryTypeData, stateOptions, TypeOfDependent, typeOfEnrollee } from 'src/utils/dummyMembers';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddFacilitiesNewEditFrom({ currentBooking, onClose }: Props) {

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
        <RHFTextField name="hospitalName" label="Hospital Name" required />
        <RHFTextField name="address" label="Address" required />
      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(3, 1fr)',
        }}
        mb={3}
      >
        <RHFAutocomplete name="state" label="State" options={stateOptions} />
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
        <RHFSelect
          name="Type of category"
          label="Type of category"
        >
          {categoryTypeData.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
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
        <RHFSelect
          name="Type of Facility"
          label="Type of Facility"
        >
          {assignedFacility.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <RHFTextField name="email" label="Email" type="email" required />
        <RHFSelect
          name="Facility Type"
          label="Facility Type"
        >
          {typeOfEnrollee.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <RHFSelect
          name="HMO"
          label="HMO"
        >
          {TypeOfDependent.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
      </Box>

      <Box>
        <Typography fontWeight='bold' mb={2}>Hospital Contact</Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(3, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="FirstName" label="First name" />
          <RHFTextField name="Surname" label="Surname" />
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
          <RHFTextField name="Bank Name" label="Bank Name" />
          <RHFTextField name="Account Name" label="Account Name" />
          <RHFTextField name="Account Number" label="Account Number" />
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
