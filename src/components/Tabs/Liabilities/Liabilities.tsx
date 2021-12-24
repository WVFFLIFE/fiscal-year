import { useMemo } from 'react';
import useLiabilitiesData from './useLiabilitiesData';
import useDialogStateWithId from 'hooks/useDialogStateWithId';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { ActionColumn, InnerTableComponentProps } from 'models/TableModel';
import { EnhancedLiability } from 'utils/liabilities';

import ActionsTable, {
  CheckboxProps as CheckboxPropsModel,
} from 'components/ActionsTable';
import LiabilityRowAction from './LiabilityRowAction';
import SuspenceFacade from 'components/SuspenceFacade';
import Actions from './Actions';
import Dialog from 'components/Dialog';
import LiablityViewForm from './LiabilityViewForm';
import LiabilityCreateForm from './LiabilityCreateForm';
import { Scroll } from 'components/Styled';

import clsx from 'clsx';
import { useStyles } from './style';

const CHECKBOX_COLUMN_WIDTH = 40;

const Liabilities = () => {
  const classes = useStyles();

  const {
    requestState,
    selectedRows,
    handleInitError,
    handleToggleSelectAll,
    handleToggleSelectRow,
  } = useLiabilitiesData();
  const viewFormDialogState = useDialogStateWithId();
  const [openCreateForm, toggleOpenCreateForm] = useToggleSwitch();

  const columns: ActionColumn<EnhancedLiability>[] = [
    {
      label: '#tab.liabilities.table.liabilityname',
      field: 'name',
      HeadCellProps: {
        className: classes.fixed,
        style: { width: 170, left: CHECKBOX_COLUMN_WIDTH, background: '#fff' },
      },
      BodyCellProps: {
        className: clsx(classes.fixed, classes.semibold),
        style: { left: CHECKBOX_COLUMN_WIDTH },
      },
    },
    {
      label: '#tab.liabilities.table.liabilitytype',
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
          onOpen={viewFormDialogState.open}
        />
      ),
      HeadCellProps: {
        style: { width: 200 },
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
        selectedAll: requestState.liabilities.length === selectedRows.length,
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
          const checked = selectedRows.includes(liability.id);

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
      selectedRows,
      handleToggleSelectAll,
      handleToggleSelectRow,
    ]
  );

  return (
    <SuspenceFacade
      loading={requestState.loading}
      error={requestState.error}
      onInitError={handleInitError}
    >
      <Actions selected={selectedRows} onCreate={toggleOpenCreateForm} />
      <Scroll className={classes.root}>
        <ActionsTable
          className={classes.table}
          data={requestState.liabilities}
          columns={columns}
          CheckboxProps={CheckboxProps}
          BodyRowProps={ActionsTableRowProps}
        />
      </Scroll>
      <Dialog
        open={viewFormDialogState.isOpen}
        title={'Liability information'}
        handleClose={viewFormDialogState.close}
        TransitionProps={{
          onExited: viewFormDialogState.reset,
        }}
      >
        {viewFormDialogState.id && (
          <LiablityViewForm id={viewFormDialogState.id} />
        )}
      </Dialog>
      <Dialog
        open={openCreateForm}
        title={'Add Liability'}
        handleClose={toggleOpenCreateForm}
      >
        <LiabilityCreateForm />
      </Dialog>
    </SuspenceFacade>
  );
};

export default Liabilities;
