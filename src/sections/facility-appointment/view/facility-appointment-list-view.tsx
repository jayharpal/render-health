'use client';

import { useState, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFDateField } from 'src/app/components/hook-form';
import { Box, Stack } from '@mui/system';
import { MenuItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { doctorList, dummyAppointments } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import { RHFSelect } from 'src/components/hook-form';
import FacilityAppointmentTable from '../facility-appointment-table';
import FacilityAppointmentCalendar from '../facility-appointment-calender';
import AddAppointmentDialog from '../add-appointment-model';

export default function FacilityAppointmentListView() {

  const theme = useTheme();
  const methods = useForm();
  const create = useBoolean();

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [view, setView] = useState<"list" | "calendar">("list");

  const settings = useSettingsContext();

  useEffect(() => {
    setTableData(dummyAppointments || []);
  }, []);

  return (
    <>
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
            <Box display='flex' flexDirection="row" alignItems='center' gap={2}>
              <Typography variant="h4">Appointments</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main
                }}
              >
                {tableData.length || 0}
              </Button>
            </Box>
            <Box display='flex' flexDirection="row" justifyContent='center' gap={1}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main
                }}
                onClick={create.onTrue}
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add Appointment
              </Button>
            </Box>
          </Stack>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 2 }}>
            <Box display='flex' flexDirection="row" alignItems='center' width="100%" gap={1}>
              <Button
                variant={view === "list" ? "contained" : "outlined"}
                sx={{ mr: 1 }}
                onClick={() => setView("list")}
              >
                List View
              </Button>
              <Button
                variant={view === "calendar" ? "contained" : "outlined"}
                onClick={() => setView("calendar")}
              >
                Calendar View
              </Button>
            </Box>
            <Box display='flex' flexDirection="row" alignItems='center' width="100%" gap={1}>
              <RHFSelect
                name="Doctor"
                label="Doctor"
              >
                {doctorList.map((doctor) => (
                  <MenuItem key={doctor.value} value={doctor.value}>
                    {doctor.label}
                  </MenuItem>
                ))}
              </RHFSelect>
              {
                view === "list" &&
                <>
                  <RHFSelect
                    name="Type of Facility"
                    label="Type of Facility"
                  >
                    {doctorList.map((doctor) => (
                      <MenuItem key={doctor.value} value={doctor.value}>
                        {doctor.label}
                      </MenuItem>
                    ))}
                  </RHFSelect>
                  <RHFDateField name="date" label="Select Date" />
                </>
              }
            </Box>
          </Box>

          <Card>
            {
              view === "list" && (
                <FacilityAppointmentTable tableData={tableData} />
              )
            }
            {
              view === "calendar" && (
                <FacilityAppointmentCalendar />
              )
            }
          </Card>
        </Container>
      </FormProvider>

      <AddAppointmentDialog open={create.value} onClose={create.onFalse} />

    </>
  );
}
