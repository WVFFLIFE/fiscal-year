import { useEffect, useState } from 'react';
import { Column, SortModel } from 'models';
import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import DatePicker from 'components/DatePicker';
import ActionButton from 'components/ActionButton';
import { BodyTableCell, BodyTableRow } from 'components/Styled';
import { EditIcon, RoundCheckIcon, CloseIcon } from 'components/Icons';

import clsx from 'clsx';
import { useTheme } from '@mui/material';
import { useStyles } from './style';

const columns: Column[] = [
  {
    field: 'Name',
    label: '#table.generalinfo.cooperative',
  },
  {
    field: 'StartDate',
    label: '#table.generalinfo.startingdate',
    style: { width: 200 },
  },
  {
    field: 'EndDate',
    label: '#table.generalinfo.endingdate',
    style: { width: 200 },
  },
  { field: 'Closed', label: '#table.generalinfo.closed' },
  { field: 'Owner', label: '#table.generalinfo.owner' },
  {
    field: '_action',
    label: '#table.generalinfo.action',
    align: 'right',
    style: { width: 190 },
  },
];

const data = [
  {
    Id: 'id1',
    Name: 'Linnoitustie 19, KANGASALA, Pirkanmaa',
    StartingDate: '2021-01-01T00:00:00+03:00',
    EndingDate: null,
    Closed: false,
    Owner: 'Teemu Kuusisto',
  },
];

interface EditableDataModel {
  startDate: Date | null;
  endDate: Date | null;
  id: string | null;
}

const GeneralInformationTable = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [sortParams, setSortParams] = useState<SortModel>({
    order: 'asc',
    orderBy: 'StartDate',
    type: 'date',
  });
  const [editableData, setEditableData] = useState<EditableDataModel>({
    id: null,
    startDate: null,
    endDate: null,
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
      type: 'string',
    }));
  };

  const handleChangeEditableData = (
    key: keyof EditableDataModel,
    val: EditableDataModel[keyof EditableDataModel]
  ) => {
    setEditableData((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleChangeStartDate = (d: Date | null) => {
    handleChangeEditableData('startDate', d);
  };

  const handleChangeEndDate = (d: Date | null) => {
    handleChangeEditableData('endDate', d);
  };

  const handleAllowEdit = (editableData: Partial<EditableDataModel>) => {
    setEditableData((prevState) => ({
      ...prevState,
      ...editableData,
    }));
  };

  const handleResetEditableData = () => {
    setEditableData({ id: null, endDate: null, startDate: null });
  };

  return (
    <Table>
      <TableHead
        columns={columns}
        bgColor={theme.color.greyLight2}
        sort={sortParams}
        onChangeSortParams={handleChangeSortParams}
      />
      <TableBody>
        {data.map((item) => {
          const startDate = item.StartingDate
            ? new Date(item.StartingDate)
            : null;
          const endDate = item.EndingDate ? new Date(item.EndingDate) : null;
          const open = editableData.id === item.Id;

          return (
            <BodyTableRow key={item.Id} hover>
              <BodyTableCell>
                <span className={classes.link}>{item.Name}</span>
              </BodyTableCell>
              <BodyTableCell>
                {open ? (
                  <DatePicker
                    className={classes.datepicker}
                    date={editableData.startDate}
                    onChange={handleChangeStartDate}
                  />
                ) : startDate ? (
                  format(startDate, DEFAULT_FORMAT_PATTERN)
                ) : (
                  '&#9473;'
                )}
              </BodyTableCell>
              <BodyTableCell>
                {open ? (
                  <DatePicker
                    className={classes.datepicker}
                    date={editableData.endDate}
                    onChange={handleChangeEndDate}
                  />
                ) : endDate ? (
                  format(endDate, DEFAULT_FORMAT_PATTERN)
                ) : (
                  '-'
                )}
              </BodyTableCell>
              <BodyTableCell>{item.Closed ? 'No' : 'Yes'}</BodyTableCell>
              <BodyTableCell>
                <span className={classes.link}>{item.Owner}</span>
              </BodyTableCell>
              <BodyTableCell align="right">
                <div className={clsx('cell-actions', classes.centered)}>
                  {open ? (
                    <>
                      <ActionButton
                        disableRipple
                        className={classes.closeBtn}
                        onClick={handleResetEditableData}
                      >
                        <CloseIcon className={classes.icon} />
                      </ActionButton>
                      <ActionButton
                        disableRipple
                        palette="darkBlue"
                        onClick={() =>
                          handleAllowEdit({ id: item.Id, startDate, endDate })
                        }
                      >
                        <RoundCheckIcon className={classes.icon} />
                      </ActionButton>
                    </>
                  ) : (
                    <ActionButton
                      disableRipple
                      palette="darkBlue"
                      onClick={() =>
                        handleAllowEdit({ id: item.Id, startDate, endDate })
                      }
                    >
                      <EditIcon className={classes.icon} />
                    </ActionButton>
                  )}
                </div>
              </BodyTableCell>
            </BodyTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GeneralInformationTable;
