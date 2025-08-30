'use client';

import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
// components
import { useSettingsContext } from 'src/components/settings';
// types
//
import { Box, Stack } from '@mui/system';
import { Button, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';

import FormProvider from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { hasData } from 'src/utils/helper';
import { useEffect, useState } from 'react';
import { useTable } from 'src/components/table';
import { dummyMedicines } from 'src/utils/dummyMembers';
import Iconify from 'src/app/components/iconify';
import { emptyRows, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom } from 'src/app/components/table';
import Scrollbar from 'src/app/components/scrollbar';
import { LoadingScreen } from 'src/app/components/loading-screen';
import PharmacyTableRow from './pharmacy-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Name', label: 'Name' },
  { id: '', width: 88 },
];

export default function PharmacyView() {

  const settings = useSettingsContext();
  const methods = useForm();

  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setTableData(dummyMedicines);
    } else {
      const filtered = dummyMedicines.filter((member) =>
        member.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTableData(filtered);
    }
  }, [searchQuery]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const table = useTable();

  const handleEditRow = (id: string) => {
    // router.push(paths.dashboard.inquiry.edit(id));
    console.log("")
  };

  useEffect(() => {
    setTableData(dummyMedicines || []);
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
    <FormProvider methods={methods} >
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mb: { xs: 3, md: 5 },
          }}
          justifyContent="space-between"
        >
          <Typography variant="h4">Pharmacy</Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          width="100%"
          sx={{
            mb: 3,
          }}
          justifyContent="space-between"
        >
          <Box sx={{ p: 2.5, pt: 0 }} width='100%'>{renderSearchInput}</Box>
          <Button>Clear</Button>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                            <PharmacyTableRow
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

    </FormProvider >
  );
}
