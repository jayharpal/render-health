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
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import AddStaffDialog from './add-staff-model';
import ViewStaffDialog from './view-staff-model';
//
// ----------------------------------------------------------------------

type Props = {
  row: any;
  sr_no: number;
  onEditRow: VoidFunction;
};

export default function PaymentTableRow({ row, sr_no, onEditRow }: Props) {

  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const popover = usePopover();
  const staff = useBoolean();
  const viewStaff = useBoolean();

  return (
    <>
      <TableRow>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.paymentId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.status}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.cardHolder}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.facility}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.amount}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.discount}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.transactionFee}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.payout}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.submittedBy}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.submissionDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.approvedDate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.reviewedBy}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View Climes" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="mdi:eye" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <AddStaffDialog open={staff.value} onClose={staff.onFalse} />
      <ViewStaffDialog open={viewStaff.value} onClose={viewStaff.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 200 }}
      >

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="material-symbols:add" />
          New Upload Tariff
        </MenuItem>
        <MenuItem
          onClick={() => {
            staff.onTrue();
          }}
        >
          <Iconify icon="material-symbols:add" />
          Add Staff
        </MenuItem>
        <MenuItem
          onClick={() => {
            viewStaff.onTrue();
          }}
        >
          <Iconify icon="mdi:eye" />
          View Staff
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
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete Merchants
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
