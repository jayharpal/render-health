// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  sr_no: number;
  onEditRow: VoidFunction;
};

export default function DealTableRow({ row, sr_no, onEditRow }: Props) {

  const confirm = useBoolean();

  const create = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
           <Avatar src={row?.image} sx={{ mr: 2 }} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.name_of_facility}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.deal_category}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.deal_start_date}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.deal_end_date}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row?.deal_status === 'Active' && 'success') ||
              (row?.deal_status === 'Inactive' && 'error') ||
              'default'
            }
          >
            {row?.deal_status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Info" placement="top" arrow>
            <IconButton color={create.value ? 'inherit' : 'default'} onClick={create.onTrue}>
              <Iconify icon="mdi:eye" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
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

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
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
          <Button variant="contained" color="error">
            Delete
          </Button>
        }
      />
    </>
  );
}
