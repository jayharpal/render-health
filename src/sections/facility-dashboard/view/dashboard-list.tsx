'use client';

import { useState } from 'react';
import { Button, Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import FormProvider from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Iconify from 'src/app/components/iconify';
import { useRouter } from 'src/routes/hook';
import AddPatientDialog from '../patient-add-model';


const data = [
  { date: 'Thu, 21/08/25', patients: 0 },
  { date: 'Sat, 23/08/25', patients: 0 },
  { date: 'Mon, 25/08/25', patients: 0 },
  { date: 'Wed, 27/08/25', patients: 1 },
];

export default function FacilityDashboardList() {
  const theme = useTheme();
  const methods = useForm();
  const create = useBoolean();
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);
  const [expandedRevenue, setExpandedRevenue] = useState(true);
  const [expandedAppointments, setExpandedAppointments] = useState(true);

  return (
    <FormProvider methods={methods}>
      <Box>
        {/* Title */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Dashboard Overview
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 3, py: 1.5, borderRadius: 2 }}
              onClick={() => {
                router.push(paths.dashboard.searchPatient.root);
              }}
            >
              Patient Search
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{ px: 3, py: 1.5, borderRadius: 2 }}
              onClick={create.onTrue}
            >
              Register New Patients
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mb: 3 }}>
          <Card sx={{ textAlign: 'start', borderRadius: 3, mb: 3 }} >
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Patients Chart</Typography>
              <Iconify icon="iconamoon:arrow-up-2-light"
                onClick={() => setExpanded((prev) => !prev)}
                sx={{
                  width: 30,
                  height: 30,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
            </CardContent>
          </Card>
          {
            expanded &&
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={290}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="patients" stroke={theme.palette.primary.main} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Stats */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="h6">1</Typography>
                        <Typography color="primary.main">Patients Today</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="h6">1</Typography>
                        <Typography color="primary.main">Total Admitted</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="h6">438</Typography>
                        <Typography color="primary.main">Open Beds</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography variant="h6">1</Typography>
                        <Typography color="primary.main">Occupied Beds</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        </Box>

        <Box sx={{ mb: 3 }}>
          <Card sx={{ textAlign: 'start', borderRadius: 3, mb: 3 }} >
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Revenue Chart</Typography>
              <Iconify icon="iconamoon:arrow-up-2-light"
                onClick={() => setExpandedRevenue((prev) => !prev)}
                sx={{
                  width: 30,
                  height: 30,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  transform: expandedRevenue ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
            </CardContent>
          </Card>
          {
            expandedRevenue &&
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={290}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="patients" stroke={theme.palette.primary.main} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">Revenue Today</Typography>
                        <Typography variant="h6">1</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">Total HMO</Typography>
                        <Typography variant="h6">1</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">Open Own</Typography>
                        <Typography variant="h6">438</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        </Box>

        <Box sx={{ mb: 3 }}>
          <Card sx={{ textAlign: 'start', borderRadius: 3, mb: 3 }} >
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Appointments Chart</Typography>
              <Iconify icon="iconamoon:arrow-up-2-light"
                onClick={() => setExpandedAppointments((prev) => !prev)}
                sx={{
                  width: 30,
                  height: 30,
                  cursor: 'pointer',
                  transition: 'transform 0.3s',
                  transform: expandedAppointments ? 'rotate(180deg)' : 'rotate(0deg)',
                }} />
            </CardContent>
          </Card>
          {
            expandedAppointments &&
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={290}>
                      <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="patients" stroke={theme.palette.primary.main} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">Appointments Today</Typography>
                        <Typography variant="h6">0</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">TeleHealth Appointments</Typography>
                        <Typography variant="h6">0</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12}>
                    <Card sx={{ textAlign: 'center', borderRadius: 3 }}>
                      <CardContent>
                        <Typography color="primary.main">Facility Appointments</Typography>
                        <Typography variant="h6">0</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          }
        </Box>
      </Box>

      <AddPatientDialog open={create.value} onClose={create.onFalse} />
    </FormProvider>
  );
}
