// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AddPriceDialog from './price-add-model';
import AddInventoryDialog from './inventory-add-model';
//
// ----------------------------------------------------------------------

type Props = {
  row: any;
  sr_no: number;
  onEditRow: VoidFunction;
};

export default function InventoryTableRow({ row, sr_no, onEditRow }: Props) {

  const confirm = useBoolean();
  const price = useBoolean();
  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.dosageForm}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.strengths}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.count}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.description}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.qty}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.lowStockAlert}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.price}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <AddPriceDialog open={price.value} onClose={price.onFalse} />
      <AddInventoryDialog open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            price.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="iconoir:money-square" />
          Price
        </MenuItem>
        <MenuItem
          onClick={() => {
            quickEdit.onTrue();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
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
