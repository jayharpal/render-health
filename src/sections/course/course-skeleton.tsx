// @mui
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { BoxProps } from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type Props = BoxProps & {
    index?: number;
};

export function CourseSkeleton({ index, sx, ...other }: Props) {
    return (
        <Stack
            component={Paper}
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                position: 'relative',
                ...sx,
            }}
            {...other}
        >
            <Skeleton
                variant="text"
                width={40}
                height={40}
                sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 8,
                }}
            />

            <Skeleton
                variant="rectangular"
                width="100%"
                height={164}
                sx={{
                    borderRadius: 1.5,
                }}
            />

            <Stack spacing={1} sx={{ mt: 2 }}>
                <Skeleton width="60%" />
                <Skeleton width="80%" />
            </Stack>

        </Stack>
    );
}
