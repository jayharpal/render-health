'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// types
//
import { Box, Stack } from '@mui/system';
import { Divider, Typography } from '@mui/material';

import FormProvider, { RHFDateField, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function SearchPatientListView() {

  const settings = useSettingsContext();
  const methods = useForm();

  return (
    <FormProvider methods={methods} >
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
            justifyContent="space-between"
          >
            <Typography variant="h4">Search Patient</Typography>
          </Stack>

          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
              mb={3}
            >
              <RHFTextField name="FirstName" label="First name" />
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
              <RHFTextField name="Surname" label="Surname" />
              <RHFDateField name="dateOfBirth" label="Date Of Birth" />
            </Box>

            <Divider sx={{ my: 5 }} />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
              mb={3}
            >
              <RHFTextField name="Patient ID" label="Patient ID" />
            </Box>

            <Stack direction='row' gap={1} alignItems="center" justifyContent="center" marginY={3} >
              <LoadingButton
                // type="submit"
                variant="contained"
                size="medium"
              // loading={isLoading}
              >
                Search Patient
              </LoadingButton>
            </Stack>

          </Card>
        </Container>

      </FormProvider >
  );
}
