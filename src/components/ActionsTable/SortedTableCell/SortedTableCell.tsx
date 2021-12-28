import { memo } from 'react';

import { SortArrows, ArrowIcon } from 'components/Icons';
import { HeadTableCell } from 'components/Styled';
import { TableCellProps as MuiTableCellProps } from '@mui/material/TableCell';

import clsx from 'clsx';
import { useStyles } from './style';

interface SortedTableCellProps extends MuiTableCellProps {
  onChangeSortParams?(orderBy: string, type?: 'alphanumeric' | 'date'): void;
  order?: 'asc' | 'desc';
  orderBy: string | null;
  type?: 'alphanumeric' | 'date';
  field: string;
}

const SortedTableCell: React.FC<SortedTableCellProps> = ({
  field,
  order,
  orderBy,
  type,
  onChangeSortParams,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <HeadTableCell {...rest}>
      <span
        role="button"
        onClick={onChangeSortParams && (() => onChangeSortParams(field, type))}
        className={classes.label}
      >
        {children}
        {orderBy === field ? (
          <ArrowIcon
            className={clsx(classes.icon, {
              [classes.asc]: order === 'asc',
            })}
          />
        ) : (
          <SortArrows className={classes.icon} />
        )}
      </span>
    </HeadTableCell>
  );
};

export default memo(SortedTableCell);
