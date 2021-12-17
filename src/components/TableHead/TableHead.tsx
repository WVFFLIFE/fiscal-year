import { SortModel } from 'models';
import { Column } from 'models/TableModel';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';

import clsx from 'clsx';
import { CSSProperties } from 'react';

export interface TableHeadClasses {
  root?: string;
  cell?: string;
}
//TODO: remove style;
interface NestedColumn<T extends object = { [key: string]: any }>
  extends Column<T> {
  style?: CSSProperties;
}

interface TableHeadProps<T extends object = { [key: string]: any }> {
  className?: string;
  classes?: TableHeadClasses;
  columns: NestedColumn<T>[];
  sort?: SortModel<T>;
  onChangeSortParams?(orderBy: string, type?: 'alphanumeric' | 'date'): void;
}

function switchColumnTypeToSort(colType: Column['type']) {
  switch (colType) {
    case 'string':
    case 'int':
      return 'alphanumeric';
    case 'date':
    case 'datetime':
      return 'date';
    default:
      return 'alphanumeric';
  }
}

const TableHead = <T extends object = { [key: string]: any }>({
  className,
  classes,
  columns,
  sort,
  onChangeSortParams,
}: TableHeadProps<T>) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={clsx(classes?.root, className)}>
        {columns.map(
          ({
            sortable = true,
            style,
            field,
            align,
            label,
            type,
            HeadCellProps,
          }) => {
            const sortType = switchColumnTypeToSort(type);
            return sort && sortable ? (
              <SortedTableCell
                className={clsx(classes?.cell, HeadCellProps?.className)}
                key={field as string}
                type={sortType}
                component="th"
                order={sort.order}
                orderBy={sort.orderBy as string}
                onChangeSortParams={onChangeSortParams}
                field={field as string}
                align={align || 'left'}
                style={{ ...style, ...HeadCellProps?.style }}
              >
                {t(label)}
              </SortedTableCell>
            ) : (
              <HeadTableCell
                key={field as string}
                className={clsx(classes?.cell, HeadCellProps?.className)}
                component="th"
                align={align || 'left'}
                style={{ ...style, ...HeadCellProps?.style }}
              >
                {t(label)}
              </HeadTableCell>
            );
          }
        )}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
