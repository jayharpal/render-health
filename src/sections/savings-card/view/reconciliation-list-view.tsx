'use client';

import { useState, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
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
import FormProvider, { RHFDateField } from 'src/app/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { reconciliation } from 'src/utils/dummyMembers';
import AddMemberDialog from '../members-add-model';
import ReconciliationTableRow from '../reconciliation-table-row copy';

const TABLE_HEAD = [
  { id: 'Date', label: 'DATE' },
  { id: 'Cardholder', label: 'CARDHOLDER' },
  { id: 'RHSC Number', label: 'RHSC NUMBER' },
  { id: 'Transaction ID', label: 'TRANSACTION ID' },
  { id: 'Amount', label: 'AMOUNT' },
  { id: 'Processed By', label: 'PROCESSED BY' },
  { id: 'Status', label: 'STATUS' },
  { id: '', width: 88 },
];

export default function ReconciliationListView() {

  const theme = useTheme();
  const create = useBoolean();
  const methods = useForm();

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  useEffect(() => {
    setTableData(reconciliation || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderStatusFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Search By'
        label="Search By"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select One</em>
        </MenuItem>
        <MenuItem value="RH Staff">RH Staff</MenuItem>
        <MenuItem value="Date and Time">Date and Time</MenuItem>
        <MenuItem value="Reconciliation">Reconciliation</MenuItem>
      </TextField>
    </FormControl>
  );

  const renderSearchByReconciliation = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Search By Reconciliation'
        label="Search By Reconciliation"
        select
        fullWidth
      >
        <MenuItem value="">
          <em>Select One</em>
        </MenuItem>
        <MenuItem value="Yes">Yes</MenuItem>
        <MenuItem value="No">No</MenuItem>
        <MenuItem value="All">All</MenuItem>
      </TextField>
    </FormControl>
  );

  const renderSearchByDateAndTime = (
    <FormControl sx={{ mt: 2.5, display: 'flex', flexDirection: 'row', gap: 2 }}>
      <RHFDateField name="startDate" label="Start Date" />
      <RHFDateField name="endDate" label="End Date" />
    </FormControl>
  );

  const renderSearchByStaff = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Search By staff'
        label="Search By staff"
        select
      >
        <MenuItem value="">
          <em>Select One</em>
        </MenuItem>
        {reconciliation.map((status) => (
          <MenuItem key={status.cardholder} value={status.cardholder}>
            {status.cardholder}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );

  return (
    <>
      <FormProvider methods={methods}>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
            justifyContent="space-between"
          >
            <Box display='flex' flexDirection="row" gap={1}>
              <Typography variant="h4">Reconciliation</Typography>
            </Box>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%">
                <Box sx={{ p: 2.5, pt: 0 }} width="20%" >{renderStatusFilter}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="50%">
                  {statusFilter === "RH Staff" && renderSearchByStaff}

                  {statusFilter === "Date and Time" && renderSearchByDateAndTime}

                  {statusFilter === "Reconciliation" && renderSearchByReconciliation}
                </Box>
              </Stack>
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
                            .map((row, index) => {
                              const sr_no = table.page * table.rowsPerPage + index + 1;
                              console.log(`sr no : ${sr_no}`);

                              return (
                                <ReconciliationTableRow
                                  key={row._id}
                                  row={row}
                                  sr_no={sr_no}
                                  onEditRow={() => handleEditRow(row._id as string)}
                                />
                              );
                            })}

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
          </Card>
        </Container>
      </FormProvider>

      <AddMemberDialog open={create.value} onClose={create.onFalse} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
