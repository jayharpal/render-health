// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddInventoryNewEditFrom({ currentBooking, onClose }: Props) {

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
        <RHFTextField name="Code" label="Code" required />
        <RHFTextField name="Name" label="Name" required />
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
        <RHFTextField name="Dosage Form" label="Dosage Form" required />
        <RHFTextField name="Strengths" label="Strengths" required />
        <RHFTextField name="Qty" label="Qty" required />
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
        <RHFTextField name="Count" label="Count" required />
        <RHFTextField name="Description" label="Description" required />
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
        <RHFTextField name="Price" label="Price" required />
        <RHFTextField name="Low Stock Alert" label="Low Stock Alert" required />
        <RHFTextField name="Rhsa_Eligible" label="Rhsa_Eligible" required />
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
        <RHFTextField name="Conditions" label="Conditions" required />
        <RHFTextField name="How should you use this medication?" label="How should you use this medication?" required />
        <RHFTextField name="What are the possible side effects of this medicine?" label="What are the possible side effects of this medicine?" required />
        <RHFTextField name="What may interact with this medicine?" label="What may interact with this medicine?" required />
      </Box>

      <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
        <LoadingButton
          type="submit"
          variant="contained"
          size="medium"
        // loading={isLoading}
        >
          Save
        </LoadingButton>
        <LoadingButton onClick={onClose} variant="soft">
          Cancel
        </LoadingButton>
      </Stack>

    </FormProvider>
  );
}
