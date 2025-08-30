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
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
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
import { FormControl, MenuItem, TableCell, TableRow, TextField, Typography } from '@mui/material';
import { hasData } from 'src/utils/helper';
import { InventoryData, SelectPricePlanOption, SelectPriceTypeOption } from 'src/utils/dummyMembers';
import FacilityInventoryTableRow from '../facility-inventory-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Name', label: 'NAME' },
  { id: 'Dosage Form', label: 'DOSAGE FORM' },
  { id: 'Strengths', label: 'STRENGTHS' },
  { id: 'Count', label: 'COUNT', },
  { id: 'description', label: 'DESCRIPTION' },
  { id: 'Qty', label: 'QTY' },
  { id: 'Low Stock Alert', label: 'LOW STOCK ALERT' },
  { id: 'Price', label: 'PRICE' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export default function FacilityInventoryListView() {

  const [tableData, setTableData] = useState<any[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [priceTypeFilter, setPriceTypeFilter] = useState<string>("");
  const [pricePlanFilter, setPricePlanFilter] = useState<string>("");

  const table = useTable();
  const settings = useSettingsContext();
  const confirm = useBoolean();

  const handleEditRow = (id: string) => {
    console.log("-")
    // router.push(paths.dashboard.inquiry.edit(id));
  };

  useEffect(() => {
    let filteredData = InventoryData;

    if (priceTypeFilter) {
      filteredData = filteredData.filter(
        (item) => item.priceType === priceTypeFilter
      );
    }
    if (pricePlanFilter) {
      filteredData = filteredData.filter(
        (item) => item.pricePlan === pricePlanFilter
      );
    }
    setTableData(filteredData);
  }, [priceTypeFilter, pricePlanFilter]);

  useEffect(() => {
    setTableData(InventoryData || []);
  }, []);

  const denseHeight = table.dense ? 52 : 72;
  const notFound = !hasData(tableData);

  const renderPriceTypeFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Price Type'
        label="Price Type"
        onChange={(e) => setPriceTypeFilter(e.target.value)}
        select
      >
        <MenuItem value="">
          <em>Select Price Type</em>
        </MenuItem>
        {SelectPriceTypeOption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  );

  const renderPricePlanFilter = (
    <FormControl fullWidth sx={{ mt: 2.5 }}>
      <TextField
        name='Select Price Plan'
        label="Select Price Plan"
        onChange={(e) => setPricePlanFilter(e.target.value)}
        select
      >
        <MenuItem value="">
          <em>Select Price Plan</em>
        </MenuItem>
        {SelectPricePlanOption.map((status) => (
          <MenuItem key={status.value} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </TextField>
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
          <Typography variant="h4">View Inventory</Typography>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Stack display='flex' flexDirection='row' flexWrap='wrap' width="100%">
              <Box width='30%' sx={{ p: 2.5, pt: 0 }}>{renderPriceTypeFilter}</Box>
              <Box width='30%' sx={{ p: 2.5, pt: 0 }}>{renderPricePlanFilter}</Box>
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
                            <FacilityInventoryTableRow
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
