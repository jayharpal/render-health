'use client';

import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  Typography,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { addDays, format } from 'date-fns';
import BookingAppointmentForm from '../booking-appointment-from';

export default function AvailabilityListView() {
  const create = useBoolean();

  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Girju Otwal');
  const [showAppointments, setShowAppointments] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [newAppointment, setNewAppointment] = useState({ title: '', hour: '' });
  const [clickedSlot, setClickedSlot] = useState<{ day: Date; hour: number } | null>(null);

  const [appointments, setAppointments] = useState<any[]>([
    { doctor: 'Dr. Girju Otwal', date: format(new Date(), 'MM/dd/yyyy'), hour: 10, title: 'Patient A' },
  ]);

  const startOfWeek = selectedDate
    ? new Date(selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay()))
    : new Date();

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(startOfWeek, i));

  const hours = Array.from({ length: 9 }).map((_, i) => 9 + i);

  const handleCellClick = (day: Date, hour: number) => {
    setClickedSlot({ day, hour });
    setNewAppointment({ title: '', hour: String(hour) });
    create.onTrue();
  };

  const handleSave = (data: any) => {
    if (clickedSlot) {
      const newAppt = {
        doctor: selectedDoctor,
        date: format(clickedSlot.day, 'MM/dd/yyyy'),
        hour: clickedSlot.hour,
        title: data.name,
      };
      setAppointments([...appointments, newAppt]);
      create.onFalse();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                Doctor Availability
              </Typography>

              <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
              >
                <MenuItem value="Dr. Girju Otwal">Dr. Girju Otwal</MenuItem>
                <MenuItem value="Dr. Smith">Dr. Smith</MenuItem>
              </Select>

              <FormControlLabel
                control={
                  <Switch
                    checked={showAppointments}
                    onChange={() => setShowAppointments(!showAppointments)}
                  />
                }
                label="Show Appointment"
              />

              <DateCalendar value={selectedDate} onChange={setSelectedDate} />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Weekly Schedule
              </Typography>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell />
                    {weekDays.map((day, idx) => (
                      <TableCell key={idx} align="center" sx={{ fontWeight: 600 }}>
                        {format(day, 'E dd/MM')}
                      </TableCell>
                    ))}
                  </TableRow>

                  {hours.map((hour) => (
                    <TableRow key={hour}>
                      <TableCell sx={{ fontWeight: 600 }}>{`${hour}:00`}</TableCell>
                      {weekDays.map((day, idx) => {
                        const appointment = appointments.find(
                          (a) =>
                            a.doctor === selectedDoctor &&
                            a.date === format(day, 'MM/dd/yyyy') &&
                            a.hour === hour
                        );
                        return (
                          <TableCell
                            key={idx}
                            align="center"
                            sx={{ cursor: 'pointer', bgcolor: appointment ? '#e3f2fd' : undefined }}
                            onClick={() => handleCellClick(day, hour)}
                          >
                            {showAppointments && appointment ? appointment.title : ''}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <BookingAppointmentForm open={create.value} onClose={create.onFalse} handleSave={handleSave} />

    </LocalizationProvider>
  );
}
