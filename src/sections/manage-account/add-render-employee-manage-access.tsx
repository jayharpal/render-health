import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormProvider, {
  RHFCheckbox,
  RHFRadioGroup,
} from 'src/components/hook-form';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import { RHFSwitch } from 'src/app/components/hook-form';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AddRenderEmployeeManageAccess({
  title,
  open,
  currentBooking,
  onClose,
  ...other
}: any) {

  const methods = useForm();

  const {
    watch,
    setValue
  } = methods;

  const isActive = watch("isActive");

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3), fontSize: '150px' }}>Manage access</DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
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
            <Box display='flex' flexDirection='column' gap={2}>
              <Box>
                <Typography fontWeight='bold'>Access for Hospital</Typography>
                <RHFCheckbox
                  name="entryPatientData"
                  label="Entry Patient Data"
                  value="entryPatientData"
                />
                <RHFCheckbox
                  name="accessHospitalBillings"
                  label="Access Hospital Billings"
                  value="accessHospitalBillings"
                />
                <RHFCheckbox
                  name="superAdmin"
                  label="Super Admin"
                  value="superAdmin"
                />
              </Box>

              <Box>
                <Typography fontWeight='bold'>Access for Patient Record</Typography>
                <RHFRadioGroup
                  name="patientRecordAccess"
                  options={[
                    { value: "fullPatientRecord", label: "Access to Full Patient Record" },
                    { value: "limitedPatientRecord", label: "Limited Patient Record" },
                  ]}
                />
              </Box>
            </Box>
            <Box>
              <RHFSwitch
                name="isActive"
                label={isActive ? "Active" : "Inactive"}
              />
            </Box>
          </Box>

          <Stack direction='row' gap={1} alignItems="center" justifyContent="end" marginY={3} >
            <LoadingButton variant="soft" sx={{ display: 'flex', gap: 1 }}>
              <Iconify icon="mdi:eye" />
              View
            </LoadingButton>
            <LoadingButton variant="soft">
              Facility
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
            // loading={isLoading}
            >
              save
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
