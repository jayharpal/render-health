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
import { RHFRadioGroup } from 'src/app/components/hook-form';

// ----------------------------------------------------------------------

type Props = {
  onClose?: VoidFunction;
  open: boolean;
};

export default function DownloadDialog({ open, onClose }: Props) {

  const methods = useForm();

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Download Excel Sheet</DialogTitle>
      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>

        <FormProvider methods={methods}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
            }}
            px={5}
            mb={3}
          >
            <RHFRadioGroup
              name="patientRecordAccess"
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 2, }}
              options={[
                { value: "Blank Excel Data", label: "Blank Excel Data" },
                { value: "With Excel Sheet Data", label: "With Excel Sheet Data" },
              ]}
            />
          </Box>

          <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
            <LoadingButton
              variant="contained"
              size="medium"
            >
              Download
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
