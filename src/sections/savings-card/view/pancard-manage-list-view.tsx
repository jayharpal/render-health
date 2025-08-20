'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// types
//
import { Box, Stack } from '@mui/system';
import { Divider, InputLabel, Typography } from '@mui/material';

import FormProvider, { RHFDateField, RHFTextField, RHFUploadAvatarBox } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { RHFUploadBox } from 'src/app/components/hook-form';
import { useCallback } from 'react';


// ----------------------------------------------------------------------

export default function PancardManageListView() {

  const settings = useSettingsContext();
  const methods = useForm();

  const {
    watch,
    setValue,
  } = methods;

  // const handleDropBack = useCallback(
  //   async (acceptedFiles: File[], index: number) => {
  //     const file = acceptedFiles[0];

  //     const formData = new FormData();
  //     formData.append('file', file);

  //     try {
  //       const response = await axios.post('/upload', formData, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       const imageUrl = response.data.result.image_url;
  //       const newFile = Object.assign(file, {
  //         preview: imageUrl,
  //       });

  //       if (file) {
  //         setValue(`members.${index}.backUrl`, newFile?.preview, { shouldValidate: true });
  //       }
  //     } catch (error) {
  //       console.error('Error uploading file:', error);
  //     }
  //   },
  //   [setValue]
  // );

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
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Upload Pancard</Typography>
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
            <InputLabel sx={{ mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>Upload Pancard Data</InputLabel>
            <RHFUploadAvatarBox
              name='pancard'
              maxSize={3145728}
              onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
            />
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
            <RHFTextField name="Tariff Name" label="Tariff Name" />
          </Box>
          <Stack direction='row' gap={1} alignItems="center" justifyContent="center" marginY={3} >
            <LoadingButton
              type="submit"
              variant="contained"
              size="medium"
            // loading={isLoading}
            >
              Upload
            </LoadingButton>
          </Stack>

        </Card>
      </Container>

    </FormProvider >
  );
}
