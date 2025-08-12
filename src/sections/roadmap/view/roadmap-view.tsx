'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// types
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { useTable } from 'src/components/table';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
//
import { IRoadmap } from 'src/types/roadmap';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { getRoadmaps, clearNotification } from 'src/redux/slices/roadmap';
import RoadMapTable from '../roadmap-table';
import ProjectNewFolderDialog from '../roadmap-new-folder-dialog';

// ----------------------------------------------------------------------

export default function RoadMapView() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { roadmaps, isLoading, notification, variant } = useSelector(
    (state: RootState) => state.roadmap
  );

  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const create = useBoolean();

  const [tableData, setTableData] = useState<IRoadmap[]>([]);

  useEffect(() => {
    dispatch(getRoadmaps());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableData(roadmaps as unknown as IRoadmap[]);
  }, [roadmaps]);

  const dataInPage: IRoadmap[] | undefined =
    tableData && Array.isArray(tableData)
      ? tableData.slice(
          table.page * table.rowsPerPage,
          table.page * table.rowsPerPage + table.rowsPerPage
        )
      : undefined;

  const notFound = tableData.length === 0 || !tableData.length;

  const handleDeleteItem = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row: any) => row?.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage?.length as number);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dataInPage?.length, table, tableData]
  );

  const handleDeleteItems = useCallback(() => {
    const deleteRows = tableData.filter((row: any) => !table.selected.includes(row?.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage?.length as number,
      totalRowsFiltered: tableData.length,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData.length, dataInPage?.length, table, tableData]);

  useEffect(() => {
    if (notification) {
      enqueueSnackbar(notification, { variant });
      dispatch(clearNotification());
    }
  }, [notification, dispatch, enqueueSnackbar, variant]);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                mb: { xs: 3, md: 5 },
              }}
              justifyContent="start"
            >
              <Typography variant="h4">RoadMap List</Typography>
            </Stack>

            {notFound ? (
              <EmptyContent
                filled
                title="No Data"
                sx={{
                  py: 10,
                }}
              />
            ) : (
              <RoadMapTable
                table={table}
                tableData={tableData}
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
              />
            )}
          </Container>

          <ProjectNewFolderDialog open={create.value} onClose={create.onFalse} />

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
                  handleDeleteItems();
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
