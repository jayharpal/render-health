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
import FormProvider from 'src/app/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { FormControl, InputAdornment, MenuItem, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { withdrawalRequestsData, statusTypeoption } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import WithdrawalRequestsTableRow from '../withdrawal-requests-table-row';

const TABLE_HEAD = [
  { id: 'RH ID', label: 'RH ID' },
  { id: 'Request Id', label: 'REQUEST ID' },
  { id: 'NAME', label: 'NAME' },
  { id: 'Card Number', label: 'CARD NUMBER' },
  { id: 'Amount', label: 'AMOUNT' },
  { id: 'Penalty', label: 'PENALTY' },
  { id: 'Credit Account', label: 'CREDIT A/C' },
  { id: 'Created Date', label: 'CREATED DATE' },
  { id: '', width: 88 },
];

export default function WithdrawalRequestsListView() {
  
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
      setTableData(withdrawalRequestsData);
    } else {
      const filtered = withdrawalRequestsData.filter((member) =>
        member.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
    setTableData(withdrawalRequestsData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderPaymentFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Status'
        label="Status"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Status</em>
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
      placeholder="Search...."
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
              <Typography variant="h4">Withdrawal Requests</Typography>
            </Box>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%">
                <Box sx={{ p: 2.5, pt: 0 }} width="40%">{renderSearchInput}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="25%">{renderPaymentFilter}</Box>
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
                                <WithdrawalRequestsTableRow
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
