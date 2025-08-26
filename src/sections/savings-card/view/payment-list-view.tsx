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
import FormProvider from 'src/app/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { FormControl, InputAdornment, MenuItem, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { merchantTypeoption, paymentData, statusTypeoption } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import AddMerchantsDialog from '../merchants-add-model';
import PaymentTableRow from '../payment-table-row';

const TABLE_HEAD = [
  { id: 'Payment ID', label: 'PAYMENT ID' },
  { id: 'Status', label: 'STATUS' },
  { id: 'Card Holder', label: 'CARD HOLDER' },
  { id: 'Facility', label: 'FACILITY' },
  { id: 'Amount', label: 'AMOUNT' },
  { id: 'Discount', label: 'DISCOUNT' },
  { id: 'Transaction Fee', label: 'TRANSACTION FEE' },
  { id: 'Payout', label: 'PAYOUT' },
  { id: 'Submitted By', label: 'SUBMITTED BY' },
  { id: 'Submission Date', label: 'SUBMISSION DATE' },
  { id: 'Approved Date', label: 'APPROVED DATE' },
  { id: 'Reviewed By', label: 'REVIEWED BY' },
  { id: '', width: 88 },
];

export default function PaymentListView() {

  const theme = useTheme();
  const create = useBoolean();
  const methods = useForm();

  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    if (!searchQuery) {
      setTableData(paymentData);
    } else {
      const filtered = paymentData.filter((member) =>
        member.reviewedBy?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTableData(filtered);
    }
  }, [searchQuery]);

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setTableData(paymentData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderFacilityFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Facility Type'
        label="Facility Type"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Facility Type</em>
        </MenuItem>
        {merchantTypeoption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );

  const renderStatusFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Status'
        label="Status"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Payment Type</em>
        </MenuItem>
        {statusTypeoption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );


  const renderPaymentFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Payment Type'
        label="Payment Type"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Payment Type</em>
        </MenuItem>
        {statusTypeoption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );

  const renderSearchInput = (
    <TextField
      fullWidth
      value={searchQuery}
      onChange={handleSearchInput}
      placeholder="Search By Merchant..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
      sx={{ mt: 2.5 }}
    />
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
              <Typography variant="h4">Payments</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main
                }}
              >
                {tableData.length || 0}
              </Button>
            </Box>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%">
                <Box sx={{ p: 2.5, pt: 0 }} width="25%">{renderSearchInput}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="25%" >{renderStatusFilter}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="25%" >{renderFacilityFilter}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="25%" >{renderPaymentFilter}</Box>
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
                            .map((row, index) => (
                                <PaymentTableRow
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
      </FormProvider>

      <AddMerchantsDialog open={create.value} onClose={create.onFalse} />

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
