import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
} from 'models/TableModel';
import { CheckboxProps as CheckboxPropsModel } from '../ActionsTable';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from 'components/Checkbox';
import Highlight from 'components/Highlight';

import renderAs from 'utils/renderAs';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionsTableRowProps<T extends object = DefaultTableData> {
  data: T;
  columns: ActionColumn<T>[];
  highlight: boolean;
  RowProps?: InnerTableComponentProps;
  CheckboxProps?: CheckboxPropsModel<T>['BodyProps'];
}

const ActionsTableRow = <T extends object = DefaultTableData>(
  props: ActionsTableRowProps<T>
) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { data, columns, RowProps, CheckboxProps } = props;

  const checkboxProps = useMemo(
    () => (CheckboxProps ? CheckboxProps.Row(data) : undefined),
    [data, CheckboxProps]
  );

  return (
    <TableRow
      className={clsx(RowProps?.className, checkboxProps?.className)}
      style={{ ...RowProps?.style, ...checkboxProps?.style }}
      onClick={checkboxProps?.onClick}
    >
      {CheckboxProps && (
        <TableCell
          className={clsx(classes.cell, CheckboxProps?.Cell?.className)}
          style={CheckboxProps?.Cell?.style}
        >
          <Checkbox checked={checkboxProps?.checked} />
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
            {column.render
              ? column.render(data)
              : column.type === 'translate'
              ? cellData && typeof cellData === 'string' && t(cellData)
              : renderAs(cellData, column.type) && (
                  <Highlight text={renderAs(cellData, column.type) as string} />
                )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default memo(ActionsTableRow);
