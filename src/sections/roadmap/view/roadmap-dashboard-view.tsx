'use client';

import { useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// components
import { useSnackbar } from 'src/components/snackbar';

import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getRoadmaps, clearNotification } from 'src/redux/slices/roadmap';
import { IRoadmap } from 'src/types/roadmap';
import { hasData } from 'src/utils/helper';
import RoadMapCard from '../roadmap-card';


// ----------------------------------------------------------------------

export default function RoadMapDashboardView() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { roadmaps, notification, variant } = useSelector(
    (state: RootState) => state.roadmap
  );

  useEffect(() => {
    dispatch(getRoadmaps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, dispatch, enqueueSnackbar, variant]);

  return (
    <Stack marginX={3}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Roadmap
      </Typography>
      <Grid container spacing={3}>
        {hasData(roadmaps) && roadmaps.map((roadmap: IRoadmap) =>
        (
          <Grid item key={roadmap._id} xs={12} sm={6} md={4} lg={3} xl={3}>
            <RoadMapCard roadmapdata={roadmap} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
