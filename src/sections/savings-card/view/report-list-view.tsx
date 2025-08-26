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
import { FormControl, IconButton, InputAdornment, MenuItem, TableCell, TableRow, TextField, Tooltip, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { reportDatas } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import RHFDateRangePicker from 'src/app/components/hook-form/rhf-date-range';
import { TableSelectedAction } from 'src/app/components/table';
import ReportTableRow from '../report-table-row';

const TABLE_HEAD = [
  { id: 'RH ID', label: 'RH ID' },
  { id: 'Transaction Type', label: 'TRANSACTION TYPE' },
  { id: 'NAME', label: 'NAME' },
  { id: 'Card Number', label: 'CARD NUMBER' },
  { id: 'Merchant Name', label: 'MERCHANT NAME' },
  { id: 'STATUS', label: 'STATUS' },
  { id: 'SETTLED STATUS', label: 'SETTLED STATUS' },
  { id: 'AMOUNT', label: 'AMOUNT' },
  { id: 'CREATED AT', label: 'CREATED AT' },
  { id: '', width: 88 },
];

export default function ReportListView() {

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
      setTableData(reportDatas);
    } else {
      const filtered = reportDatas.filter((member) =>
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
    setTableData(reportDatas || []);
  }, []);


  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderFacilityFilter = (
    <FormControl fullWidth>
      <TextField
        name='Transaction Status'
        label="Transaction Status"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Transaction Status</em>
        </MenuItem>
        {reportDatas.map((status) => (
          <MenuItem key={status.status} value={status.status}>
            {status.status}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );

  const renderStatusFilter = (
    <FormControl fullWidth>
      <TextField
        name='Merchant Name'
        label="Merchant Name"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Merchant Name</em>
        </MenuItem>
        {reportDatas.map((status) => (
          <MenuItem key={status.merchantName} value={status.merchantName}>
            {status.merchantName}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );


  const renderPaymentFilter = (
    <FormControl fullWidth >
      <TextField
        name='Settled Status'
        label="Settled Status"
        onChange={handleStatusChange}
        select
      >
        <MenuItem value="">
          <em>Select By Settled Status</em>
        </MenuItem>
        {reportDatas.map((status) => (
          <MenuItem key={status.settledStatus} value={status.settledStatus}>
            {status.settledStatus}
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
      placeholder="Search by Name..."
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
          </InputAdornment>
        ),
      }}
    />
  );

  const renderDateRange = (
    <RHFDateRangePicker name="DateRange" title="Select Date Range" />
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
              <Typography variant="h4">Report</Typography>
            </Box>
            <Box display='flex' flexDirection="row" gap={1}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
                onClick={create.onTrue}
              >
                Get Report
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark
                  }
                }}
                onClick={create.onTrue}
              >
                Mark Settlement
              </Button>
            </Box>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%" my={2.5}>
                <Box sx={{ p: 1.5, pt: 0 }} width="20%" >{renderSearchInput}</Box>
                <Box sx={{ p: 1.5, pt: 0 }} width="20%" >{renderStatusFilter}</Box>
                <Box sx={{ p: 1.5, pt: 0 }} width="20%" >{renderFacilityFilter}</Box>
                <Box sx={{ p: 1.5, pt: 0 }} width="20%" >{renderPaymentFilter}</Box>
                <Box sx={{ p: 1.5, pt: 0 }} width="20%" >{renderDateRange}</Box>
              </Stack>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={tableData?.length}
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                }
              />
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
                            .map((row) => (
                                <ReportTableRow
                                  key={row._id}
                                  row={row}
                                  selected={table.selected.includes(row._id as string)}
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

      {/* <AddMerchantsDialog open={create.value} onClose={create.onFalse} /> */}

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
