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

export default function AddPriceNewEditFrom({ currentBooking, onClose }: Props) {

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
        <RHFTextField name="Price" label="Price" required />
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
