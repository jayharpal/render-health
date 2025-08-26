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
import { FormControl, InputAdornment, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { facilityData } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import FacilitiesTableRow from '../facilities-table-row';
import AddFacilitiesDialog from '../facilities-add-model';

const TABLE_HEAD = [
  { id: 'Facility Name', label: 'FACILITY NAME' },
  { id: 'Facility Id', label: 'FACILITY ID' },
  { id: 'Address', label: 'ADDRESS' },
  { id: 'State', label: 'STATE' },
  { id: 'HMO Name', label: 'HMO NAME' },
  { id: 'Status', label: 'STATUS' },
  { id: '', width: 88 },
];

export default function FacilitiesListView() {

  const theme = useTheme();
  const create = useBoolean();
  const methods = useForm();

  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("Primary");
  const [isLoading, setIsLoading] = useState(false);


  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    let filtered = facilityData;

    if (statusFilter !== "Primary") {
      filtered = filtered.filter(
        (member) => member.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setTableData(filtered);
  }, [statusFilter]);

  useEffect(() => {
    if (!searchQuery) {
      setTableData(facilityData);
    } else {
      const filtered = facilityData.filter((member) =>
        member?.facilityName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTableData(filtered);
    }
  }, [searchQuery]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  useEffect(() => {
    setTableData(facilityData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderStatusFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <Select value={statusFilter} onChange={handleStatusChange}>
        <MenuItem value="Primary">Primary</MenuItem>
        <MenuItem value="Secondary">Secondary</MenuItem>
        <MenuItem value="Tertiary">Tertiary</MenuItem>
      </Select>
    </FormControl>
  );

  const renderSearchInput = (
    <TextField
      fullWidth
      value={searchQuery}
      onChange={handleSearchInput}
      placeholder="Search Name..."
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
              <Typography variant="h4">Manage Facility</Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: theme.palette.primary.main
                }}
              >
                {tableData.length || 0}
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main
              }}
              onClick={create.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add Facility
            </Button>
          </Stack>

          <Card>
            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%">
                <Box sx={{ p: 2.5, pt: 0 }} width="80%">{renderSearchInput}</Box>
                <Box sx={{ p: 2.5, pt: 0 }} width="20%">{renderStatusFilter}</Box>
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
                                <FacilitiesTableRow
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

      <AddFacilitiesDialog open={create.value} onClose={create.onFalse} />

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
