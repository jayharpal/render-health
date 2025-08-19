import { Card, MenuItem, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { StaffData } from 'src/utils/dummyMembers';
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, useTable } from 'src/app/components/table';
import { hasData } from 'src/utils/helper';
import Scrollbar from 'src/app/components/scrollbar';

// ----------------------------------------------------------------------

type Props = {
  currentBooking?: any | null;
  onClose?: VoidFunction;
};

const TABLE_HEAD = [
  { id: 'CREATED AT', label: 'CREATED AT' },
  { id: 'RH ID', label: 'RH ID' },
  { id: 'NAME', label: 'NAME' },
  { id: 'EMAIL', label: 'EMAIL' },
];


export default function StaffViewFrom({ onClose, currentBooking }: Props) {

  const table = useTable();

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(StaffData);

  return (
    <Card>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'}>
            <TableHeadCustom
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={StaffData?.length || 0}
              numSelected={table.selected.length}
              onSort={table.onSort}
            />
            <TableBody>
              <>
                {hasData(StaffData) &&
                  StaffData
                    ?.slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row, index) => (
                      <TableRow>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.createdAt}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.rhId}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.name}</TableCell>
                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.email}</TableCell>
                      </TableRow>
                    ))}
                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, StaffData?.length)}
                />
                <TableNoData notFound={notFound} />
              </>
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={StaffData?.length}
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </Card>
  );
}
