'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
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
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getInterns } from 'src/redux/slices/interns';
import { IIntern } from 'src/types/interns';
import { LoadingScreen } from 'src/components/loading-screen';
import { hasData } from 'src/utils/helper';
import InternTableRow from '../intern-table-row';
import InternRegisterDialog from '../intern-register-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sr_no', label: 'Sr No.', width: 88 },
  { id: 'name', label: 'Name' },
  { id: 'phoneNumber', label: 'Phone Number' },
  // { id: 'status', label: 'Status' },
  // { id: 'action', label: "Action", width: 88 },
];

// ----------------------------------------------------------------------

export default function InternListView() {
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState<IIntern[]>([]);

  const { interns, isLoading } = useSelector((state: RootState) => state.interns);

  useEffect(() => {
    dispatch(getInterns());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableData(interns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interns]);

  const table = useTable();

  const settings = useSettingsContext();

  // const router = useRouter();

  const confirm = useBoolean();
  const registerModal = useBoolean();

  const dataInPage = hasData(tableData) ? tableData.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  ) : [];

  const denseHeight = table.dense ? 52 : 72;

  const notFound = !hasData(tableData);

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData?.filter((row: any) => (row._id as string) !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData?.filter((row: any) => !table.selected.includes(row._id as string));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: tableData.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback((id: string) => {
    // router.push(paths.dashboard.intern.edit(id));
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
              heading="List"
              links={[
                { name: 'Dashboard', href: paths.dashboard.root },
                { name: 'Intern', href: paths.dashboard.intern.root },
                { name: 'List' },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
              action={
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={registerModal.onTrue}
                >
                  Register Intern
                </Button>
              }
            />

            <Card>
              <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                      rowCount={tableData?.length}
                      numSelected={table.selected.length}
                    />

                    <TableBody>
                      {
                        hasData(tableData) && tableData
                          .slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                          .map((row: any, index: number) => (
                            <InternTableRow
                              key={row._id as string}
                              row={row}
                              srNo={index}
                              selected={table.selected.includes(row._id as string)}
                              onDeleteRow={() => handleDeleteRow(row._id as string)}
                              onEditRow={() => handleEditRow(row._id as string)}
                            />
                          ))
                      }

                      <TableEmptyRows
                        height={denseHeight}
                        emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                      />

                      <TableNoData notFound={notFound} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={tableData.length}
                page={table.page}
                rowsPerPage={table.rowsPerPage}
                onPageChange={table.onChangePage}
                onRowsPerPageChange={table.onChangeRowsPerPage}
                //
                dense={table.dense}
                onChangeDense={table.onChangeDense}
              />
            </Card>
          </Container>

          <InternRegisterDialog
            open={registerModal.value}
            onClose={registerModal.onFalse}
          />

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
                  handleDeleteRows();
                  confirm.onFalse();
                }}
              >
                Delete
              </Button>
            }
          />
        </>
      )}
    </>
  );
}
