'use client';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
// types
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
import { clearNotification } from 'src/redux/slices/projects';
import { hasData } from 'src/utils/helper';
import { IChapter } from 'src/types/chapter';
import { ITopic } from 'src/types/topic';
import { paths } from 'src/routes/paths';
import { getTopicByChapter } from 'src/redux/slices/topic';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import TopicNewFolderDialog from '../topic-new-folder-dialog';
import TopicList from '../topic-list';

// ----------------------------------------------------------------------
type SubjectProps = {
  courseId?: string;
  subjectId?: string;
  chapterId?: string;
};

export default function TopicView({ courseId, subjectId, chapterId }: SubjectProps) {
  const dispatch = useDispatch();
  const { isAdmin } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const { topic, isLoading, notification, variant } = useSelector(
    (state: RootState) => state.topic
  );
  const table = useTable({ defaultRowsPerPage: 10 });

  const settings = useSettingsContext();

  const confirm = useBoolean();

  const create = useBoolean();

  const [tableData, setTableData] = useState<ITopic[]>([]);

  useEffect(() => {
    if (chapterId) {
      dispatch(getTopicByChapter(chapterId as string));
    }
  }, [chapterId, dispatch]);

  useEffect(() => {
    setTableData((topic as unknown as ITopic[]) || []);
  }, [topic]);

  const dataInPage: IChapter[] | [] =
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
          <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ overflow: 'hidden' }}>
            <CustomBreadcrumbs
              heading="Topic List"
              links={[
                {
                  name: 'Dashboard',
                  href: paths.dashboard.root,
                },
                {
                  name: 'Courses',
                  href: paths.dashboard.courses.root,
                },
                {
                  name: 'Subjects',
                  href: paths.dashboard.courses.id(courseId as string),
                },
                {
                  name: 'Chapters',
                  href: paths.dashboard.courses.subjectId(courseId as string, subjectId as string),
                },
                {
                  name: 'Topics',
                  href: paths.dashboard.courses.chapterId(
                    courseId as string,
                    subjectId as string,
                    chapterId as string
                  ),
                },
              ]}
              action={
                isAdmin && (
                  <Button
                    variant="contained"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={create.onTrue}
                  >
                    New Topic
                  </Button>
                )
              }
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
            {notFound ? (
              <EmptyContent
                filled
                title="No Chapters"
                sx={{
                  py: 10,
                }}
              />
            ) : (
              <TopicList
                subjectId={subjectId}
                courseId={courseId}
                chapterId={chapterId}
                topic={tableData}
                onDeleteRow={handleDeleteItem}
                // notFound={notFound}
                // onOpenConfirm={confirm.onTrue}
              />
            )}
          </Container>

          <TopicNewFolderDialog
            open={create.value}
            onClose={create.onFalse}
            courseId={courseId}
            subjectId={subjectId}
            chapterId={chapterId}
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
