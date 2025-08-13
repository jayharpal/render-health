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
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';
// types
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { LoadingScreen } from 'src/components/loading-screen';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box, Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { FormControl, InputAdornment, InputLabel, MenuItem, Select, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { dealData } from 'src/utils/dummyMembers';
import DealTableRow from '../deal-table-row';
import AddDealDialog from '../add-deal-model';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'image', label: 'IMAGE' },
  { id: 'name_of_facility', label: 'NAME OF FACILITY' },
  { id: 'Deal Category', label: 'DEAL CATEGORY' },
  { id: 'Deal Start Date', label: 'DEAL START DATE' },
  { id: 'Deal End Date', label: 'DEAL END DATE' },
  { id: 'Deal Status', label: 'DEAL STATUS' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function DealListView() {
  const router = useRouter();
  const theme = useTheme();
  const create = useBoolean();

  const dispatch = useDispatch();
  const { inquirys, isLoading } = useSelector((state: RootState) => state.inquiry);
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    let filtered = dealData;

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
    setTableData(dealData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderSearchInput = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <Select value={statusFilter} onChange={handleStatusChange}>
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
        <MenuItem value="Expired">Expired</MenuItem>
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
          <Typography variant="h4">Create New Deal</Typography>
          <Box display='flex' gap={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main
              }}
              onClick={create.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add New Deal
            </Button>
          </Box>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Box width="40%" sx={{ p: 2.5, pt: 0 }}>{renderSearchInput}</Box>
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
                              <DealTableRow
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

      <AddDealDialog open={create.value} onClose={create.onFalse} />

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
