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
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { FormControl, MenuItem, Select, TableCell, TableRow, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { patientData, filterOption, healthTypeFilterOption } from 'src/utils/dummyMembers';
import FormProvider, { RHFDateField } from 'src/app/components/hook-form';
import { useForm } from 'react-hook-form';
import HealthRecordTableRow from '../health-record-table-row';

const TABLE_HEAD = [
  { id: 'Date', label: 'DATE' },
  { id: 'Patient', label: 'PATIENT' },
  { id: 'Hospital', label: 'HOSPITAL' },
  { id: 'Doctor Name', label: 'DOCTOR NAME' },
  { id: 'MEDICAL RECORD NUMBER', label: 'MEDICAL RECORD NUMBER' },
  { id: '', width: 88 },
];

export default function HealthRecordListView() {

  const theme = useTheme();
  const methods = useForm();

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [healthTypeFilter, setHealthTypeFilter] = useState("Initil Record");
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  const handlehealthTypeChange = (event: any) => {
    setHealthTypeFilter(event.target.value);
  };

  useEffect(() => {
    let filtered = patientData;

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (member) => member.deal_status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setTableData(filtered);
  }, [statusFilter]);

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  useEffect(() => {
    setTableData(patientData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderFilterByStatus = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <Select value={statusFilter} onChange={handleStatusChange}>
        {filterOption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderFilterHealthType = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <Select value={healthTypeFilter} onChange={handlehealthTypeChange}>
        {healthTypeFilterOption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <FormProvider methods={methods}>
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
          <Stack
            display="flex"
            direction="row"
            alignItems="center"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
            justifyContent="space-between"
          >
            <Box display='flex' flexDirection="row" gap={1}>
              <Typography variant="h4">Health Record List</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main
                }}
              >
                {tableData.length || 0}
              </Button>
            </Box>
            <Box display='flex'>
              <Box width="100%" sx={{ p: 2.5, pt: 0 }}>{renderFilterByStatus}</Box>
              <Box width="100%" sx={{ p: 2.5, pt: 0 }}>{renderFilterHealthType}</Box>
            </Box>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack
                display="flex"
                flexDirection='row'
                flexWrap="wrap"
                gap={2}
                mb={3}
                width="100%"
                padding={2.5}
              >
                <Box>
                  <RHFDateField name="startDate" label="Start Date" />
                </Box>
                <Box>
                  <RHFDateField name="endDate" label="End Date" />
                </Box>
                <Button
                  variant="contained"
                >
                  Search
                </Button>
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
                                <HealthRecordTableRow
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
