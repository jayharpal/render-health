'use client';

import { useState } from 'react';
// @mui
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';

import { Box, Stack } from '@mui/system';
import { Tab, Tabs, Typography } from '@mui/material';
import AccountInfo from '../AccountInfo';
import Profile from '../Profile';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function SettingsView() {

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

        <Tabs value={tab} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Account Info" />
          <Tab label="Profile" />
        </Tabs>

        <Box sx={{ mt: 3 }}>
          {tab === 0 && <AccountInfo />}
          {tab === 1 && <Profile />}
        </Box>
      </Container>
  );
}
