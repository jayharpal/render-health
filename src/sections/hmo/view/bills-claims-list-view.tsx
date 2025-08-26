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
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
// types
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { FormControl, MenuItem, Select, TableCell, TableRow, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { billsClaimsData, billsClaimsOutStandingData, billsClaimspaidData } from 'src/utils/dummyMembers';
import AddHmoDialog from '../hmo-add-model';
import BillsClaimsTableRow from '../bills-claims-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'dateReceived', label: 'DATE RECEIVED' },
  { id: 'authorizationCode', label: 'AUTHORIZATION CODE' },
  { id: 'hospitalName', label: 'HOSPITAL / LABS', width: 160 },
  { id: 'enrolleeName', label: 'ENROLLEE NAME', width: 180 },
  { id: 'requested', label: 'REQUESTED', width: 100 },
  { id: 'approved', label: 'APPROVED', width: 100 },
  { id: 'paid', label: 'PAID', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function BillsClaimsListView() {
  const theme = useTheme();
  const create = useBoolean();

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [billingType, setBillingType] = useState<'all' | 'outstanding' | 'paid'>('all');
  const [statusFilter, setStatusFilter] = useState("Newest Billing");

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(getInquiry(debouncedSearchQuery));
  // }, [debouncedSearchQuery, dispatch]);

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  useEffect(() => {
    let filteredData = billsClaimsData || [];
    if (billingType === 'outstanding') {
      filteredData = billsClaimsOutStandingData || [];
    } else if (billingType === 'paid') {
      filteredData = billsClaimspaidData || [];
    }
    setTableData(filteredData);
  }, [billingType]);

  const handleEditRow = (id: string) => {
    console.log("-")
    // router.push(paths.dashboard.inquiry.edit(id));
  };

  useEffect(() => {
    setTableData(billsClaimsData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderStatusFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <Select value={statusFilter} onChange={handleStatusChange}>
        <MenuItem value="Newest Billing">Newest Billing</MenuItem>
        <MenuItem value="Highest Amount">Highest Amount</MenuItem>
        <MenuItem value="Lowest Amount">Lowest Amount</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Bills / Claims</Typography>
          <Box display='flex' gap={2}>
            <Button
              variant="contained"
              onClick={() => setBillingType('all')}
              sx={{
                bgcolor: billingType === "all" ? theme.palette.primary.main : 'default'
              }}
            >
              All Billings
            </Button>
            <Button
              variant="contained"
              onClick={() => setBillingType('outstanding')}
              sx={{
                bgcolor: billingType === "outstanding" ? theme.palette.primary.main : 'default'
              }}
            >
              OutStanding Billings
            </Button>
            <Button
              variant="contained"
              onClick={() => setBillingType('paid')}
              sx={{
                bgcolor: billingType === "paid" ? theme.palette.primary.main : 'default'
              }}
            >
              Paid Billings
            </Button>
          </Box>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Box width='50%' sx={{ p: 2.5, pt: 0 }}>{renderStatusFilter}</Box>
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
                              <BillsClaimsTableRow
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
        </Card>
      </Container>

      <AddHmoDialog open={create.value} onClose={create.onFalse} />

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
