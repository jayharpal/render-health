// @mui
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
// hooks
import { useAuthContext } from 'src/auth/hooks';
// components
import React, { useState } from 'react';
// ----------------------------------------------------------------------

type CommentFormProps = {
  onCommentSubmit: (comment: string) => void;
};

export default function KanbanDetailsCommentInput({ onCommentSubmit }: CommentFormProps) {
  const { user } = useAuthContext();
  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const handleCommentButtonClick = () => {
    onCommentSubmit(comment);
    setComment('');
  };

  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <Avatar src={user?.photoURL || user?.name || ''} alt={user?.name} />
      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1, bgcolor: 'transparent' }}>
        <InputBase
          fullWidth
          multiline
          rows={2}
          placeholder="Type a message"
          sx={{ px: 1 }}
          value={comment}
          onChange={handleCommentChange}
        />

        <Stack direction="row" alignItems="center" justifyContent="flex-end">
          {/* <Stack direction="row" flexGrow={1}>
            <IconButton>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>

            <IconButton>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
          </Stack> */}

          <Button variant="contained" onClick={handleCommentButtonClick} disabled={comment === ''}>
            Comment
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
