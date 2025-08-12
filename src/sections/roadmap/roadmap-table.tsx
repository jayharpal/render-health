import { useCallback, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';
import { tablePaginationClasses } from '@mui/material/TablePagination';
// types
// components
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
import { IRoadmap } from 'src/types/roadmap';
import RoadMapTableRow from './roadmap-table-row';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  notFound: boolean;
  tableData: IRoadmap[];
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
};

export default function RoadMapTable({
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
      { id: 'name', label: 'Name' },
      { id: 'modifiedAt', label: 'Modified', width: 140 },
      { id: '', width: 88 },
    ];
  } else {
    TABLE_HEAD = [
      { id: 'name', label: 'Name' },
      { id: 'modifiedAt', label: 'Modified', width: 240 },
      // { id: '', width: 88 },
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
    onChangeDense,
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
          margin: theme.spacing(-2, -3, -3, -3),
          [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(-1),
          },
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
                <RoadMapTableRow
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
        onChangeDense={onChangeDense}
        sx={{
          [`& .${tablePaginationClasses.toolbar}`]: {
            borderTopColor: 'transparent',
          },
        }}
      />
    </>
  );
}
