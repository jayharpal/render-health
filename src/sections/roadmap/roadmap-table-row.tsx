import { format } from 'date-fns';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hook';
// types
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import FileThumbnail from 'src/components/file-thumbnail';
//
import { paths } from 'src/routes/paths';
import { deleteRoadmap, getRoadmaps } from 'src/redux/slices/roadmap';
import { dispatch } from 'src/redux/store';
import { IRoadmap } from 'src/types/roadmap';
import RoadMapNewFolderDialog from './roadmap-new-folder-dialog';
import KanbanInternsDialog from './roadmap-contacts-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IRoadmap;
  editRowData: IRoadmap | null;
  isAdmin: boolean;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
};

export default function RoadMapTableRow({
  row,
  isAdmin,
  onDeleteRow,
  onEditRow,
  editRowData,
}: Props) {
  const theme = useTheme();
  const router = useRouter();

  const { title, updatedAt, _id } = row;

  const details = useBoolean();

  const confirm = useBoolean();

  const edit = useBoolean();

  const popover = usePopover();

  const handleClick = () => {
    router.push(paths.dashboard.roadmap.id(_id as string));
  };
  const handleEditClick = () => {
    router.push(paths.dashboard.roadmap.edit(_id as string));
  };

  const handleDelete = async () => {
    const postadata = {
      roadmap_id: row._id,
    };
    try {
      const res = await dispatch(deleteRoadmap(postadata));
      if (res.data.status) {
        dispatch(getRoadmaps());
      }
      onDeleteRow();
    } catch (error) {
      console.error('Error deleting roadmap:', error);
    }
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

  return (
    <>
      <TableRow
        sx={{
          borderRadius: 2,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: theme.customShadows.z20,
            },
          },
          [`& .${tableCellClasses.root}`]: {
            ...defaultStyles,
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
              {title}
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
            sx={{
              px: 1,
              whiteSpace: 'nowrap',
              display: 'flex',
            }}
          >
            <IconButton onClick={() => details.onTrue()}>
              <Iconify icon="mingcute:add-line" />
            </IconButton>
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
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>

        <MenuItem onClick={handleEditClick}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
      <KanbanInternsDialog
        open={details.value}
        onClose={details.onFalse}
        roadmap_id={_id as string}
      />

      <RoadMapNewFolderDialog
        currentProject={editRowData}
        open={edit.value}
        onClose={edit.onFalse}
      />
    </>
  );
}
