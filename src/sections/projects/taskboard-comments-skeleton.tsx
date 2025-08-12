import React from 'react';
import { Avatar, Skeleton, Stack, Typography } from '@mui/material';

const TaskboardCommentsSkeleton = () => {
    const skeletonArray = Array.from({ length: 3 }, (_, index) => index);

    return (
        <Stack
            spacing={3}
            flexGrow={1}
            sx={{
                py: 3,
                px: 2.5,
                bgcolor: 'background.neutral',
            }}
        >
            {
                skeletonArray.map((item, index) =>
                    <Stack key={index} direction="row" spacing={2}>
                        <Skeleton
                            sx={{
                                width: 99,
                                height: 50,
                                overflow: "visible",
                                maxWidth: "unset",
                                borderRadius: 99
                            }}
                        >
                            <Avatar />
                        </Skeleton>
                        <Stack spacing={0.5} flexGrow={1}>
                            <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" gap={1} flexWrap="wrap">
                                <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between" columnGap={1} flexWrap="wrap">
                                    <Skeleton
                                        sx={{
                                            borderRadius: 1
                                        }}
                                    >
                                        <Typography variant="subtitle2">
                                            comment?.user_data?.[0]
                                        </Typography>
                                    </Skeleton>
                                    <Skeleton
                                        sx={{
                                            borderRadius: 1
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                                            1 day ago
                                        </Typography>
                                    </Skeleton>
                                </Stack>
                                <Skeleton
                                    sx={{
                                        borderRadius: 1
                                    }}
                                >
                                    <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                                        comment.comment_textcomment.comment_textcomment.comment_text
                                    </Typography>
                                </Skeleton>
                            </Stack>
                        </Stack>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default TaskboardCommentsSkeleton