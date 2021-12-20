import { memo } from 'react';
import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
} from 'models/TableModel';
import { CheckboxPropsModel } from '../ActionsTable';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from 'components/Checkbox';

import { renderAs } from '../utils';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionsTableRowProps<T extends object = DefaultTableData> {
  data: T;
  columns: ActionColumn<T>[];
  RowProps?: InnerTableComponentProps;
  withCheckbox?: boolean;
  checked?: boolean;
  onToggleChecked?(): void;
  CheckboxCellProps?: InnerTableComponentProps;
}

const ActionsTableRow = <T extends object = DefaultTableData>(
  props: ActionsTableRowProps<T>
) => {
  const classes = useStyles();
  const {
    data,
    columns,
    withCheckbox,
    checked,
    onToggleChecked,
    RowProps,
    CheckboxCellProps,
  } = props;

  return (
    <TableRow {...RowProps}>
      {withCheckbox && (
        <TableCell
          className={clsx(classes.cell, CheckboxCellProps?.className)}
          style={CheckboxCellProps?.style}
        >
          <Checkbox checked={checked} onChange={onToggleChecked} />
        </TableCell>
      )}
      {columns.map((column) => {
        const { field, align = 'left', BodyCellProps } = column;
        const cellData = field && data[field];
        return (
          <TableCell
            key={field as string}
            align={align || 'left'}
            className={clsx(classes.cell, BodyCellProps?.className)}
            style={BodyCellProps?.style}
          >
            {column.type === 'action'
              ? column.actions(data)
              : renderAs(cellData, column.type)}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default memo(ActionsTableRow);
