import React, { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemAvatar from '@mui/material/ListItemAvatar';
// types
import { IAssignee } from 'src/types/taskboard';
// components
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import SearchNotFound from 'src/components/search-not-found';

const ITEM_HEIGHT = 64;

type Props = {
    open: boolean;
    onClose: VoidFunction;
    assignees: IAssignee[];
    selectedAssignees: IAssignee[];
    onAddAssignees: (newAssignee: IAssignee) => void;
    onRemoveAssignees: (id: string) => void;
};

export default function TaskboardContactsDialog({
    open,
    onClose,
    assignees,
    selectedAssignees,
    onAddAssignees,
    onRemoveAssignees,
}: Props) {
    const [searchAssignee, setSearchAssignee] = useState('');

    const handleSearchAssignees = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchAssignee(event.target.value);
    }, []);

    const dataFiltered = applyFilter({
        inputData: assignees,
        query: searchAssignee,
    });

    const notFound = !dataFiltered.length && !!searchAssignee;

    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
            <DialogTitle sx={{ pb: 0 }}>
                Interns <Typography component="span">({assignees.length})</Typography>
            </DialogTitle>

            <Box sx={{ px: 3, py: 2.5 }}>
                <TextField
                    fullWidth
                    value={searchAssignee}
                    onChange={handleSearchAssignees}
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            <DialogContent sx={{ p: 0 }}>
                {notFound ? (
                    <SearchNotFound query={searchAssignee} sx={{ mt: 3, mb: 10 }} />
                ) : (
                    <Scrollbar
                        sx={{
                            px: 2.5,
                            height: ITEM_HEIGHT * 6,
                        }}
                    >
                        {dataFiltered.map((assignee) => {
                            const checked = selectedAssignees.some(
                                (selected) => selected.id === assignee.id
                            );

                            return (
                                <ListItem
                                    key={assignee.id}
                                    disableGutters
                                    secondaryAction={
                                        <Button
                                            size="small"
                                            color={checked ? 'primary' : 'inherit'}
                                            startIcon={
                                                <Iconify
                                                    width={16}
                                                    icon={checked ? 'eva:checkmark-fill' : 'mingcute:add-line'}
                                                    sx={{ mr: -0.5 }}
                                                />
                                            }
                                            onClick={() =>
                                                !checked
                                                    ? onAddAssignees(assignee)
                                                    : onRemoveAssignees(assignee.id)
                                            }
                                        >
                                            {checked ? 'Added' : 'Add'}
                                        </Button>
                                    }
                                    sx={{ height: ITEM_HEIGHT }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={assignee.avatarUrl} alt={assignee.name} />
                                    </ListItemAvatar>

                                    <ListItemText
                                        primaryTypographyProps={{ typography: 'subtitle2', sx: { mb: 0.25 } }}
                                        secondaryTypographyProps={{ typography: 'caption' }}
                                        primary={assignee.name}
                                    />
                                </ListItem>
                            );
                        })}
                    </Scrollbar>
                )}
            </DialogContent>
        </Dialog>
    );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, query }: { inputData: IAssignee[]; query: string }) {
    if (query) {
        inputData = inputData.filter(
            (assignee) =>
                (assignee.name?.toLowerCase().indexOf(query.toLowerCase()) ?? -1) !== -1
        );
    }

    return inputData;
}
