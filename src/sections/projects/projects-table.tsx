import { useCallback, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { tableCellClasses } from '@mui/material/TableCell';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import EmptyContent from 'src/components/empty-content';
// types
import { IProject } from 'src/types/projects';
// components
import Iconify from 'src/components/iconify';
import {
  TableProps,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
//
import { useAuthContext } from 'src/auth/hooks';
import Scrollbar from 'src/components/scrollbar/scrollbar';
import ProjectTableRow from './projects-table-row';

// ----------------------------------------------------------------------

type Props = {
  table: TableProps;
  notFound: boolean;
  tableData: IProject[];
  onOpenConfirm: VoidFunction;
  onDeleteRow: (id: string) => void;
};

export default function ProjectTable({
  table,
  notFound,
  onDeleteRow,
  tableData = [],
  onOpenConfirm,
}: Props) {
  const theme = useTheme();
  const { isAdmin } = useAuthContext();

  const [editRowData, setEditRowData] = useState<IProject | null>(null);
  const [archivedPage, setArchivedPage] = useState(0);
  const [unarchivedPage, setUnarchivedPage] = useState(0);
  const [archivedRowsPerPage, setArchivedRowsPerPage] = useState(10);
  const [unarchivedRowsPerPage, setUnarchivedRowsPerPage] = useState(10);
  const [archivedDense, setArchivedDense] = useState(false);
  const [unarchivedDense, setUnarchivedDense] = useState(false);

  let TABLE_HEAD;
  if (isAdmin) {
    TABLE_HEAD = [
      { id: 'name', label: 'Name' },
      { id: 'modifiedAt', label: 'Modified', width: 140 },
      { id: '', width: 88 },
    ];
  } else {
    TABLE_HEAD = [
      { id: 'name', label: 'Name' },
      { id: 'modifiedAt', label: 'Modified', width: 240 },
      // { id: '', width: 88 },
    ];
  }

  const {
    order,
    orderBy,
    //
    selected,
  } = table;

  const handleEditRow = useCallback((row: any) => {
    setEditRowData(row);
  }, []);

  const archivedProjects =
    tableData && Array.isArray(tableData) && tableData.length > 0
      ? tableData.filter((project) => project.is_archived)
      : [];

  const unarchivedProjects =
    tableData && Array.isArray(tableData) && tableData.length > 0
      ? tableData.filter((project) => !project.is_archived)
      : [];

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          m: theme.spacing(-2, -3, -3, -3),
        }}
      >
        <TableSelectedAction
          dense={unarchivedDense}
          rowCount={
            tableData && Array.isArray(tableData) && tableData.length > 0 ? tableData.length : 0
          }
          action={
            <Tooltip title="Delete">
              <IconButton color="primary" onClick={onOpenConfirm}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer
          sx={{
            p: theme.spacing(0, 3, 3, 3),
          }}
        >
          {unarchivedProjects &&
          Array.isArray(unarchivedProjects) &&
          unarchivedProjects.length > 0 ? (
            <Scrollbar>
              <Table
                size={unarchivedDense ? 'small' : 'medium'}
                sx={{
                  mWidth: 960,
                  borderCollapse: 'separate',
                  borderSpacing: '0 16px',
                }}
              >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={unarchivedProjects.length}
                  numSelected={selected.length}
                  // onSort={onSort}
                  sx={{
                    [`& .${tableCellClasses.head}`]: {
                      '&:first-of-type': {
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                      },
                      '&:last-of-type': {
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      },
                    },
                  }}
                />

                <TableBody>
                  {unarchivedProjects &&
                    Array.isArray(unarchivedProjects) &&
                    unarchivedProjects.length > 0 &&
                    unarchivedProjects
                      .slice(
                        unarchivedPage * unarchivedRowsPerPage,
                        unarchivedPage * unarchivedRowsPerPage + unarchivedRowsPerPage
                      )
                      .map((row) => (
                        <ProjectTableRow
                          key={row._id as string}
                          isAdmin={isAdmin}
                          row={row}
                          editRowData={editRowData}
                          onDeleteRow={() => onDeleteRow(row._id as string)}
                          onEditRow={() => handleEditRow(row)}
                        />
                      ))}
                </TableBody>
              </Table>
            </Scrollbar>
          ) : (
            <EmptyContent
              filled
              title="No Projects"
              sx={{
                py: 10,
              }}
            />
          )}
          <TablePaginationCustom
            count={unarchivedProjects.length}
            page={unarchivedPage}
            rowsPerPage={unarchivedRowsPerPage}
            onPageChange={(event, newPage) => setUnarchivedPage(newPage)}
            onRowsPerPageChange={(event) =>
              setUnarchivedRowsPerPage(parseInt(event.target.value, 10))
            }
            //
            dense={unarchivedDense}
            onChangeDense={() => setUnarchivedDense(!unarchivedDense)}
            sx={{
              [`& .${tablePaginationClasses.toolbar}`]: {
                borderTopColor: 'transparent',
              },
            }}
          />
          {archivedProjects && Array.isArray(archivedProjects) && archivedProjects.length > 0 && (
            <>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Archived Projects
              </Typography>
              <Table
                size={archivedDense ? 'small' : 'medium'}
                sx={{
                  minWidth: 960,
                  borderCollapse: 'separate',
                  borderSpacing: '0 16px',
                }}
              >
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={archivedProjects.length}
                  numSelected={selected.length}
                  // onSort={onSort}
                  sx={{
                    [`& .${tableCellClasses.head}`]: {
                      '&:first-of-type': {
                        borderTopLeftRadius: 12,
                        borderBottomLeftRadius: 12,
                      },
                      '&:last-of-type': {
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      },
                    },
                  }}
                />

                <TableBody>
                  {archivedProjects &&
                    Array.isArray(archivedProjects) &&
                    archivedProjects.length > 0 &&
                    archivedProjects
                      .slice(
                        archivedPage * archivedRowsPerPage,
                        archivedPage * archivedRowsPerPage + archivedRowsPerPage
                      )
                      .map((row) => (
                        <ProjectTableRow
                          key={row._id as string}
                          isAdmin={isAdmin}
                          row={row}
                          editRowData={editRowData}
                          onDeleteRow={() => onDeleteRow(row._id as string)}
                          onEditRow={() => handleEditRow(row)}
                        />
                      ))}
                </TableBody>
              </Table>
            </>
          )}

          {(!archivedProjects ||
            !Array.isArray(archivedProjects) ||
            archivedProjects.length === 0) &&
            (!unarchivedProjects ||
              !Array.isArray(unarchivedProjects) ||
              unarchivedProjects.length === 0) && (
              <EmptyContent
                filled
                title="No Projects"
                sx={{
                  py: 10,
                }}
              />
            )}
        </TableContainer>
      </Box>

      {archivedProjects && Array.isArray(archivedProjects) && archivedProjects.length > 0 && (
        <TablePaginationCustom
          count={archivedProjects.length}
          page={archivedPage}
          rowsPerPage={archivedRowsPerPage}
          onPageChange={(event, newPage) => setArchivedPage(newPage)}
          onRowsPerPageChange={(event) => setArchivedRowsPerPage(parseInt(event.target.value, 10))}
          //
          dense={archivedDense}
          onChangeDense={() => setArchivedDense(!archivedDense)}
          sx={{
            [`& .${tablePaginationClasses.toolbar}`]: {
              borderTopColor: 'transparent',
            },
          }}
        />
      )}
    </>
  );
}
