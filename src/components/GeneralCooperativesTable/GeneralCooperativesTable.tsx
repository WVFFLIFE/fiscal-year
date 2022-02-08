import { useState, useMemo, useCallback, FC } from 'react';
import usePagination, { slice } from 'hooks/usePagination';
import { ExtendedCooperativeModel, ErrorModel } from 'models';
import { DeprecatedColumn, SortModel } from 'models/TableModel';
import Services from 'services';
import { orderBy, prepareData } from 'utils/sort';
import { search } from 'utils/search';
import { DEFAULT_PAGINATION_OPTIONS } from 'utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import GeneralCooperativesTableRow from './GeneralCooperativesTableRow';
import Pagination from 'components/Pagination';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import { Scroll } from 'components/Styled';

import { useStyles } from './style';

const columns: DeprecatedColumn[] = [
  {
    align: 'left',
    field: 'Name',
    label: '#table.summary.cooperative',
    type: 'string',
    style: { width: 330 },
  },
  {
    align: 'right',
    field: 'LatestClosedDate',
    label: '#table.summary.periodclosed',
    type: 'date',
    style: { width: 131 },
  },
  {
    align: 'right',
    field: 'IsFinancialCalculationsAccepted',
    label: '#table.summary.fcaccepted',
    style: { width: 90 },
  },
  {
    align: 'right',
    field: 'IsFiscalYearClosed',
    label: '#table.summary.fyclosed',
    style: { width: 90 },
  },
  {
    align: 'right',
    field: 'BoardMeetingPlannedDate',
    label: '#table.summary.boardmeeting',
    style: { width: 115 },
    type: 'date',
  },
  {
    align: 'right',
    field: 'AuditReturnNeededDate',
    label: '#table.summary.auditing',
    style: { width: 115 },
    type: 'date',
  },
  {
    align: 'right',
    field: 'GeneralMeetingPlannedDate',
    label: '#table.summary.generalmeeting',
    style: { width: 115 },
    type: 'date',
  },
  {
    align: 'left',
    field: 'FiscalYearComments',
    label: '#table.summary.comments',
    style: { width: 230 },
    type: 'string',
  },
  {
    field: '_action',
    label: '',
    align: 'right',
    sortable: false,
    style: { width: 80 },
  },
];

interface StateModel {
  loading: boolean;
  error: ErrorModel | null;
}

interface GeneralCooperativeTableProps {
  searchTerm: string;
  cooperatives: ExtendedCooperativeModel[];
  onSelectCooperative(cooperative: ExtendedCooperativeModel): void;
  fetchExtendedCooperativesList(): Promise<void>;
}

const GeneralCooperativeTable: FC<GeneralCooperativeTableProps> = ({
  searchTerm,
  cooperatives,
  onSelectCooperative,
  fetchExtendedCooperativesList,
}) => {
  const classes = useStyles();

  const headClasses = useMemo(
    () => ({
      cell: classes.headCell,
    }),
    [classes]
  );

  const [state, setState] = useState<StateModel>({
    loading: false,
    error: null,
  });
  const {
    rowsPerPage,
    currentPage,
    handleChaneRowsPerPage,
    handleChangeCurrentPage,
  } = usePagination();
  const [sortParams, setSortParams] = useState<SortModel>({
    order: 'asc',
    orderBy: 'Name',
    type: 'alphanumeric',
  });

  const initError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const handleChangeSortParams = (orderBy: string) => {
    setSortParams((prevState) => ({
      order:
        orderBy === prevState.orderBy
          ? prevState.order === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
      orderBy,
      type: 'alphanumeric',
    }));
  };

  const saveComment = useCallback(async (fyId: string, comment: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      const res = await Services.fiscalYearCommentsUpdate({
        FiscalYearId: fyId,
        Comments: comment,
      });

      if (res.IsSuccess) {
        await fetchExtendedCooperativesList();

        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        return;
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [res.Message] },
        }));
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  }, []);

  const activeCooperatives = useMemo(() => {
    return search(
      cooperatives,
      [
        { accessor: 'Name', type: 'string' },
        { accessor: 'LatestClosedDate', type: 'date' },
        {
          accessor: (coop) => {
            if (coop.BoardMeetingActualDate) return 'BoardMeetingActualDate';
            if (coop.BoardMeetingPlannedDate) return 'BoardMeetingPlannedDate';
            return 'BoardMeetingPlannedDate';
          },
          type: 'date',
        },
        {
          accessor: (coop) => {
            if (coop.AuditDoneDate) return 'AuditDoneDate';
            if (coop.AuditReturnNeededDate) return 'AuditReturnNeededDate';
            return 'AuditReturnNeededDate';
          },
          type: 'date',
        },
        {
          accessor: (coop) => {
            if (coop.GeneralMeetingActualDate)
              return 'GeneralMeetingActualDate';
            if (coop.GeneralMeetingPlannedDate)
              return 'GeneralMeetingPlannedDate';
            return 'GeneralMeetingPlannedDate';
          },
          type: 'date',
        },
        {
          accessor: 'FiscalYearComments',
          type: 'string',
        },
      ],
      searchTerm
    );
  }, [cooperatives, searchTerm]);

  const sortedCooperatives = useMemo(() => {
    return orderBy(
      activeCooperatives,
      (coop) => {
        if (sortParams.orderBy === 'AuditReturnNeededDate') {
          let d = coop.AuditDoneDate || coop.AuditReturnNeededDate;

          return d ? new Date(d).getTime() : null;
        }

        if (sortParams.orderBy === 'BoardMeetingPlannedDate') {
          let d = coop.BoardMeetingActualDate || coop.BoardMeetingPlannedDate;

          return d ? new Date(d).getTime() : null;
        }

        if (sortParams.orderBy === 'GeneralMeetingPlannedDate') {
          let d =
            coop.GeneralMeetingActualDate || coop.GeneralMeetingPlannedDate;

          return d ? new Date(d).getTime() : null;
        }

        return prepareData(coop, sortParams.orderBy as string, sortParams.type);
      },
      sortParams.order
    );
  }, [activeCooperatives, sortParams]);

  const slicedCooperatives = useMemo(
    () => slice(sortedCooperatives, currentPage, rowsPerPage),
    [sortedCooperatives, currentPage, rowsPerPage]
  );

  return (
    <>
      <Scroll className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead
            className={classes.tableHeadRow}
            classes={headClasses}
            columns={columns}
            sort={sortParams}
            onChangeSortParams={handleChangeSortParams}
          />
          <TableBody>
            {slicedCooperatives.map((cooperative) => {
              return (
                <GeneralCooperativesTableRow
                  key={cooperative.Id}
                  cooperative={cooperative}
                  onSelectCooperative={onSelectCooperative}
                  saveComment={saveComment}
                />
              );
            })}
          </TableBody>
        </Table>
      </Scroll>

      <Pagination
        className={classes.pagination}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={DEFAULT_PAGINATION_OPTIONS}
        currentPage={currentPage}
        totalItems={cooperatives.length}
        onChangeCurrentPage={handleChangeCurrentPage}
        onChangeRowsPerPage={handleChaneRowsPerPage}
      />
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={initError} />
    </>
  );
};

export default GeneralCooperativeTable;
