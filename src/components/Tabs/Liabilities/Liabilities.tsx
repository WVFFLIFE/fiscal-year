import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import useLiabilitiesData from './useLiabilitiesData';
import useDialogStateWithId from 'hooks/useDialogStateWithId';
import useToggleSwitch from 'hooks/useToggleSwitch';
import usePagination, { slice } from 'hooks/usePagination';
import useSort from 'hooks/useSort';
import {
  ActionColumn,
  InnerTableComponentProps,
  SortModel,
} from 'models/TableModel';
import { selectIsClosedField } from 'selectors/generalPageSelectors';
import { EnhancedLiability } from 'utils/liabilities';

import ActionsTable, {
  CheckboxProps as CheckboxPropsModel,
} from 'components/ActionsTable';
import LiabilityRowAction from './LiabilityRowAction';
import SuspenceFacade from 'components/SuspenceFacade';
import Actions from './Actions';
import Dialog from 'components/Dialog';
import LiablityViewForm from './LiabilityViewForm';
import LiabilityForm from './LiabilityForm';
import LiabilityEditForm from './LiabilityEditForm';
import ConfirmationWindow from 'components/ConfirmationWindow';
import Pagination from 'components/Pagination';
import { RoundQuestionIcon } from 'components/Icons';
import { Scroll } from 'components/Styled';

import clsx from 'clsx';
import { useStyles } from './style';

const CHECKBOX_COLUMN_WIDTH = 40;
const rowsPerPageOptions = [10, 20, 30];
const defaultSortParams: SortModel<EnhancedLiability> = {
  order: 'asc',
  orderBy: 'name',
  type: 'alphanumeric',
};

const Liabilities = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const isClosed = useStateSelector(selectIsClosedField);

  const {
    requestState,
    handleUpdateList,
    handleInitError,
    handleDelete,
    handleToggleSelectAll,
    handleToggleSelectRow,
  } = useLiabilitiesData();

  const { list, sortParams, onChangeSortParams } = useSort(
    requestState.liabilities,
    defaultSortParams
  );
  const {
    rowsPerPage,
    currentPage,
    handleChaneRowsPerPage,
    handleChangeCurrentPage,
  } = usePagination({ currentPage: 0, rowsPerPage: 10 });

  const [openCreateForm, toggleCreateFormVisibility] = useToggleSwitch();
  const viewFormDialogState = useDialogStateWithId();
  const editFormDialogState = useDialogStateWithId();
  const confirmationDeleteDialogState = useDialogStateWithId();

  const handleEdit = () => {
    if (viewFormDialogState.ids.length === 1) {
      viewFormDialogState.close();
      editFormDialogState.open(viewFormDialogState.ids);
    }
  };

  const columns: ActionColumn<EnhancedLiability>[] = [
    {
      label: '#tab.liabilities.table.liabilityname',
      field: 'name',
      HeadCellProps: {
        className: classes.fixed,
        style: { width: 220, left: CHECKBOX_COLUMN_WIDTH, background: '#fff' },
      },
      BodyCellProps: {
        className: clsx(classes.fixed, classes.semibold),
        style: { left: CHECKBOX_COLUMN_WIDTH },
      },
    },
    {
      label: '#tab.liabilities.table.liabilitytype',
      field: 'liabilityGeneralTypeLabel',
      type: 'translate',
      HeadCellProps: {
        style: { width: 200 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      label: '#tab.liabilities.table.liabilityparty',
      field: 'partyName',
      HeadCellProps: {
        style: { width: 150 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.startdate',
      field: 'startDate',
      type: 'date',
      HeadCellProps: {
        style: { width: 120 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.enddate',
      field: 'endDate',
      type: 'date',
      HeadCellProps: {
        style: { width: 120 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      label: '#tab.liabilities.table.documentnumber',
      field: 'documentNumber',
      HeadCellProps: {
        style: { width: 200 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      label: '#tab.liabilities.table.usage',
      field: 'liabilityUsageLabel',
      type: 'translate',
      HeadCellProps: {
        style: { width: 150 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      label: '#tab.liabilities.table.product',
      field: 'liabilityProductLabel',
      type: 'translate',
      HeadCellProps: {
        style: { width: 200 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      label: '#tab.liabilities.table.type',
      field: 'liabilityTypeLabel',
      type: 'translate',
      HeadCellProps: {
        style: { width: 150 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.quantity',
      field: 'quantity',
      type: 'float6',
      HeadCellProps: {
        style: { width: 150 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.priceitemrate',
      field: 'priceItemRate',
      type: 'money',
      HeadCellProps: {
        style: { width: 150 },
      },
      BodyCellProps: {
        className: classes.semibold,
      },
    },
    {
      align: 'left',
      label: '#tab.liabilities.table.action',
      field: null,
      sortable: false,
      render: (data) => (
        <LiabilityRowAction
          liability={data}
          isClosedFiscalYear={isClosed}
          onOpen={viewFormDialogState.open}
          onEdit={editFormDialogState.open}
          onDelete={confirmationDeleteDialogState.open}
        />
      ),
      HeadCellProps: {
        style: { width: isClosed ? 90 : 200 },
      },
      BodyCellProps: {
        className: classes.actionCell,
      },
    },
  ];

  const ActionsTableRowProps: InnerTableComponentProps = useMemo(
    () => ({
      className: classes.row,
    }),
    [classes]
  );

  const CheckboxProps: CheckboxPropsModel<EnhancedLiability> = useMemo(
    () => ({
      HeadProps: {
        selectedAll:
          requestState.liabilities.length === requestState.selectedRows.length,
        onToggleSelectAll: handleToggleSelectAll,
        Cell: {
          className: classes.fixed,
          style: { left: 0, width: CHECKBOX_COLUMN_WIDTH, background: '#fff' },
        },
      },
      BodyProps: {
        Cell: {
          className: classes.fixed,
          style: { left: 0 },
        },
        Row: (liability) => {
          const checked = requestState.selectedRows.includes(liability.id);

          return {
            checked,
            onClick: () => handleToggleSelectRow(liability),
          };
        },
      },
    }),
    [
      classes,
      requestState.liabilities,
      requestState.selectedRows,
      handleToggleSelectAll,
      handleToggleSelectRow,
    ]
  );

  const slicedData = useMemo(
    () => slice(list, currentPage, rowsPerPage),
    [list, currentPage, rowsPerPage]
  );

  return (
    <SuspenceFacade
      loading={requestState.loading}
      error={requestState.error}
      onInitError={handleInitError}
    >
      <Actions
        disabled={isClosed}
        selected={requestState.selectedRows}
        onCreate={toggleCreateFormVisibility}
        onView={viewFormDialogState.open}
        onEdit={editFormDialogState.open}
        onDelete={confirmationDeleteDialogState.open}
      />
      <Scroll className={classes.root}>
        <ActionsTable
          highlight
          className={classes.table}
          data={slicedData}
          columns={columns}
          sortParams={sortParams}
          onChangeSortParams={onChangeSortParams}
          CheckboxProps={CheckboxProps}
          BodyRowProps={ActionsTableRowProps}
        />
      </Scroll>
      <Pagination
        className={classes.pagination}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        onChangeCurrentPage={handleChangeCurrentPage}
        onChangeRowsPerPage={handleChaneRowsPerPage}
        totalItems={requestState.liabilities.length}
      />
      <Dialog
        open={viewFormDialogState.isOpen}
        title={'Liability information'}
        handleClose={viewFormDialogState.close}
        TransitionProps={{
          onExited: viewFormDialogState.reset,
        }}
      >
        {viewFormDialogState.ids.length && (
          <LiablityViewForm
            id={viewFormDialogState.ids[0]}
            isClosed={isClosed}
            onEdit={handleEdit}
          />
        )}
      </Dialog>
      <Dialog
        open={openCreateForm}
        title={'Add Liability'}
        handleClose={toggleCreateFormVisibility}
      >
        <LiabilityForm
          action="create"
          onClose={toggleCreateFormVisibility}
          onUpdate={handleUpdateList}
        />
      </Dialog>
      <Dialog
        open={editFormDialogState.isOpen}
        title={'Edit Liability Information'}
        handleClose={editFormDialogState.close}
        TransitionProps={{
          onExited: editFormDialogState.reset,
        }}
      >
        {editFormDialogState.ids.length && (
          <LiabilityEditForm
            ids={editFormDialogState.ids}
            onClose={editFormDialogState.close}
            onUpdate={handleUpdateList}
          />
        )}
      </Dialog>
      <ConfirmationWindow
        maxWidth="sm"
        open={confirmationDeleteDialogState.isOpen}
        handleClose={confirmationDeleteDialogState.close}
        title="Delete liability(ies)"
        description="Are you sure you want to delete this liability(ies)?"
        Icon={<RoundQuestionIcon className={classes.questionIcon} />}
        TransitionProps={{
          onExited: confirmationDeleteDialogState.reset,
        }}
        CancelBtnProps={{
          label: t('#button.cancel'),
          onClick: confirmationDeleteDialogState.close,
        }}
        ApplyBtnProps={{
          label: t('#button.delete'),
          loading: requestState.deleting,
          disabled: requestState.deleting,
          onClick: () =>
            handleDelete(
              confirmationDeleteDialogState.ids,
              confirmationDeleteDialogState.close
            ),
        }}
      />
    </SuspenceFacade>
  );
};

export default Liabilities;
