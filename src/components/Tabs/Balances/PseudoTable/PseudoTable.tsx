import { useTranslation } from 'react-i18next';

import PseudoTableRow from './PseudoTableRow';

import clsx from 'clsx';
import { useStyles } from './style';

export interface PseudoTableColumn<T extends object = {}> {
  label: string;
  field: keyof T;
  editable?: boolean;
  type?: 'string' | 'date';
}

interface PseudoTableProps<T extends object = {}> {
  className?: string;
  columns: PseudoTableColumn<T>[];
  data: T;
  disabled?: boolean;
}

const PseudoTable = <T extends object = {}>({
  className,
  columns,
  data,
  disabled,
}: PseudoTableProps<T>) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.row, className)}>
      {columns.map((column) => {
        return (
          <PseudoTableRow
            key={String(column.field)}
            className={className}
            data={data}
            column={column}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default PseudoTable;
