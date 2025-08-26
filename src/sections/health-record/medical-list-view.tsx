'use client';

import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

import { Box, Stack } from '@mui/system';
import { Grid, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import Iconify from 'src/app/components/iconify';
import Label from 'src/components/label';
import { labSections, medicines } from 'src/utils/dummyMembers';


export default function MedicalRecordView() {

  const settings = useSettingsContext();
  const [tab, setTab] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Tabs value={tab} onChange={handleChange} aria-label="settings tabs">
        <Tab label="General Info" />
        <Tab label="Examination" />
        <Tab label="Laboratory Results" />
        <Tab label="Medications" />
        <Tab label="Imaging Documents" />
        <Tab label="MICS" />
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <GeneralInfo />}
        {tab === 1 && <ExaminationInfo />}
        {tab === 2 && <LaboratoryInfo />}
        {tab === 3 && <MedicationsInfo />}
        {tab === 4 && <ImagingDocumentInfo />}
        {tab === 5 && <Typography>MICS...</Typography>}
      </Box>
    </Container>
  );
}

function GeneralInfo() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={2}>
          <VitalsItem icon={<Iconify icon="ph:heartbeat-light" />} label="Pulse Rate" value="0 Bit per Minute" />
          <VitalsItem icon={<Iconify icon="material-symbols:bloodtype" width="24" height="24" />} label="Blood Pressure" value="0/0 mmHg" />
          <VitalsItem icon={<Iconify icon="material-symbols:respiratory-rate" width="50" height="50" />} label="Respiratory Rate" value="0 X per Minute" />
          <VitalsItem icon={<Iconify icon="ph:thermometer-light" />} label="Temperature" value="0 °C" />
          <VitalsItem icon={<Iconify icon="icon-park-outline:weight" width="48" height="48" />} label="Weight" value="0 Kgs" />
          <VitalsItem icon={<Iconify icon="tdesign:map-ruler" width="24" height="24" />} label="Height" value="0 Cm" />
        </Stack>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">General Notes</Typography>
          <Typography variant="body2" color="text.secondary">—</Typography>
        </Paper>
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">Complain</Typography>
          <Typography variant="body2" color="text.secondary">—</Typography>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Plan</Typography>
          <Typography variant="body2" color="text.secondary">—</Typography>
        </Paper>
        <Label
          variant="soft"
          color='primary'
          fontSize={150}
        >
          Last update 19 April 2023 by Mr. Jaylo Patel
        </Label>
      </Grid>
    </Grid>
  );
}

function VitalsItem({ icon, label, value }: any) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      {icon}
      <Box>
        <Typography variant="subtitle2">{value}</Typography>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
      </Box>
    </Stack>
  );
}

function ExaminationInfo() {
  return (
    <Box >
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">GENERAL</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">CARDIOVASCULAR SYSTEM EXAM (CVS)</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">RESPIRATORY</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">ABDOMEN</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">CENTRAL NERVOUS SYSTEM (CNS)</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">MUSCULOSKELETAL SYSTEM</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">HEAD, EYE, EAR, NOSE, AND THROAT (HEENT)</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">GENITO URINARY SYSTEM</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1">OTHER SYSTEM</Typography>
        <Typography variant="body2" color="text.secondary">No details</Typography>
      </Paper>
    </Box>
  );
}

function LaboratoryInfo() {
  return (
    <Box>
      {/* Section Title */}
      {labSections.map((section, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          {/* Section Title */}
          <Typography
            variant="subtitle1"
            bgcolor="primary.main"
            sx={{ fontWeight: 600, p: 1, mb: 2 }}
          >
            {section.title}
          </Typography>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Test</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Unit</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {section.tests.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.value}</TableCell>
                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.result}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ))}
    </Box>
  );
}

function MedicationsInfo() {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>List of medicines</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Procedure</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Qty</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">
                    No medicines added
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              medicines.map((med: any, i) => (
                <TableRow key={i}>
                  <TableCell>{med?.date}</TableCell>
                  <TableCell>{med?.name}</TableCell>
                  <TableCell>{med?.procedure}</TableCell>
                  <TableCell>{med?.type}</TableCell>
                  <TableCell>{med?.qty}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

function ImagingDocumentInfo() {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name of Las</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Files</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">
                    No imaging documents added
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              medicines.map((med: any, i) => (
                <TableRow key={i}>
                  <TableCell>{med?.date}</TableCell>
                  <TableCell>{med?.name}</TableCell>
                  <TableCell>{med?.procedure}</TableCell>
                  <TableCell>{med?.type}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}