'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// types
//
import { Box, Stack } from '@mui/system';
import { Divider, InputAdornment, Typography } from '@mui/material';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import Iconify from 'src/app/components/iconify';


// ----------------------------------------------------------------------

export default function SettingListView() {

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
          <Typography variant="h4">Settings</Typography>
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
            <RHFTextField name="Vesting Period" label="Vesting Period" />
            <RHFTextField
              name="Deduction Penalty"
              label="Deduction Penalty"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Iconify icon="material-symbols:percent" width="44" height="44" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Divider sx={{ my: 5 }} />

          <Stack direction='row' gap={1} alignItems="center" justifyContent="center" marginY={3} >
            <LoadingButton
              variant="contained"
              size="medium"
            // loading={isLoading}
            >
              Update
            </LoadingButton>
          </Stack>

        </Card>
      </Container>

    </FormProvider >
  );
}
