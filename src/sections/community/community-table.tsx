import { useCallback, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import Iconify from 'src/components/iconify';
import {
  emptyRows,
  TableProps,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import { useAuthContext } from 'src/auth/hooks';
import { ICommunityQuestion } from 'src/types/community';
import CommunityTableRow from './community-table-row';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  notFound: boolean;
  tableData: ICommunityQuestion[];
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
};

export default function CommunityTable({
  table,
  notFound,
  onDeleteRow,
  tableData,
  onOpenConfirm,
}: Props) {
  const theme = useTheme();
  const { isAdmin } = useAuthContext();

  const [editRowData, setEditRowData] = useState(null);

  let TABLE_HEAD;
  if (isAdmin) {
    TABLE_HEAD = [
      { id: 'name', label: 'Question' },
      { id: 'modifiedAt', label: 'Modified', width: 140 },
      { id: '', width: 100 },
    ];
  } else {
    TABLE_HEAD = [
      { id: 'name', label: 'Question' },
      { id: 'modifiedAt', label: 'Modified', width: 240 },
      { id: '', width: 100 },
    ];
  }

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    //
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  const denseHeight = dense ? 58 : 78;

  const handleEditRow = useCallback((row: any) => {
    setEditRowData(row);
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          m: theme.spacing(-2, -3, -3, -3),
        }}
      >
        <TableSelectedAction
          dense={dense}
          rowCount={tableData.length}
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={onOpenConfirm}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer
          sx={{
            p: theme.spacing(0, 3, 3, 3),
          }}
        >
          <Table
            size={dense ? 'small' : 'medium'}
            sx={{
              minWidth: 960,
              borderCollapse: 'separate',
              borderSpacing: '0 16px',
            }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={selected.length}
              // onSort={onSort}
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  '&:first-of-type': {
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                },
              }}
            />

            <TableBody>
              {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <CommunityTableRow
                  key={row._id as string}
                  isAdmin={isAdmin}
                  row={row}
                  editRowData={editRowData}
                  onDeleteRow={() => onDeleteRow(row._id as string)}
                  onEditRow={() => handleEditRow(row)}
                />
              ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
              />

              <TableNoData
                notFound={notFound}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: `dashed 1px ${theme.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        count={tableData.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        // onChangeDense={onChangeDense}
        sx={{
          [`& .${tablePaginationClasses.toolbar}`]: {
            borderTopColor: 'transparent',
          },
        }}
      />
    </>
  );
}
