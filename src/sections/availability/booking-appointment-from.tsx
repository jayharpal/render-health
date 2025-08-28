// import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFTextField,
} from 'src/components/hook-form';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
  open: boolean;
  handleSave: (data: any) => void;
};

export default function BookingAppointmentForm({ open, currentBooking, onClose, handleSave }: Props) {

  const methods = useForm();
  const { setValue, handleSubmit } = methods;

  const onSubmit = (data: any) => {
    handleSave(data);
    setValue('name', '');
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Book Appointment </DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
            }}
            mb={3}
          >
            <RHFTextField name="name" label="Patient name" required />
          </Box>

          <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
            // onClick={handleSave}
            // loading={isLoading}
            >
              Save
            </LoadingButton>
            <LoadingButton onClick={onClose} variant="soft">
              Cancel
            </LoadingButton>
          </Stack>

        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
