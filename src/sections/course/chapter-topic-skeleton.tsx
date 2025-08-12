import { Stack, Skeleton, Paper } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = BoxProps & {
    index?: number;
};

export function ChapterTopicSkeleton({ index, sx, ...other }: Props) {
    return (
        <Stack
            component={Paper}
            variant="outlined"
            sx={{
                borderRadius: 2,
                position: 'relative',
                height: '82px',
                ...sx,
            }}
            {...other}
        >
            <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{
                    position: 'absolute',
                    top: 25,
                    right: 8,
                }}
            />

            <Stack sx={{ p: 2 }} flexDirection="row" columnGap="20px">
                <Skeleton
                    variant="rectangular"
                    width={48}
                    height={48}
                    sx={{ borderRadius: 1 }}
                />

                <Stack sx={{ flexGrow: 1 }}>
                    <Skeleton width="60%" sx={{ mb: 1 }} />
                    <Skeleton width="40%" />
                </Stack>
            </Stack>
        </Stack>
    );
}
