'use client';

import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import FormProvider, { RHFDateField } from 'src/components/hook-form';

export default function AppointmentList() {
  const theme = useTheme();

  const methods = useForm();

  const stats = [
    { value: 26, label: 'Total Patient' },
    { value: 7, label: 'Total Healthcare Facilities' },
    { value: 0, label: 'Total Fitness & wellness' },
    { value: 0, label: 'Total Fitness Trainers' },
    { value: 5, label: 'Total Doctors' },
    { value: 21, label: 'Render Employee' },
    { value: 7, label: 'Total Health Records' },
    { value: 2, label: 'Total Facility Appointment' },
    { value: 0, label: 'Total Teleconsultation Appointment' },
    { value: 0, label: 'Total Bill Created' },
    { value: 0, label: 'Total Health Diary' },
    { value: 0, label: 'Total HMO' },
    { value: 0, label: "Total Enrollee's" },
    { value: '₦ 662,450.00', label: 'Bills' },
  ];

  return (
    <FormProvider methods={methods}>
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Dashboard Overview
        </Typography>

        <Box
          display="flex"
          flexDirection='row'
          flexWrap="wrap"
          gap={2}
          mb={3}
          width="100%"
        >
          <Box>
            <RHFDateField name="startDate" label="Start Date" />
          </Box>
          <Box>
            <RHFDateField name="endDate" label="End Date" />
          </Box>
          <Button
            variant="contained"
          >
            Search
          </Button>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          gap={2}
        >
          {stats.map((item, index) => (
            <Box
              key={index}
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: '#fff',
                borderRadius: 1,
                p: 2,
                textAlign: 'center',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ lineHeight: 1.2 }}
              >
                {item.value}
              </Typography>
              <Typography variant="body2">{item.label}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </FormProvider>
  );
}
