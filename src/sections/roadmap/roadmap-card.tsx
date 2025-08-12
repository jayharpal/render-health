import { IRoadmap } from 'src/types/roadmap';
import { Card, LinearProgress, Stack, Typography } from '@mui/material';
import RoadMapCardProjectList from './roadmap-card-project-list';

// ----------------------------------------------------------------------

type Props = {
  roadmapdata: IRoadmap;
};

export default function RoadMapCard({ roadmapdata }: Props) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        padding: "20px",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {roadmapdata.title}
      </Typography>

      {/* Progress Bar Section */}
      <Stack spacing={1} sx={{ marginBottom: 2 }}>
        <Typography variant="body2">Progress: {roadmapdata.progress}&#37;</Typography>
        <LinearProgress
          variant="buffer"
          value={roadmapdata.progress}
          sx={{ height: 8, borderRadius: 5 }}
        />
      </Stack>

      <Stack>
        <RoadMapCardProjectList projectlist={roadmapdata.projects} />
      </Stack>
    </Card>
  );
}
