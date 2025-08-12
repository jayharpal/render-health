import { Stack, Skeleton, Paper, ListItemText } from '@mui/material';
import { BoxProps } from '@mui/material/Box';

// ----------------------------------------------------------------------

type Props = BoxProps & {
    index?: number;
};

export function SubjectSkeleton({ index, sx, ...other }: Props) {
    return (
        <Stack
            component={Paper}
            variant="outlined"
            sx={{
                p: 1,
                borderRadius: 2,
                position: 'relative',
                height: '174px',
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
                    top: 8,
                    right: 8,
                }}
            />

            <Stack sx={{ p: 3, pb: 2 }}>
                <Skeleton
                    variant="rectangular"
                    width={60}
                    height={60}
                    sx={{ mb: 2, borderRadius: 1 }}
                />

                <ListItemText
                    sx={{ mb: 1 }}
                    primary={<Skeleton width="60%" />}
                    secondary={<Skeleton width="40%" />}
                    primaryTypographyProps={{
                        typography: 'subtitle1',
                    }}
                    secondaryTypographyProps={{
                        mt: 1,
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                />
            </Stack>
        </Stack>
    );
}
