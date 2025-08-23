'use client';

import Card from '@mui/material/Card';
// import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/app/components/hook-form';
import { Button, Container, Typography } from '@mui/material';
import { Box, Stack, useTheme } from '@mui/system';
import { RHFTextField } from 'src/components/hook-form';


export default function TopUpListView() {

  const methods = useForm();
  const theme = useTheme();

  const settings = useSettingsContext();

  return (
    <FormProvider methods={methods}>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
            justifyContent="space-between"
          >
            <Box display='flex' flexDirection="row" gap={1}>
              <Typography variant="h4">Top Up</Typography>
            </Box>
          </Stack>
          <Card
            sx={{
              p: 4,
              border: `2px dashed ${theme.palette.primary.main}`,
              borderRadius: 1,
              boxShadow: 3,
              textAlign: 'center',
              width: '70%',
              margin: '0 auto',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="subtitle1" fontWeight="bold">
                RHSC Number
              </Typography>
              <Box
                component="img"
                src="/logo/Render-helth-1.png"
                alt="Render Health"
                sx={{ height: 40 }}
              />
            </Stack>

            <RHFTextField
              name="rhscNumber"
              label="Enter RHSC Number"
              fullWidth
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              Submit
            </Button>
          </Card>
        </Container>
      </FormProvider>
  );
}
