'use client';

import { useState, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hook';
// components
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
// types
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { LoadingScreen } from 'src/components/loading-screen';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box, Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { Divider, FormControl, InputAdornment, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { IInquiry } from 'src/types/inquiry';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
// import HmoTableRow from '../hmo-table-row';
// import AddHmoDialog from '../hmo-add-model';
import { billsClaimsData, billsClaimsOutStandingData, billsClaimspaidData } from 'src/utils/dummyMembers';
import FormProvider, { RHFAutocomplete, RHFDateField, RHFTextField } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import RHFMuiPhoneNumber from 'src/components/hook-form/rhf-muiPhonenumber';
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------

export default function SearchPatientListView() {
  const router = useRouter();
  const theme = useTheme();

  const table = useTable();
  const settings = useSettingsContext();
  const methods = useForm();

  const {
    watch,
    setValue,
  } = methods;

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
                type="submit"
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
