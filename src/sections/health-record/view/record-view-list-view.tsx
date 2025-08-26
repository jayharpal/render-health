'use client';

import { useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useForm } from 'react-hook-form';
import { useSettingsContext } from 'src/components/settings';
import { Box, Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormProvider from 'src/app/components/hook-form';
import AddBillingDialog from 'src/sections/settings/billing-add-model';
import BillingRecordTable from '../bill-record-table';
import MedicalRecordView from '../medical-list-view';

export default function RecordViewListView() {

  const theme = useTheme();
  const create = useBoolean();
  const methods = useForm();
  const [pageData, setPageData] = useState<string>('Medical Record');
  const settings = useSettingsContext();

  return (
    <FormProvider methods={methods}>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
            justifyContent="space-between"
          >
            <Box display='flex' flexDirection="row" gap={2}>
              <Typography variant="h4">{pageData === "Billing Info" ? "Billing Information" : "Medical Record"}
                {
                  pageData === "Billing Info" &&
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: theme.palette.primary.main,
                      "&:hover": {
                        bgcolor: theme.palette.primary.dark,
                      },
                    }}
                    onClick={create.onTrue}
                    startIcon={<Iconify icon="mingcute:add-line" />}
                  >
                    Add Billing
                  </Button>
                }
              </Typography>
            </Box>
            <Box display='flex' gap={2}>
              <Button
                variant="contained"
                onClick={() => setPageData('Medical Record')}
                sx={{
                  bgcolor: pageData === "Medical Record" ? theme.palette.primary.main : 'default',
                  "&:hover": pageData === "Medical Record" ? {
                    bgcolor: theme.palette.primary.dark,
                  } : {},
                }}
              >
                Medical Record
              </Button>
              <Button
                variant="contained"
                onClick={() => setPageData('Billing Info')}
                sx={{
                  bgcolor: pageData === "Billing Info" ? theme.palette.primary.main : 'default',
                  "&:hover": pageData === "Billing Info" ? {
                    bgcolor: theme.palette.primary.dark,
                  } : {},
                }}
              >
                Billing Info
              </Button>
            </Box>
          </Stack>

          <AddBillingDialog open={create.value} onClose={create.onFalse} />

          <Card>
            {
              pageData === "Billing Info" &&
              <BillingRecordTable />
            }
            {
              pageData === "Medical Record" &&
              <MedicalRecordView />
            }
          </Card>
        </Container>
      </FormProvider >
  );
}
