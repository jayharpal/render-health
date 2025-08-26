// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
//
// ----------------------------------------------------------------------

type Props = {
  row: any;
  onEditRow: VoidFunction;
};

export default function ReconciliationTableRow({ row, onEditRow }: Props) {

  const confirm = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.date}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.transactionId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.cardholder}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.rhscNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.amount}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.processedBy}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row?.status === 'YES' && 'success') ||
              (row?.status === 'NO' && 'error') ||
              'default'
            }
          >
            {row?.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
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
