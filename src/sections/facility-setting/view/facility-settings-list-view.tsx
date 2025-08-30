'use client';

import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

import { Box, Stack } from '@mui/system';
import { Tab, Tabs, Typography } from '@mui/material';
import AccountInfo from '../AccountInfo';
import Profile from '../Profile';
import Favorites from '../Favorites';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function FacilitySettingsView() {

  const settings = useSettingsContext();
  const [tab, setTab] = useState(0);

  const handleChange = (_: any, newValue: number) => {
    setTab(newValue);
  };

  return (
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

      <Box display='flex' flexDirection='row' justifyContent='space-between' sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Account Info" />
          <Tab label="Profile" />
          <Tab label="Favorites" />
        </Tabs>

        <Typography variant="subtitle2" sx={{ mt: 1, mb: 3, color: 'text.secondary' }}>
          Render ID: 123132164
        </Typography>

        <Typography variant="subtitle2" color='primary.main' sx={{ mt: 1, mb: 3, cursor: 'pointer' }}>
          Doctor Appointment Link
        </Typography>
      </Box>

      <Box sx={{ mt: 3 }}>
        {tab === 0 && <AccountInfo />}
        {tab === 1 && <Profile />}
        {tab === 2 && <Favorites />}
      </Box>
    </Container>
  );
}
