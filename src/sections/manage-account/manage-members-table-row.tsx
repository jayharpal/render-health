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
//
import { IInquiry } from 'src/types/inquiry';
// import InquiryInfo from './inquiry-info';
// ----------------------------------------------------------------------

type Props = {
  row: any;
  sr_no: number;
  onEditRow: VoidFunction;
};

export default function ManageMembersTableRow({ row, sr_no, onEditRow }: Props) {
  const { createdAt, memberName, patientId, hospitalName, dateOfBirth, typeOfRegister, registeredBy } = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{createdAt}</TableCell>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <ListItemText
            primary={memberName}
            // secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{ component: 'span', color: 'text.disabled' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{patientId}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{dateOfBirth}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{typeOfRegister}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{registeredBy}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{hospitalName}</TableCell>

        {/* <TableCell>
          <Label
            variant="soft"
            color={
              (status === 'submitted' && 'warning') ||
              (status === 'contacted' && 'info') ||
              (status === 'testScheduled' && 'secondary') ||
              (status === 'testCompleted' && 'primary') ||
              (status === 'internshipApproved' && 'success') ||
              'default'
            }
          >
            {status}
          </Label>
        </TableCell> */}

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Quick Info" placement="top" arrow>
            <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>
              <Iconify icon="mdi:eye" />
            </IconButton>
          </Tooltip>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <InquiryInfo currentInquiry={row} open={quickEdit.value} onClose={quickEdit.onFalse} /> */}

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
