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
import { useRouter } from 'src/routes/hook';
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
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { LoadingScreen } from 'src/components/loading-screen';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box, Stack } from '@mui/system';
import Iconify from 'src/components/iconify';
import { InputAdornment, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { useTheme } from '@mui/material/styles';
import { membersData } from 'src/utils/dummyMembers';
import RenderEmployeesTableRow from '../render-employees-table-row';
import AddRenderEmployeeDialog from '../add-render-employee-model';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'member_data', label: 'MEMBER DATA' },
  { id: 'employee_id', label: 'EMPLOYEE ID' },
  { id: 'role', label: 'ROLE' },
  { id: 'phoneNumber', label: 'PHONE NUMBER' },
  { id: 'status', label: 'STATUS', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function RenderEmployeesListView() {
  const router = useRouter();
  const theme = useTheme();
  const create = useBoolean();

  const dispatch = useDispatch();
  const { inquirys, isLoading } = useSelector((state: RootState) => state.inquiry);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 150);
  const [tableData, setTableData] = useState<any[] | []>([]);

  // useEffect(() => {
  //   dispatch(getInquiry(debouncedSearchQuery));
  // }, [debouncedSearchQuery, dispatch]);

  useEffect(() => {
    if (!searchQuery) {
      setTableData(membersData);
    } else {
      const filtered = membersData.filter((member) =>
        member.name?.toLowerCase().includes(searchQuery.toLowerCase())
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
    setTableData(membersData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

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
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Manage Render Employee</Typography>
          <Box display='flex' gap={2}>
            <Button
              variant="contained"
              sx={{
                bgcolor: theme.palette.primary.main
              }}
              onClick={create.onTrue}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add Render Employee
            </Button>
          </Box>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Box sx={{ p: 2.5, pt: 0 }}>{renderSearchInput}</Box>
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
                              <RenderEmployeesTableRow
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

      <AddRenderEmployeeDialog open={create.value} onClose={create.onFalse} />

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
