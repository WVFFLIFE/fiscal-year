import { Column, SortModel } from 'models';
import useSort from 'hooks/useSort';
import { renderAs } from './utils';

import Table from '@mui/material/Table';
import TableHead from 'components/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import clsx from 'clsx';
import { useStyles } from './style';

interface BodyRowProps {
  className?: string;
}

interface BodyCellProps {
  className?: string;
}

interface DefaultTableProps<T extends object> {
  data: T[];
  /**
   * List of columns
   */
  columns: Column<T>[];
  /**
   * Params that applied for sorting data
   * If sortParams is undefined - table is not sortable
   * @default undefined;
   */
  sortParams?: SortModel<T>;
  /**
   * Size of table`s body cell
   * @default medium
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Props applied to table`s body row
   */
  BodyRowProps?: BodyRowProps;
  BodyCellProps?: BodyCellProps;
}

const DefaultTable = <T extends object>({
  data,
  columns,
  sortParams: defaultSortParams,
  size = 'medium',
  BodyRowProps,
  BodyCellProps,
}: DefaultTableProps<T>) => {
  const classes = useStyles();

  const { list, sortParams, onChangeSortParams } = useSort(
    data,
    defaultSortParams
  );

  return (
    <Table>
      <TableHead
        columns={columns}
        sort={sortParams}
        onChangeSortParams={onChangeSortParams}
      />
      <TableBody>
        {list.length ? (
          list.map((item) => {
            return (
              <TableRow
                key={JSON.stringify(item)}
                className={BodyRowProps?.className}
              >
                {columns.map((column) => {
                  const {
                    field,
                    align = 'left',
                    type = 'string',
                    bodyCellClassName,
                  } = column;
                  return (
                    <TableCell
                      key={column.field as string}
                      align={align}
                      className={clsx(
                        classes.cell,
                        BodyCellProps?.className,
                        {
                          [classes.small]: size === 'small',
                          [classes.large]: size === 'large',
                        },
                        bodyCellClassName
                      )}
                    >
                      {renderAs(item[field], type)}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow className={BodyRowProps?.className}>
            {columns.map((column) => {
              return (
                <TableCell
                  key={column.field as string}
                  align={column.align}
                  className={clsx(classes.cell, BodyCellProps?.className, {
                    [classes.small]: size === 'small',
                    [classes.large]: size === 'large',
                  })}
                >
                  &mdash;
                </TableCell>
              );
            })}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DefaultTable;
