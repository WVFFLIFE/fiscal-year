import { useMemo } from 'react';
import usePagination from 'hooks/usePagination';
import useLookupRecordsData from './useLookUpRecordsData';
import { ActionColumn, SortModel } from 'models/TableModel';
import { Organization } from 'services/s';

import SuspenceFacade from 'components/SuspenceFacade';
import Search from 'components/controls/Search';
import ActionsTable, {
  CheckboxProps as CheckboxPropsModel,
} from 'components/ActionsTable';
import Pagination from 'components/Pagination';

import { useStyles } from './style';

const defaulSort: SortModel<Organization> = {
  order: 'asc',
  orderBy: 'Name',
  type: 'alphanumeric',
};

const rowsPerPageOptions = [5, 10, 15];

const LookUpRecords = () => {
  const classes = useStyles();

  const {
    requestState,
    searchTerm,
    selectedOrganizations,
    handleChangeSearchTerm,
    handleInitError,
    handleToggleSelectAll,
    handleToggleSelectRow,
  } = useLookupRecordsData();
  const {
    currentPage,
    rowsPerPage,
    handleChaneRowsPerPage,
    handleChangeCurrentPage,
  } = usePagination({ currentPage: 0, rowsPerPage: 5 });

  const CheckboxProps: CheckboxPropsModel<Organization> = useMemo(
    () => ({
      HeadProps: {
        selectedAll:
          requestState.organizations.length === selectedOrganizations.length,
        onToggleSelectAll: handleToggleSelectAll,
      },
      BodyProps: {
        Row: (organization) => {
          const checked = selectedOrganizations.includes(organization.Id);

          return {
            checked,
            onClick: () => handleToggleSelectRow(organization),
          };
        },
      },
    }),
    [requestState.organizations, selectedOrganizations]
  );

  const BodyRowProps = useMemo(
    () => ({
      className: classes.row,
    }),
    [classes]
  );

  const cols: ActionColumn<Organization>[] = useMemo(
    () => [
      {
        label: 'Name',
        field: 'Name',
        sortable: true,
      },
      {
        label: 'Location',
        field: 'Location',
        sortable: true,
      },
    ],
    []
  );

  return (
    <SuspenceFacade
      loading={requestState.loading}
      error={requestState.error}
      onInitError={handleInitError}
    >
      <p className={classes.description}>Enter your search criteria</p>
      <Search
        className={classes.searchField}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <ActionsTable
        className={classes.table}
        columns={cols}
        data={requestState.organizations}
        sortParams={defaulSort}
        BodyRowProps={BodyRowProps}
        CheckboxProps={CheckboxProps}
      />
      <Pagination
        className={classes.pagination}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        totalItems={requestState.organizations.length}
        onChangeCurrentPage={handleChangeCurrentPage}
        onChangeRowsPerPage={handleChaneRowsPerPage}
      />
    </SuspenceFacade>
  );
};

export default LookUpRecords;
