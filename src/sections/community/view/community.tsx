'use client';

import { useState, useCallback, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import { useTable } from 'src/components/table';
import { useSnackbar } from 'src/components/snackbar';
import { LoadingScreen } from 'src/components/loading-screen';
import { RootState, useDispatch, useSelector } from 'src/redux/store';
import { ICommunityQuestion } from 'src/types/community';
import { clearNotification, getCommunityQuestion } from 'src/redux/slices/community_question';
import CommunityNewEditDialog from '../community-new-edit-dialog';
import CommunityTable from '../community-table';

// ----------------------------------------------------------------------

export default function QuestionCreate() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { community_question, isLoading, notification, variant } = useSelector(
    (state: RootState) => state.community_question
  );

  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const create = useBoolean();

  const [tableData, setTableData] = useState<ICommunityQuestion[]>([]);

  useEffect(() => {
    dispatch(getCommunityQuestion());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTableData(community_question as unknown as ICommunityQuestion[]);
  }, [community_question]);

  const dataInPage: ICommunityQuestion[] | undefined =
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
              justifyContent="space-between"
            >
              <Typography variant="h4">Community</Typography>
              <Button
                variant="contained"
                startIcon={<Iconify icon="solar:pen-bold" />}
                onClick={create.onTrue}
              >
                Ask Question
              </Button>
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
              <CommunityTable
                table={table}
                tableData={tableData}
                onDeleteRow={handleDeleteItem}
                notFound={notFound}
                onOpenConfirm={confirm.onTrue}
              />
            )}
          </Container>

          <CommunityNewEditDialog open={create.value} onClose={create.onFalse} />

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
