// @mui
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import ViewReportDetailsDialog from './view-report-details-model';
//
// ----------------------------------------------------------------------

type Props = {
  row: any;
  onEditRow?: VoidFunction;
  selected: boolean;
};

export default function ReportTableRow({ row, onEditRow, selected }: Props) {

  const confirm = useBoolean();
  const viewStaff = useBoolean();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.rhId}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.transactionType}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.cardNumber}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.merchantName}</TableCell>
        <TableCell>
          <Label
            variant="soft"
            color={
              (row?.status === 'Done' && 'success') ||
              (row?.status === 'Pending' && 'warning') ||
              (row?.status === 'Failed' && 'error') ||
              'default'
            }
          >
            {row?.status}
          </Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.settledStatus}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.amount}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.createdAt}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View Climes" placement="top" arrow>
            <IconButton color={viewStaff.value ? 'inherit' : 'default'} onClick={viewStaff.onTrue}>
              <Iconify icon="mdi:eye" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <ViewReportDetailsDialog open={viewStaff.value} onClose={viewStaff.onFalse} currentData={row} />

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
