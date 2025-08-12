'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Markdown from '../markdown/markdown';

type Props = {
  llm_response: string;
}

const AIResponseCard = ({
  llm_response
}: Props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        my: 3,
        borderRadius: 3,
        // background: "linear-gradient(135deg, #1f4f99, #5b8ef2)",
        background: "linear-gradient(135deg, #304352, #939393)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* AI Badge */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "#00c853",
          color: "white",
          borderRadius: "20px",
          padding: "4px 12px",
          fontSize: "14px",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 1,
          zIndex: 2,
        }}
      >
        <Icon icon="fluent-emoji-high-contrast:sparkles" fontSize={20} />
        AI Answered
      </Box>

      <CardContent
        sx={{
          mt: 1,
          [theme.breakpoints.down('sm')]: {
            mt: 5,
          },
        }}
      >
        {/* AI Avatar */}
        <Stack alignItems="center" gap={1} direction="row" mb={3}>
          <Icon icon="mdi:robot-outline" fontSize={32} style={{ color: "#00e676", flexShrink: 0 }} />
          <Typography
            fontSize="24px"
            fontWeight="bold"
            color="white"
          >
            TFZ AI Answered
          </Typography>
        </Stack>

        {/* AI Response */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "16px",
            borderRadius: "12px",
            backdropFilter: "blur(6px)",
            color: "white",
          }}
        >
          <Markdown children={llm_response} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default AIResponseCard 