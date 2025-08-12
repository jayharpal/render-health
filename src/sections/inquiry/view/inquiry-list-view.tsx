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
import { getInquiry } from 'src/redux/slices/inquiry';
import { LoadingScreen } from 'src/components/loading-screen';
import { useDebounce } from 'src/hooks/use-debounce';
import { Box } from '@mui/system';
import Iconify from 'src/components/iconify';
import { InputAdornment, TableCell, TableRow, TextField } from '@mui/material';
import { IInquiry } from 'src/types/inquiry';
import { hasData } from 'src/utils/helper';
import InquiryTableRow from '../inquiry-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sr_no', label: 'Sr No.' },
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Phone Number', width: 160 },
  { id: 'availability', label: 'Availability', width: 180 },
  { id: 'role', label: 'Preference', width: 100 },
  { id: 'status', label: 'Status', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function InquiryListView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { inquirys, isLoading } = useSelector((state: RootState) => state.inquiry);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 150);
  const [tableData, setTableData] = useState<IInquiry[] | []>([]);

  useEffect(() => {
    dispatch(getInquiry(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    router.push(paths.dashboard.inquiry.edit(id));
  };

  useEffect(() => {
    setTableData(inquirys || []);
  }, [inquirys]);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderSearchInput = (
    <TextField
      fullWidth
      value={searchQuery}
      onChange={handleSearchInput}
      placeholder="Search inquiries..."
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
        <CustomBreadcrumbs
          heading="List"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Inquiry' }]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Box sx={{ p: 2.5, pt: 0 }}>{renderSearchInput}</Box>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={inquirys?.length || 0}
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
                      {hasData(inquirys) &&
                        inquirys
                          ?.slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .map((row, index) => {
                            const sr_no = table.page * table.rowsPerPage + index + 1;
                            console.log(`sr no : ${sr_no}`);

                            return (
                              <InquiryTableRow
                                key={row._id}
                                row={row}
                                sr_no={sr_no}
                                onEditRow={() => handleEditRow(row._id as string)}
                              />
                            );
                          })}

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, inquirys?.length)}
                      />

                      <TableNoData notFound={notFound} />
                    </>
                  )}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={inquirys?.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Container>

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

// ----------------------------------------------------------------------
