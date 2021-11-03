import { ChangeEvent } from 'react';
import { SortParamsType } from 'hooks/useSort';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import MuiTableCell from '@mui/material/TableCell';
import Checkbox from 'components/Checkbox';
import { SortArrows, ArrowIcon } from 'components/Icons';

import clsx from 'clsx';
import { useSortedTableCellStyles, useTableHeadStyles } from './style';

interface SortedTableCellProps {
  className?: string;
  orderBy: string | null;
  order: 'asc' | 'desc';
  id: string;
  onClick(): void;
}

const SortedTableCell: React.FC<SortedTableCellProps> = ({
  className,
  orderBy,
  order,
  id,
  onClick,
  children,
}) => {
  const classes = useSortedTableCellStyles();

  return (
    <MuiTableCell
      component="th"
      className={clsx(className, {
        [classes.active]: orderBy === id,
      })}
    >
      <span className={classes.label} onClick={onClick}>
        {children}
        {orderBy !== id ? (
          <SortArrows className={classes.sortIcon} />
        ) : (
          <ArrowIcon
            className={clsx(classes.sortIcon, {
              [classes.sortIconAsc]: order === 'asc',
            })}
          />
        )}
      </span>
    </MuiTableCell>
  );
};

interface DocumentsTableHeadProps {
  order: 'asc' | 'desc';
  orderBy: string | null;
  selected: boolean;
  onToggleSelectAll(e: ChangeEvent<HTMLInputElement>): void;
  onChangeSortParams(id: string, type?: SortParamsType): void;
}

const DocumentsTableHead: React.FC<DocumentsTableHeadProps> = ({
  order,
  orderBy,
  selected,
  onToggleSelectAll,
  onChangeSortParams,
}) => {
  const classes = useTableHeadStyles();

  return (
    <MuiTableHead>
      <MuiTableRow>
        <MuiTableCell component="th" width={40} className={classes.cell}>
          <Checkbox onChange={onToggleSelectAll} checked={selected} />
        </MuiTableCell>
        <MuiTableCell
          width={40}
          component="th"
          className={classes.cell}
        ></MuiTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Name'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('Name', 'alphanumeric')}
        >
          Name
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Service'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('Service', 'alphanumeric')}
        >
          Service/process
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'InformationGroup'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('InformationGroup', 'alphanumeric')}
        >
          Information group
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Modified'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('Modified', 'date')}
        >
          Modified by
        </SortedTableCell>
        <MuiTableCell className={classes.cell} align="right" width={240}>
          Action
        </MuiTableCell>
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default DocumentsTableHead;
