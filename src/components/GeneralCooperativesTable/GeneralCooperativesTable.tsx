import { useState, useMemo } from 'react';
import usePagination, { slice } from 'hooks/usePagination';
import {
  SortModel,
  Column,
  ExtendedCooperativeModel,
  ErrorModel,
} from 'models';
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

import { useStyles } from './style';

const columns: Column[] = [
  {
    field: 'Name',
    label: '#table.summary.cooperative',
    type: 'string',
  },
  {
    field: 'LatestClosedDate',
    label: '#table.summary.periodclosed',
    type: 'date',
  },
  {
    field: 'IsFinancialCalculationsAccepted',
    label: '#table.summary.fcaccepted',
    align: 'right',
    style: { width: 90 },
  },
  {
    field: 'IsFiscalYearClosed',
    label: '#table.summary.fyclosed',
    align: 'right',
    style: { width: 90 },
  },
  {
    field: 'BoardMeetingPlannedDate',
    label: '#table.summary.boardmeeting',
    align: 'center',
    style: { width: 115 },
    type: 'date',
  },
  {
    field: 'AuditingPlannedDate',
    label: '#table.summary.auditing',
    align: 'center',
    style: { width: 115 },
    type: 'date',
  },
  {
    field: 'GeneralMeetingPlannedDate',
    label: '#table.summary.generalmeeting',
    align: 'center',
    style: { width: 115 },
    type: 'date',
  },
  {
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

const GeneralCooperativeTable: React.FC<GeneralCooperativeTableProps> = ({
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

  const saveComment = async (fyId: string, comment: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      const res = await Services.fiscalYearCommentsUpdate(fyId, comment);

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));

        await fetchExtendedCooperativesList();
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
  };

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
            if (coop.AuditingActualDate) return 'AuditingActualDate';
            if (coop.AuditingPlannedDate) return 'AuditingPlannedDate';
            return 'AuditingPlannedDate';
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
        if (sortParams.orderBy === 'AuditingPlannedDate') {
          let d = coop.AuditingActualDate || coop.AuditingPlannedDate;

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

        return prepareData(coop, sortParams.orderBy, sortParams.type);
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
      <Table>
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
                searchTerm={searchTerm}
                key={cooperative.Id}
                cooperative={cooperative}
                onSelectCooperative={onSelectCooperative}
                saveComment={saveComment}
              />
            );
          })}
        </TableBody>
      </Table>
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