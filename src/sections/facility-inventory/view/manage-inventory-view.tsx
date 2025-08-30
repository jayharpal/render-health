'use client';

import { useState, useEffect, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { useBoolean } from 'src/hooks/use-boolean';
// components
import { useSettingsContext } from 'src/components/settings';
import { RHFSelect, RHFUploadAvatarBox } from 'src/components/hook-form';
import FormProvider from 'src/app/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import {
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  useTable,
} from 'src/components/table';
import Scrollbar from 'src/components/scrollbar';
// types
import { LoadingScreen } from 'src/components/loading-screen';
import { Box, Stack } from '@mui/system';
import { InputLabel, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { ManageInventoryData, SelectPricePlanOption, SelectPriceTypeOption } from 'src/utils/dummyMembers';
import ManageInventoryTableRow from '../manage-inventory-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Group', label: 'GROUP' },
  { id: 'Price Type', label: 'PRICE TYPE' },
  { id: 'Uploaded Date', label: 'UPLOADED DATE' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function ManageInventoryListView() {

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const methods = useForm();

  const {
    setValue,
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    console.log("-")
    // router.push(paths.dashboard.inquiry.edit(id));
  };

  useEffect(() => {
    setTableData(ManageInventoryData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

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
            <Typography variant="h4">Manage Inventory</Typography>
          </Stack>

          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
              mb={3}
            >
              <InputLabel sx={{ mb: 1, fontSize: '1rem', fontWeight: 'bold' }}>Upload Inventory List</InputLabel>
              <RHFUploadAvatarBox
                name='inventoryList'
                maxSize={3145728}
                onDrop={(acceptedFiles) => handleDrop(acceptedFiles)}
              />
            </Box>

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
              }}
              mb={3}
            >
              <RHFSelect
                name="Price Type"
                label="Price Type"
              >
                {SelectPriceTypeOption.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>

              <RHFSelect
                name="Price Type"
                label="Price Type"
              >
                {SelectPricePlanOption.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </RHFSelect>
            </Box>
            <Stack direction='row' gap={1} alignItems="center" justifyContent="center" marginY={3} >
              <LoadingButton
                type="submit"
                variant="contained"
                size="medium"
              // loading={isLoading}
              >
                Upload
              </LoadingButton>
            </Stack>
          </Card>


          <Stack
            direction="row"
            alignItems="center"
            sx={{
              mb: 2,
              mt: 5
            }}
            justifyContent="space-between"
          >
            <Typography variant="h4">Inventory</Typography>
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
                            .map((row) => (
                              <ManageInventoryTableRow
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
  );
}
