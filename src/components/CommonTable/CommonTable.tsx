import { CSSProperties } from 'react';

import { getDataByType, DataType } from './utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import CommonTableHead from './CommonTableHead';

import clsx from 'clsx';
import { useStyles, TableCell } from './style';

export type StringKey<D> = Extract<keyof D, string>;
export type IdType<D> = StringKey<D> | string;

export type CommonTableColumn<D extends { Id: string }> = {
  label: string;
  accessor: keyof D;
  type: DataType;
} & Partial<{
  align: 'left' | 'center' | 'right';
  cellClassName: string;
  cellStyle: CSSProperties;
  headStyle: CSSProperties;
  render: (el: D) => JSX.Element;
}>;

interface CommonTableProps<D extends { Id: string }> {
  className?: string;
  columns: CommonTableColumn<D>[];
  list: D[];
}

const CommonTable = <D extends { Id: string }>({
  className,
  columns,
  list,
}: CommonTableProps<D>) => {
  const classes = useStyles();

  return (
    <Table className={clsx(classes.table, className)}>
      <CommonTableHead columns={columns} />
      <TableBody>
        {list.length ? (
          list.map((item) => {
            return (
              <TableRow key={item.Id}>
                {columns.map((column, idx) => {
                  return (
                    <TableCell
                      key={idx}
                      style={column.cellStyle}
                      align={column.align}
                    >
                      {column.render ? (
                        column.render(item)
                      ) : (
                        <span className={column.cellClassName}>
                          {getDataByType(item[column.accessor], column.type)}
                        </span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            {columns.map((_, idx) => (
              <TableCell key={idx}>&mdash;</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CommonTable;
