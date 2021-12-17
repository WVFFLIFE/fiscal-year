import { memo } from 'react';
import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
} from 'models/TableModel';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { renderAs } from '../utils';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionsTableRowProps<T extends object = DefaultTableData> {
  data: T;
  columns: ActionColumn<T>[];
  RowProps?: InnerTableComponentProps;
}

const ActionsTableRow = <T extends object = DefaultTableData>(
  props: ActionsTableRowProps<T>
) => {
  const classes = useStyles();
  const { data, columns, RowProps } = props;

  return (
    <TableRow {...RowProps}>
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
