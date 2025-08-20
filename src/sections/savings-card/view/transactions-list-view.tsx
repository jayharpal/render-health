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
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useRouter } from 'src/routes/hook';
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
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { LoadingScreen } from 'src/components/loading-screen';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box, Stack } from '@mui/system';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { merchants, facilityOpstion, merchantTypeoption, transactionData, statusTypeoption } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import { LoadingButton } from '@mui/lab';
import AddMerchantsDialog from '../merchants-add-model';
import TransactionsTableRow from '../transactions-table-row';

const TABLE_HEAD = [
  { id: 'RH ID', label: 'RH ID' },
  { id: 'TRANSACTION TYPE', label: 'TRANSACTION TYPE' },
  { id: 'NAME', label: 'NAME' },
  { id: 'Card Number', label: 'CARD NUMBER' },
  { id: 'Merchant Name', label: 'MERCHANT NAME' },
  { id: 'STATUS', label: 'STATUS' },
  { id: 'SETTLED STATUS', label: 'SETTLED STATUS' },
  { id: 'AMOUNT', label: 'AMOUNT' },
  { id: 'CREATED AT', label: 'CREATED AT' },
  { id: '', width: 88 },
];

export default function TransactionsListView() {

  const router = useRouter();
  const theme = useTheme();
  const create = useBoolean();
  const methods = useForm();

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    if (!searchQuery) {
      setTableData(transactionData);
    } else {
      const filtered = transactionData.filter((member) =>
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
    setTableData(transactionData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderFacilityFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <RHFDateField name="startDate" label="Date Range" />
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
        name='Transaction Type'
        label="Transaction Type"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Transaction Type</em>
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
              <Typography variant="h4">Transactions</Typography>
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
                <Box sx={{ p: 2.5, pt: 0 }} width="25%" >{renderPaymentFilter}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="25%" >{renderFacilityFilter}</Box>
                <Stack direction='row' gap={1} alignItems="center" justifyContent="center" marginY={3} >
                  <LoadingButton
                    variant="contained"
                    size="medium"
                  // loading={isLoading}
                  >
                    Search
                  </LoadingButton>
                </Stack>
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
                                <TransactionsTableRow
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
