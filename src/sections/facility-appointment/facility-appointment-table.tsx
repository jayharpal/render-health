'use client';

import { useState } from 'react';
// @mui
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Scrollbar from 'src/components/scrollbar';
import { useSettingsContext } from 'src/components/settings';
import { useForm } from 'react-hook-form';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
import FormProvider from 'src/app/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';
import { TableCell, TableRow } from '@mui/material';
import { hasData } from 'src/utils/helper';
import FacilityAppointmentTableRow from './facility-appointment-table-row';

const TABLE_HEAD = [
  { id: 'Date', label: 'DATE' },
  { id: 'TYPE OF APPOINTMENT', label: 'TYPE OF APPOINTMENT' },
  { id: 'Patient profile', label: 'PATIENT PROFILE' },
  { id: 'time scheduled', label: 'TIME SCHEDULED' },
  { id: '', width: 88 },
];

export default function FacilityAppointmentTable({ tableData }: { tableData: any[] | [] }) {

  const methods = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const table = useTable();
  const settings = useSettingsContext();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  return (
    <FormProvider methods={methods}>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData?.length || 0}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                />
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell
                        sx={{ width: '100%', height: denseHeight * table.rowsPerPage }}
                        colSpan={7}
                      >
                        <LoadingScreen />
                      </TableCell>
                    </TableRow>
                  )}
                  {!isLoading && (
                    <>
                      {hasData(tableData) &&
                        tableData
                          ?.slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .map((row, index) => (
                              <FacilityAppointmentTableRow
                                key={row._id}
                                row={row}
                                onEditRow={() => handleEditRow(row._id as string)}
                              />
                            ))}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, tableData?.length)}
                      />

                      <TableNoData notFound={notFound} />
                    </>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={tableData?.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Container>
      </FormProvider>
  );
}
