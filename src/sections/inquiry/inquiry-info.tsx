import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
// @mui
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFAutocompleteMultiple,
  RHFTextField,
} from 'src/components/hook-form';
import { IInquiry } from 'src/types/inquiry';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  currentInquiry?: IInquiry;
};

export default function InquiryInfo({ currentInquiry, open, onClose }: Props) {
  const defaultValues = useMemo(
    () => ({
      name: currentInquiry?.name || '',
      email: currentInquiry?.email || '',
      mobile_no: currentInquiry?.mobile_no || '',
      skills: currentInquiry?.skills || [],
      availability: currentInquiry?.availability || '',
      status: currentInquiry?.status || '',
      role_preference: currentInquiry?.role_preference || '',
      experience: currentInquiry?.experience || '',
      dob: currentInquiry?.dob || '',
      additional_information: currentInquiry?.additional_information || '',
    }),
    [currentInquiry]
  );

  const methods = useForm({
    defaultValues,
  });

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods}>
        <DialogTitle>Intern Information</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            my={3}
          >
            <RHFTextField name="name" label="Full Name" disabled />
            <RHFTextField name="email" label="Email Address" disabled />
            <RHFTextField name="mobile_no" label="Phone Number" disabled />

            <RHFAutocompleteMultiple
              name="skills"
              label="Skills"
              freeSolo
              multiple
              options={[]}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              disabled
            />

            <RHFAutocomplete
              name="status"
              label="Status"
              options={[]}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              disabled
            />

            <RHFAutocomplete
              name="availability"
              label="Availability"
              options={[]}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              disabled
            />

            <RHFAutocomplete
              name="role_preference"
              label="Role Preference"
              options={[]}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              disabled
            />

            <RHFTextField name="experience" label="Experience" disabled />
            <RHFTextField type="date" name="dob" label="DOB" disabled />
            <RHFTextField name="additional_information" label="Additional Information" disabled />
          </Box>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
