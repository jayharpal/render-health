import { useState, useCallback } from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { inputBaseClasses } from '@mui/material/InputBase';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// utils
// import uuidv4 from 'src/utils/uuidv4';
// api
// import { createColumn } from 'src/api/kanban';
// components
import Iconify from 'src/components/iconify';
import { useDispatch } from 'src/redux/store';
import { createTaskBoard, getTaskBoards } from 'src/redux/slices/taskboard';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd({ projectId }: { projectId: string }) {
  const [columnName, setColumnName] = useState('');
  const dispatch = useDispatch();

  const openAddColumn = useBoolean();

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(event.target.value);
  }, []);

  const handleCreateColumn = useCallback(async () => {
    try {
      if (columnName) {
        const postData = {
          name: columnName,
          color_code: "#fff",
          is_default: true
        }
        const res = await dispatch(createTaskBoard(postData));
        if (res?.data?.status) {
          setColumnName('');
          openAddColumn.onFalse();
          dispatch(getTaskBoards(projectId))
        }
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnName, openAddColumn, dispatch, projectId]);

  const handleKeyUpCreateColumn = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleCreateColumn();
      }
    },
    [handleCreateColumn]
  );

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {openAddColumn.value ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={columnName}
            onChange={handleChangeName}
            onKeyUp={handleKeyUpCreateColumn}
            sx={{
              [`& .${inputBaseClasses.input}`]: {
                typography: 'h6',
              },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="mingcute:add-line" sx={{ mr: -0.5 }} />}
          onClick={openAddColumn.onTrue}
        >
          Add Section
        </Button>
      )}
    </Paper>
  );
}
