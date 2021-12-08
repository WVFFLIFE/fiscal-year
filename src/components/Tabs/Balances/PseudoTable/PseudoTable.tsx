import { ReactNode } from 'react';
import PseudoTableRow from './PseudoTableRow';

import { useStyles } from './style';

export interface PseudoTableColumn<T extends object = {}> {
  label: string;
  field: keyof T | string;
  editable?: boolean;
  type?: 'string' | 'number' | 'date';
  render?: (data: T) => ReactNode;
}

interface PseudoTableProps<T extends object = {}> {
  className?: string;
  columns: PseudoTableColumn<T>[];
  data: T;
  disabled?: boolean;
  onSave(options: { [key: string]: string | number }, cb?: () => void): void;
}

const PseudoTable = <T extends object = {}>({
  className,
  columns,
  data,
  disabled,
  onSave,
}: PseudoTableProps<T>) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      {columns.map((column) => {
        return (
          <PseudoTableRow
            key={String(column.field)}
            className={className}
            data={data}
            column={column}
            disabled={disabled}
            onSave={onSave}
          />
        );
      })}
    </div>
  );
};

export default PseudoTable;
