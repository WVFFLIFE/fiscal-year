import { Column } from './models';
import BalancesTableRow from './BalancesTableRow';

import { useStyles } from './style';

interface BalancesTableProps<T extends object> {
  className?: string;
  data: T;
  columns: Column<T>[];
  disabled?: boolean;
}

const BalancesTable = <T extends object>({
  className,
  data,
  columns,
  disabled,
}: BalancesTableProps<T>) => {
  const classes = useStyles();

  return (
    <div className={classes.row}>
      {columns.map((column) => (
        <BalancesTableRow
          key={column.id}
          className={className}
          column={column}
          data={data}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default BalancesTable;
