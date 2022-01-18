import { memo, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'models';
import { RunningNumberSettingsItem } from 'utils/fiscalYear';
import useSort from 'hooks/useSort';
import { renderAs } from './utils';

import Table from '@mui/material/Table';
import TableHead from 'components/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import clsx from 'clsx';
import { useStyles } from './style';

interface RunningNumberSettingsTableProps {
  data: RunningNumberSettingsItem[];
}

const RunningNumberSettingsTable: FC<RunningNumberSettingsTableProps> = ({
  data,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { list, sortParams, onChangeSortParams } = useSort(data, {
    order: 'asc',
    orderBy: 'documentTypeLabel',
    type: 'alphanumeric',
  });

  const columns: Column<RunningNumberSettingsItem>[] = useMemo(
    () => [
      {
        label: '#tab.appendexis.runningnumbersettings.table.documenttype',
        field: 'documentTypeLabel',
        sortable: true,
        align: 'left',
        bodyCellClassName: classes.semibold,
        render: (data) => data.documentTypeLabel && t(data.documentTypeLabel),
      },
      {
        label: '#tab.appendexis.runningnumbersettings.table.startnumber',
        field: 'startNumber',
        type: 'int',
        sortable: true,
        align: 'right',
        bodyCellClassName: classes.light,
      },
      {
        label: '#tab.appendexis.runningnumbersettings.table.currentnumber',
        field: 'currentNumber',
        type: 'int',
        sortable: true,
        align: 'right',
        bodyCellClassName: classes.light,
      },
      {
        label: '#tab.appendexis.runningnumbersettings.table.owner',
        field: 'ownerName',
        sortable: true,
        align: 'left',
        bodyCellClassName: classes.semibold,
      },
      {
        label: '#tab.appendexis.runningnumbersettings.table.createdon',
        field: 'createdOn',
        sortable: true,
        align: 'right',
        type: 'datetime',
        bodyCellClassName: classes.light,
      },
    ],
    [classes, t]
  );

  return (
    <Table className={classes.table}>
      <TableHead
        columns={columns}
        sort={sortParams}
        onChangeSortParams={onChangeSortParams}
      />
      <TableBody>
        {list.map((item) => {
          return (
            <TableRow key={item.id} className={classes.row}>
              {columns.map((column) => {
                const {
                  field,
                  align = 'left',
                  type = 'string',
                  bodyCellClassName,
                } = column;
                return (
                  <TableCell
                    key={column.field}
                    align={align}
                    className={clsx(classes.cell, bodyCellClassName)}
                  >
                    {column.render
                      ? column.render(item)
                      : renderAs(item[field], type)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default memo(RunningNumberSettingsTable);
