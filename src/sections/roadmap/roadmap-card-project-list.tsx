// @mui
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
// types
// components

import Link from 'next/link';
import { IRoadmapProject } from 'src/types/roadmap';
import { useTheme } from '@mui/system';

// ----------------------------------------------------------------------

type Props = {
  projectlist: IRoadmapProject[] | undefined;
};
type TimelineDotColor =
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'inherit'
  | 'grey'
  | 'primary'
  | 'secondary';

export default function RoadMapCardProjectList({ projectlist }: Props) {
  const theme = useTheme();
  const colors: TimelineDotColor[] = [
    'error',
    'success',
    'warning',
    'info',
    'inherit',
    'grey',
    'primary',
    'secondary',
  ];

  return (
    <Timeline
      sx={{
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {projectlist?.map((project, index) => {
        const isLastItem = index === projectlist.length - 1;
        const colorIndex = index % colors.length; // Cycle through colors
        const color = colors[colorIndex];
        return (
          <TimelineItem key={index} sx={isLastItem ? { minHeight: 0 } : {}}>
            <TimelineSeparator>
              <TimelineDot variant="outlined" color={color} sx={{ width: 37, height: 35, alignItems: 'center', justifyContent: 'center' }}>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  }}
                >
                  {project.progress}&#37;
                </span>
              </TimelineDot>
              {index !== projectlist.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Link
                href={`/dashboard/projects/${project?._id}`}
                style={{
                  textDecoration: 'none',
                  color:
                    theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                {project?.name}
              </Link>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
}
