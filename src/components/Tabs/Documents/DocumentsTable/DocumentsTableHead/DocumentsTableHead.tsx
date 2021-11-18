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
  indeterminate?: boolean;
  onToggleSelectAll(e: ChangeEvent<HTMLInputElement>): void;
  onChangeSortParams(id: string, type: SortParamsType): void;
}

const DocumentsTableHead: React.FC<DocumentsTableHeadProps> = ({
  order,
  orderBy,
  selected,
  indeterminate = false,
  onToggleSelectAll,
  onChangeSortParams,
}) => {
  const classes = useTableHeadStyles();

  return (
    <MuiTableHead>
      <MuiTableRow>
        <MuiTableCell component="th" width={40} className={classes.cell}>
          <Checkbox
            onChange={onToggleSelectAll}
            checked={selected}
            indeterminate={indeterminate}
          />
        </MuiTableCell>
        <MuiTableCell
          width={50}
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
          id={'Values.Service_x002f_Process'}
          order={order}
          orderBy={orderBy}
          onClick={() =>
            onChangeSortParams('Values.Service_x002f_Process', 'alphanumeric')
          }
        >
          Service/process
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Values.Information_x0020_Group'}
          order={order}
          orderBy={orderBy}
          onClick={() =>
            onChangeSortParams('Values.Information_x0020_Group', 'alphanumeric')
          }
        >
          Information group
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Values.Modified'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('Values.Modified', 'date')}
        >
          Modified
        </SortedTableCell>
        <SortedTableCell
          className={classes.cell}
          id={'Values.Editor'}
          order={order}
          orderBy={orderBy}
          onClick={() => onChangeSortParams('Values.Editor', 'alphanumeric')}
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
