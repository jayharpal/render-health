// import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// components
import FormProvider, {
  RHFAutocomplete,
  RHFAutocompleteMultiple,
  RHFDateField,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  // RHFUploadAvatarBox,
} from 'src/components/hook-form';
// import { IBooking } from 'src/@types/bookings';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
// import { getCustomers } from 'src/redux/slices/customers';
import { InputLabel, MenuItem, Typography } from '@mui/material';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { AssignedBillingTariff, assignedFacility, days, hospitalOptions, insuranceOptions, lgaOptions, months, stateOptions, TypeOfDependent, typeOfEnrollee, years } from 'src/utils/dummyMembers';
import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

export default function AddEnrolleeNewEditFrom({ currentBooking, onClose }: Props) {

  const methods = useForm();

  const {
    watch,
    setValue,
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
        <RHFTextField name="firstName" label="First name" required />
        <RHFTextField name="middleName" label="Middle name" />
        <RHFTextField name="surname" label="Surname" required />
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
        <RHFDateField name="dateOfBirth" label="Date Of Birth" />
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
        <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
        <RHFAutocomplete name="sex" label="Sex" options={['Male', 'Female']} />
        <RHFAutocomplete name="maritalStatus" label="Marital Status" options={['Single', 'Married', 'Divorced']} />
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
        <RHFTextField name="address" label="Address" required />
        <RHFTextField name="Hmo" label="HMO" required />
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
          xs: 'repeat(2, 1fr)',
        }}
        mb={3}
      >
        <RHFTextField name="companyName" label="Company Name" required />
        <Box sx={{ mb: 5 }}>
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





      <Box>
        <Typography fontWeight='bold' mb={2}>Depentdent Information</Typography>
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
          <RHFTextField name="middleName" label="Middle name" />
          <RHFTextField name="Surname" label="Surname" />
          <RHFMuiPhoneNumber name="phoneNumber" placeholder="Phone Number" required />
          <RHFAutocomplete name="sex" label="Sex" options={['Male', 'Female']} />
          <RHFSelect
            name="Type of Dependent"
            label="Type of Dependent"
          >
            {TypeOfDependent.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFDateField name="dateOfBirth" label="Date Of Birth" />
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


      <Box>
        <Typography fontWeight='bold' mb={2}>Assigned Facility</Typography>
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
            name="Assigned Facility"
            label="Assigned Facility"
          >
            {assignedFacility.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </RHFSelect>
          <RHFSelect
            name="Type of Enrollee"
            label="Type of Enrollee"
          >
            {typeOfEnrollee.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFDateField name="PolicyStartDate" label="Policy Start Date" />
          <RHFDateField name="PolicyEndDate" label="Policy End Date" />

          <RHFSelect
            name="Assigned Billing Tariff"
            label="Assigned Billing Tariff"
          >
            {AssignedBillingTariff.map((status) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </RHFSelect>

          <RHFTextField name="EnrolleeId" label="Enrollee Id" />
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
