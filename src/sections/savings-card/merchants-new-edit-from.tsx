// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import { RHFTextArea } from 'src/components/hook-form/rhf-text-field';
import { Divider, MenuItem } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { BankOpstion, facilityOpstion, stateOptions } from 'src/utils/dummyMembers';
import { countries } from 'src/assets/data';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function MerchantsNewEditFrom({ currentBooking, onClose }: Props) {

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
        <RHFTextField name="name" label="name" required />
        <RHFTextArea name="Description" label="Description" />
        <RHFSelect
          name="Facility Type"
          label="Facility Type"
        >
          <MenuItem value="">
            <em>Select Facility Type</em>
          </MenuItem>
          {facilityOpstion.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
        <RHFTextField name="email" label="Email" type="email" required />
        <RHFTextField name="Website" label="Website" required />
        <RHFTextField name="Twitter" label="Twitter" required />
        <RHFTextField name="Instagram" label="Instagram" required />
        <RHFTextField name="Facebook" label="Facebook" required />
      </Box>

      <Divider sx={{ my: 3 }} />

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
          name="Bank Name"
          label="Bank Name"
        >
          <MenuItem value="">
            <em>Select Bank</em>
          </MenuItem>
          {BankOpstion.map((status) => (
            <MenuItem key={status.value} value={status.value}>
              {status.label}
            </MenuItem>
          ))}
        </RHFSelect>
        <RHFTextField name="Account Number" label="Account Number" required />
        <RHFTextField name="Account Name" label="Account Name" required />
        <RHFTextField name="Bank Code" label="Bank Code" required />
        <RHFTextField name="Transaction Fee" label="Transaction Fee" type='number' required />
        <RHFTextField name="Street" label="Street" required />
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
        <RHFAutocomplete name="Country" label="Country" options={countries} />
        <RHFAutocomplete name="state" label="State" options={stateOptions} />
        <RHFTextField name="city" label="City" required />
      </Box>

      <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
        <LoadingButton
          type="submit"
          variant="contained"
          size="medium"
        // loading={isLoading}
        >
          {currentBooking ? "Update" : "Save"}
        </LoadingButton>
        <LoadingButton onClick={onClose} variant="soft">
          Cancel
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
