import { useState } from 'react';
import { SortModel, Column, ExtendedCooperativeModel } from 'models';
import { defaultFormat } from 'utils';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import { BodyTableCell, BodyTableRow, IconButton } from 'components/Styled';
import { IcList, CalendarIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const columns: Column[] = [
  {
    field: 'Name',
    label: '#table.generalinfo.cooperative',
  },
  {
    field: 'LatestClosedDate',
    label: 'Period Closed',
  },
  {
    field: 'IsFinancialCalculationsAccepted',
    label: 'FC Accepted',
    align: 'right',
    style: { width: 90 },
  },
  {
    field: 'IsFiscalYearClosed',
    label: 'FY Closed',
    align: 'right',
    style: { width: 90 },
  },
  {
    field: 'Comments',
    label: 'Comments',
  },
  {
    field: '_action',
    label: '',
    align: 'right',
    sortable: false,
    style: { width: 80 },
  },
];

interface GeneralCooperativeTableProps {
  cooperatives: ExtendedCooperativeModel[];
  onSelectCooperative(cooperative: ExtendedCooperativeModel): void;
}

const GeneralCooperativeTable: React.FC<GeneralCooperativeTableProps> = ({
  cooperatives,
  onSelectCooperative,
}) => {
  const classes = useStyles();

  const [sortParams, setSortParams] = useState<SortModel>({
    order: 'asc',
    orderBy: 'Name',
    type: 'alphanumeric',
  });

  const handleChangeSortParams = (orderBy: string) => {
    setSortParams((prevState) => ({
      order:
        orderBy === prevState.orderBy
          ? prevState.order === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
      orderBy,
      type: 'alphanumeric',
    }));
  };

  return (
    <Table>
      <TableHead
        className={classes.tableHeadRow}
        columns={columns}
        sort={sortParams}
        onChangeSortParams={handleChangeSortParams}
      />
      <TableBody>
        {cooperatives.map((cooperative) => {
          return (
            <BodyTableRow>
              <BodyTableCell className={clsx(classes.cell, classes.bold)}>
                <Box className={classes.box}>
                  {cooperative.IsFiscalYearDoesNotMatchCalendar ? (
                    <CalendarIcon
                      className={clsx(classes.icon, classes.calendarIcon)}
                    />
                  ) : (
                    <div className={classes.mockIcon}></div>
                  )}
                  {cooperative.Name}
                </Box>
              </BodyTableCell>
              <BodyTableCell className={clsx(classes.cell, classes.bold)}>
                {cooperative.LatestClosedDate &&
                  defaultFormat(new Date(cooperative.LatestClosedDate))}
              </BodyTableCell>
              <BodyTableCell align="center">
                {cooperative.IsFinancialCalculationsAccepted && (
                  <RoundCheckIcon className={classes.acceptIcon} />
                )}
              </BodyTableCell>
              <BodyTableCell align="center">
                {cooperative.IsFiscalYearClosed && (
                  <RoundCheckIcon className={classes.acceptIcon} />
                )}
              </BodyTableCell>
              <BodyTableCell>{cooperative.Comments}</BodyTableCell>
              <BodyTableCell>
                <IconButton
                  className={classes.actionBtn}
                  onClick={() => onSelectCooperative(cooperative)}
                >
                  <IcList className={classes.icon} />
                </IconButton>
              </BodyTableCell>
            </BodyTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GeneralCooperativeTable;
