import { useState, useCallback } from 'react';
import { Column } from 'models';
import { defaultFormat, isValid, toDate } from 'utils/dates';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import DatePicker from 'components/DatePicker';
import ActionButton from 'components/ActionButton';
import { BodyTableCell, BodyTableRow } from 'components/Styled';
import { EditIcon, RoundCheckIcon, CloseIcon } from 'components/Icons';

import clsx from 'clsx';
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
  {
    field: '_action',
    label: '#table.generalinfo.action',
    align: 'right',
    style: { width: 190 },
  },
];

export interface GeneralInformationDataModel {
  id: string;
  name: string | null;
  cooperativeLink: string | null;
  startDate: string | null;
  endDate: string | null;
  isClosed: boolean;
}

interface EditableDataModel {
  startDate: Date | null;
  endDate: Date | null;
  id: string | null;
}

interface GeneralInformationTableProps {
  disabled?: boolean;
  list: GeneralInformationDataModel[];
  onSaveFiscalYear(startDate: Date, endDate: Date): Promise<unknown>;
}

const GeneralInformationTable: React.FC<GeneralInformationTableProps> = ({
  list,
  disabled,
  onSaveFiscalYear,
}) => {
  const classes = useStyles();

  const [editableData, setEditableData] = useState<EditableDataModel>({
    id: null,
    startDate: null,
    endDate: null,
  });

  const handleChangeEditableData = (
    key: keyof EditableDataModel,
    val: EditableDataModel[keyof EditableDataModel]
  ) => {
    setEditableData((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleChangeStartDate = useCallback((d: Date | null) => {
    handleChangeEditableData('startDate', d);
  }, []);

  const handleChangeEndDate = useCallback((d: Date | null) => {
    handleChangeEditableData('endDate', d);
  }, []);

  const handleAllowEdit = (editableData: Partial<EditableDataModel>) => {
    setEditableData((prevState) => ({
      ...prevState,
      ...editableData,
    }));
  };

  const handleResetEditableData = () => {
    setEditableData({ id: null, endDate: null, startDate: null });
  };

  const handleSave = async () => {
    if (editableData.endDate && editableData.startDate) {
      await onSaveFiscalYear(editableData.startDate, editableData.endDate);
    }
  };

  return (
    <Table>
      <TableHead columns={columns} className={classes.row} />
      <TableBody>
        {list.map((item, idx) => {
          const startDate = toDate(item.startDate);
          const endDate = toDate(item.endDate);
          const open = editableData.id === item.id;

          return (
            <BodyTableRow key={item.id} hover={!!!disabled}>
              <BodyTableCell>
                {item.cooperativeLink ? (
                  <a
                    className={classes.link}
                    href={item.cooperativeLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <span className={classes.link}>{item.name}</span>
                )}
              </BodyTableCell>
              <BodyTableCell>
                {open ? (
                  <DatePicker
                    open={true}
                    className={classes.datepicker}
                    date={editableData.startDate}
                    onChange={handleChangeStartDate}
                  />
                ) : startDate ? (
                  defaultFormat(startDate)
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
                  defaultFormat(endDate)
                ) : (
                  '-'
                )}
              </BodyTableCell>
              <BodyTableCell>{item.isClosed ? 'Yes' : 'No'}</BodyTableCell>
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
                        disabled={
                          !isValid(editableData.startDate) ||
                          !isValid(editableData.endDate)
                        }
                        onClick={handleSave}
                      >
                        <RoundCheckIcon className={classes.icon} />
                      </ActionButton>
                    </>
                  ) : (
                    <ActionButton
                      disableRipple
                      palette="darkBlue"
                      disabled={!!item.isClosed || disabled}
                      onClick={() =>
                        handleAllowEdit({ id: item.id, startDate, endDate })
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
