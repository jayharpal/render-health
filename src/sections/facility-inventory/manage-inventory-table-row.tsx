// @mui
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Box } from '@mui/material';
import DownloadDialog from './download-dailog';

type Props = {
  row: any;
  onEditRow: VoidFunction;
};

export default function ManageInventoryTableRow({ row, onEditRow }: Props) {

  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.group}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.priceType}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.uploadedDate}</TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={quickEdit.onTrue}
              startIcon={<Iconify icon="material-symbols:download-sharp" />}
            >
              Download
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
            >
              Delete
            </Button>
          </Box>
        </TableCell>
      </TableRow>

      <DownloadDialog open={quickEdit.value} onClose={quickEdit.onFalse} />

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
