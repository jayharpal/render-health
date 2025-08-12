'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// types
import { IProject } from 'src/types/projects';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { useTable } from 'src/components/table';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
//
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { clearNotification, getProjects } from 'src/redux/slices/projects';
import { hasData } from 'src/utils/helper';
import ProjectTable from '../projects-table';
import ProjectNewFolderDialog from '../projects-new-folder-dialog';

// ----------------------------------------------------------------------

export default function ProjectView() {
  const dispatch = useDispatch();
  const { isAdmin } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { projects, isLoading, notification, variant } = useSelector(
    (state: RootState) => state.projects
  );

  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const create = useBoolean();

  const [tableData, setTableData] = useState<IProject[]>([]);

  useEffect(() => {
    dispatch(getProjects());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableData(projects as unknown as IProject[] || []);
  }, [projects]);

  const dataInPage: IProject[] | [] =
    tableData && Array.isArray(tableData)
      ? tableData.slice(
          table.page * table.rowsPerPage,
          table.page * table.rowsPerPage + table.rowsPerPage
        )
      : [];

  const notFound = !hasData(tableData);

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
          <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{overflow: 'hidden'}}>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                mb: { xs: 3, md: 5 },
              }}
              justifyContent="space-between"
            >
              <Typography variant="h4">Project List</Typography>
              {isAdmin && (
                <Button
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={create.onTrue}
                >
                  New Project
                </Button>
              )}
            </Stack>

            {notFound ? (
              <EmptyContent
                filled
                title="No Projects"
                sx={{
                  py: 10,
                }}
              />
            ) : (
              <ProjectTable
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
