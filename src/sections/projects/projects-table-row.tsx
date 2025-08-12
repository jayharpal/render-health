import { format } from 'date-fns';
// @mui
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { Divider } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hook';
// types
import { IProject } from 'src/types/projects';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FileThumbnail from 'src/components/file-thumbnail';
//
import { paths } from 'src/routes/paths';
import { dispatch } from 'src/redux/store';
import { LoadingButton } from '@mui/lab';
import { getProjects, updateProject } from 'src/redux/slices/projects';
import ProjectNewFolderDialog from './projects-new-folder-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IProject;
  editRowData: IProject | null;
  isAdmin: boolean;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function ProjectTableRow({
  row,
  isAdmin,
  onDeleteRow,
  onEditRow,
  editRowData,
}: Props) {
  const theme = useTheme();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { name, updatedAt, _id, is_archived } = row;

  const icon = is_archived ? 'mdi:unarchive' : 'mdi:archive';

  const details = useBoolean();

  const confirm = useBoolean();

  const edit = useBoolean();

  const popover = usePopover();

  const handleClick = () => {
    router.push(paths.dashboard.projects.id(_id as string));
  };

  const defaultStyles = {
    borderTop: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
  };

  const handleArchive = async () => {
    setLoading(true);
    try {
      const res = await dispatch(
        updateProject({
          project_id: _id,
          is_archived: !row.is_archived,
          members_id: row?.members_id,
        })
      );

      if (res?.data?.status) {
        dispatch(getProjects());
        popover.onClose();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 2,
          backgroundColor: is_archived ? '#F8F8F8' : 'background.paper',
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: is_archived ? '#F8F8F8' : 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: is_archived ? '#F8F8F8' : 'background.paper',
              boxShadow: theme.customShadows.z20,
            },
          },
          [`& .${tableCellClasses.root}`]: {
            ...defaultStyles,
            color: is_archived ? theme.palette.text.disabled : theme.palette.text.primary,
          },
          ...(details.value && {
            [`& .${tableCellClasses.root}`]: {
              ...defaultStyles,
            },
          }),
        }}
      >
        <TableCell onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail file="folder" sx={{ width: 36, height: 36 }} />

            <Typography
              noWrap
              variant="inherit"
              sx={{
                maxWidth: 360,
                cursor: 'pointer',
                ...(details.value && { fontWeight: 'fontWeightBold' }),
              }}
            >
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          <ListItemText
            primary={format(new Date(updatedAt as string), 'dd MMM yyyy')}
            secondary={format(new Date(updatedAt as string), 'p')}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        {isAdmin && (
          <TableCell
            align="right"
            sx={{
              px: 1,
              whiteSpace: 'nowrap',
            }}
          >
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            onEditRow();
            edit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <LoadingButton
          sx={{
            display: 'flex',
            justifyContent: 'flex-start', 
            alignItems: 'center',
            padding: '5px 12px', 
            gap: '8px', 
            fontWeight: 'normal', 
            fontSize: '14px', 
            textTransform: 'none', 
            '@media (max-width: 600px)': {
              padding: '12px',
            },
          }}
          fullWidth
          size="medium"
          onClick={handleArchive}
          loading={loading}
          startIcon={<Iconify icon={icon} />}
        >
          {is_archived ? 'Unarchive' : 'Archive'}
        </LoadingButton>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />

      <ProjectNewFolderDialog
        currentProject={editRowData}
        open={edit.value}
        onClose={edit.onFalse}
      />
    </>
  );
}
