// import * as Yup from 'yup';
import { useCallback } from 'react';
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
  RHFUploadAvatar,
} from 'src/components/hook-form';
import { Typography } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { roleOptions, stateOptions } from 'src/utils/dummyMembers';
import { RHFCheckbox, RHFRadioGroup } from 'src/app/components/hook-form';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddRenderEmployeeNewEditFrom({ currentBooking, onClose }: Props) {

  const methods = useForm();

  const {
    setValue
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} >
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(3, 1fr)',
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
        <RHFTextField name="firstName" label="First name" required />
        <RHFTextField name="middleName" label="Middle name" />
        <RHFTextField name="lastName" label="Last name" required />
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
        <RHFTextField name="email" label="Email" type="email" required />
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
        <RHFMuiPhoneNumber name="altphoneNumber" placeholder="Alt Phone Number" required />
      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="password" label="Password" type="password" required />
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
        <RHFAutocomplete name="state" label="State" options={stateOptions} />
        <RHFTextField name="city" label="City" required />
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
        <RHFDateField name="dateOfBirth" label="Date Of Birth" />
        <RHFAutocomplete name="gender" label="Gender" options={['Male', 'Female']} />
        <RHFAutocomplete name="maritalStatus" label="Marital Status" options={['Single', 'Married', 'Divorced']} />

      </Box>

      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
        }}
        mb={3}
      >
        <RHFAutocomplete name="launguage" label="Launguage" options={['English', 'Married', 'Divorced']} />
        <RHFTextField name="educationSchool" label="Education School" />
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
        <RHFTextField name="stateOfOrigin" label="State Of Origin" />
        <RHFTextField name="position" label="Position" />
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

      <Box>
        <Typography fontWeight='bold' mb={2}>Reference</Typography>
        <Box
          rowGap={3}
          columnGap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(3, 1fr)',
          }}
          mb={3}
        >
          <RHFTextField name="refFirstName" label="First name" />
          <RHFTextField name="refSurname" label="Surname" />
          <RHFTextField name="refPhoneNumber" label="Phone Number" />
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
          <RHFTextField name="refFirstName" label="First name" />
          <RHFTextField name="refSurname" label="Surname" />
          <RHFTextField name="refPhoneNumber" label="Phone Number" />
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
          <RHFTextField name="employeeId" label="Employee ID" />
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
          <RHFAutocomplete name="statusUser" label="Status User" options={['Active', 'Not Active']} />
          <RHFAutocomplete name="role" label="Role" options={roleOptions} />
        </Box>
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

        <Box sx={{ mb: 5 }}>
          <Typography fontWeight='bold'>Add Photo Profile</Typography>
          <RHFUploadAvatar
            name="avatarUrl"
            maxSize={3145728}
            onDrop={handleDrop}
            helperText={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.disabled',
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />
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
