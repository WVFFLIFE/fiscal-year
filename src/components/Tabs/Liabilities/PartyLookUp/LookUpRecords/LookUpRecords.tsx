import { useMemo } from 'react';
import usePagination, { slice } from 'hooks/usePagination';
import useLookupRecordsData from './useLookUpRecordsData';
import { ActionColumn, SortModel } from 'models/TableModel';
import { Organization } from 'services/s';

import SuspenceFacade from 'components/SuspenceFacade';
import Search from 'components/controls/Search';
import ActionsTable, {
  CheckboxProps as CheckboxPropsModel,
} from 'components/ActionsTable';
import Pagination from 'components/Pagination';
import ActionButton from 'components/ActionButton';

import { useStyles } from './style';

const defaulSort: SortModel<Organization> = {
  order: 'asc',
  orderBy: 'Name',
  type: 'alphanumeric',
};

const rowsPerPageOptions = [5, 10, 15];

interface LookUpRecordsProps {
  onChange(organization: Organization): void;
  onClose(): void;
}

const LookUpRecords: React.FC<LookUpRecordsProps> = ({ onChange, onClose }) => {
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

  const handleAddRecord = () => {
    if (selectedOrganizations.length) {
      const [organization] = selectedOrganizations;

      onChange(organization);
      onClose();
    }
  };

  const CheckboxProps: CheckboxPropsModel<Organization> = useMemo(
    () => ({
      HeadProps: {
        show: false,
        selectedAll:
          requestState.organizations.length === selectedOrganizations.length,
        onToggleSelectAll: handleToggleSelectAll,
        Cell: { style: { width: 40 } },
      },
      BodyProps: {
        Row: (organization) => {
          const checked = selectedOrganizations.some(
            (prevOrganization) => prevOrganization.Id === organization.Id
          );

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

  const slicedOrganizations = useMemo(
    () => slice(requestState.organizations, currentPage, rowsPerPage),
    [requestState.organizations, currentPage, rowsPerPage]
  );

  return (
    <>
      <p className={classes.description}>Enter your search criteria</p>
      <Search
        className={classes.searchField}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <SuspenceFacade
        loading={requestState.loading}
        error={requestState.error}
        onInitError={handleInitError}
      >
        <ActionsTable
          className={classes.table}
          columns={cols}
          data={slicedOrganizations}
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
        <div className={classes.btnsWrapper}>
          <ActionButton className={classes.btnOffset} onClick={onClose}>
            Cancel
          </ActionButton>
          <ActionButton
            palette="darkBlue"
            disabled={!selectedOrganizations.length}
            onClick={handleAddRecord}
          >
            Add
          </ActionButton>
        </div>
      </SuspenceFacade>
    </>
  );
};

export default LookUpRecords;
