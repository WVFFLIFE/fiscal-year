import { useRef, useEffect } from 'react';
import useGeneralInformationTable from './useGeneralInformationTable';
import { useTranslation } from 'react-i18next';

import { Column } from 'models';
import { defaultFormat, isValid, toDate } from 'utils/dates';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import TableRow from '@mui/material/TableRow';
import DatePicker from 'components/DatePicker';
import ActionButton from 'components/ActionButton';
import Highlight from 'components/Highlight';
import ConfirmationWindow from 'components/ConfirmationWindow';
import DialogError from 'components/DialogError';
import { BodyTableCell } from 'components/Styled';
import {
  EditIcon,
  RoundCheckIcon,
  CloseIcon,
  TriangleWarningIcon,
} from 'components/Icons';

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

interface GeneralInformationTableProps {
  disabled?: boolean;
  list: GeneralInformationDataModel[];
}

const GeneralInformationTable: React.FC<GeneralInformationTableProps> = ({
  list,
  disabled,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const startDatePickerRef = useRef<HTMLInputElement>(null);
  const endDatePickerRef = useRef<HTMLInputElement>(null);

  const {
    handleAllowEdit,
    handleChangeEndDate,
    handleChangeStartDate,
    handleInitError,
    handleResetEditableData,
    handleSave,
    editableData,
    confirmationDialog,
    requestState,
  } = useGeneralInformationTable(list);

  useEffect(() => {
    if (editableData.startDateError && startDatePickerRef.current) {
      startDatePickerRef.current.focus();
    }
  }, [editableData.startDateError]);

  useEffect(() => {
    if (
      editableData.endDateError &&
      !editableData.startDateError &&
      endDatePickerRef.current
    ) {
      endDatePickerRef.current.focus();
    }
  }, [editableData.endDateError]);

  return (
    <>
      <Table>
        <TableHead columns={columns} className={classes.row} />
        <TableBody>
          {list.map((item, idx) => {
            const startDate = toDate(item.startDate);
            const endDate = toDate(item.endDate);
            const open = editableData.id === item.id;
            const isDisabledEditBtn = !!item.isClosed || disabled;
            const isDisabledSaveBtn =
              !isValid(editableData.startDate) ||
              !isValid(editableData.endDate) ||
              editableData.startDateError ||
              editableData.endDateError;

            return (
              <TableRow
                key={item.id}
                className={clsx(classes.bodyRow, {
                  [classes.active]: open,
                  [classes.disabled]: disabled,
                })}
              >
                <BodyTableCell>
                  {item.cooperativeLink ? (
                    <a
                      className={classes.link}
                      href={item.cooperativeLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.name && <Highlight text={item.name} />}
                    </a>
                  ) : (
                    <span className={classes.link}>
                      {item.name && <Highlight text={item.name} />}
                    </span>
                  )}
                </BodyTableCell>
                <BodyTableCell>
                  {open ? (
                    <DatePicker
                      ref={startDatePickerRef}
                      open={true}
                      className={classes.datepicker}
                      classes={{
                        inputRoot: clsx({
                          [classes.datepickerError]:
                            editableData.startDateError,
                        }),
                      }}
                      date={editableData.startDate}
                      onChange={handleChangeStartDate}
                    />
                  ) : startDate ? (
                    <Highlight text={defaultFormat(startDate)} />
                  ) : (
                    '&#9473;'
                  )}
                </BodyTableCell>
                <BodyTableCell>
                  {open ? (
                    <DatePicker
                      ref={endDatePickerRef}
                      className={classes.datepicker}
                      classes={{
                        inputRoot: clsx({
                          [classes.datepickerError]: editableData.endDateError,
                        }),
                      }}
                      date={editableData.endDate}
                      onChange={handleChangeEndDate}
                    />
                  ) : endDate ? (
                    <Highlight text={defaultFormat(endDate)} />
                  ) : (
                    '-'
                  )}
                </BodyTableCell>
                <BodyTableCell>
                  {
                    <Highlight
                      text={item.isClosed ? t('#common.yes') : t('#common.no')}
                    />
                  }
                </BodyTableCell>
                <BodyTableCell align="right">
                  <div className={clsx(classes.actions, classes.centered)}>
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
                          disabled={isDisabledSaveBtn}
                          onClick={confirmationDialog.open}
                        >
                          <RoundCheckIcon className={classes.icon} />
                        </ActionButton>
                      </>
                    ) : (
                      <ActionButton
                        disableRipple
                        palette="darkBlue"
                        disabled={isDisabledEditBtn}
                        onClick={() =>
                          handleAllowEdit({ id: item.id, startDate, endDate })
                        }
                      >
                        <EditIcon className={classes.icon} />
                      </ActionButton>
                    )}
                  </div>
                </BodyTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ConfirmationWindow
        maxWidth="sm"
        title={t('#confirmation.fyperiod.title')}
        description={t('#confirmation.fyperiod.description')}
        Icon={<TriangleWarningIcon className={classes.warningIcon} />}
        open={confirmationDialog.isOpen}
        handleClose={confirmationDialog.close}
        ApplyBtnProps={{
          label: t('#button.ok'),
          onClick: handleSave,
          loading: requestState.saving,
          disabled: requestState.saving,
        }}
        CancelBtnProps={{
          label: t('#button.cancel'),
          onClick: confirmationDialog.close,
        }}
      />
      <DialogError
        title={requestState.error?.title}
        error={requestState.error}
        initError={handleInitError}
      />
    </>
  );
};

export default GeneralInformationTable;
