import { memo, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { ExtendedCooperativeModel } from 'models';
import { defaultFormat, isBefore, startOfDay } from 'utils/dates';

import MeetingDate from '../MeetingDate';
import Highlight from 'components/Highlight';
import Box from '@mui/material/Box';
import Input from 'components/Input';
import Tooltip from 'components/Tooltip';
import { BodyTableCell, BodyTableRow, IconButton } from 'components/Styled';
import { IcList, CalendarIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

function hasError(actualDate: string | null, plannedDate: string | null) {
  if (!actualDate) {
    if (!plannedDate) return true;
    if (isBefore(new Date(plannedDate), startOfDay(new Date()))) {
      return true;
    }
  }

  return false;
}

function isEmptyDate(cooperative: ExtendedCooperativeModel) {
  return (
    !cooperative.BoardMeetingActualDate &&
    !cooperative.BoardMeetingPlannedDate &&
    !cooperative.AuditDoneDate &&
    !cooperative.AuditReturnNeededDate &&
    !cooperative.GeneralMeetingActualDate &&
    !cooperative.GeneralMeetingPlannedDate
  );
}

function hasErrorInCooperative(cooperative: ExtendedCooperativeModel) {
  return (
    isEmptyDate(cooperative) ||
    hasError(cooperative.AuditDoneDate, cooperative.AuditReturnNeededDate) ||
    hasError(
      cooperative.BoardMeetingActualDate,
      cooperative.BoardMeetingPlannedDate
    ) ||
    hasError(
      cooperative.GeneralMeetingActualDate,
      cooperative.GeneralMeetingPlannedDate
    )
  );
}

interface GeneralCooperativesTableRowPropsModel {
  cooperative: ExtendedCooperativeModel;
  onSelectCooperative(cooperative: ExtendedCooperativeModel): void;
  saveComment(fyId: string, comment: string): Promise<void>;
}

const GeneralCooperativesTableRow: React.FC<
  GeneralCooperativesTableRowPropsModel
> = ({ cooperative, onSelectCooperative, saveComment }) => {
  const classes = useStyles();

  const [fyComment, setFyComment] = useState(
    cooperative.FiscalYearComments || ''
  );
  const [isCommentFieldActive, setIsCommentFieldActive] = useState(false);

  useEffect(() => {
    setFyComment(cooperative.FiscalYearComments || '');
  }, [cooperative]);

  const hasUnsavedComment =
    fyComment !== (cooperative.FiscalYearComments || '');

  const handleSaveComment = async () => {
    if (hasUnsavedComment && cooperative.FiscalYearId) {
      await saveComment(cooperative.FiscalYearId, fyComment);
      setIsCommentFieldActive(false);
    }
  };

  const handleHoverRow = () => {
    setIsCommentFieldActive(true);
  };

  const handleHoverRowOut = async () => {
    if (hasUnsavedComment) {
      await handleSaveComment();
    }

    setIsCommentFieldActive(false);
    setFyComment(cooperative.FiscalYearComments || '');
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setFyComment(value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      handleSaveComment();
    }
  };

  const fiscalYearDateString =
    cooperative.FiscalYearStartDate && cooperative.FiscalYearEndDate
      ? `${defaultFormat(
          new Date(cooperative.FiscalYearStartDate)
        )} - ${defaultFormat(new Date(cooperative.FiscalYearEndDate))}`
      : '';
  return (
    <BodyTableRow
      className={clsx({
        [classes.rowBorder]: hasErrorInCooperative(cooperative),
      })}
      hover={!!!cooperative.IsFiscalYearClosed}
      onMouseEnter={cooperative.IsFiscalYearClosed ? undefined : handleHoverRow}
      onMouseLeave={
        cooperative.IsFiscalYearClosed ? undefined : handleHoverRowOut
      }
    >
      <BodyTableCell className={clsx(classes.cell, classes.bold)}>
        <Box className={classes.box}>
          {cooperative.IsFiscalYearDoesNotMatchCalendar ? (
            <Tooltip title={fiscalYearDateString}>
              <CalendarIcon
                className={clsx(classes.icon, classes.calendarIcon)}
              />
            </Tooltip>
          ) : (
            <div className={classes.mockIcon}></div>
          )}
          <Highlight text={cooperative.Name} />
        </Box>
      </BodyTableCell>
      <BodyTableCell className={clsx(classes.cell, classes.bold)} align="left">
        {cooperative.LatestClosedDate && (
          <Highlight
            text={defaultFormat(new Date(cooperative.LatestClosedDate))}
          />
        )}
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="center">
        {cooperative.IsFinancialCalculationsAccepted && (
          <RoundCheckIcon className={classes.acceptIcon} />
        )}
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="center">
        {cooperative.IsFiscalYearClosed && (
          <RoundCheckIcon className={classes.acceptIcon} />
        )}
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="right">
        <MeetingDate
          link={cooperative.BoardMeetingLink}
          actualDate={cooperative.BoardMeetingActualDate}
          plannedDate={cooperative.BoardMeetingPlannedDate}
        />
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="right">
        <MeetingDate
          link={cooperative.AuditMeetingLink}
          actualDate={cooperative.AuditDoneDate}
          plannedDate={cooperative.AuditReturnNeededDate}
        />
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="right">
        <MeetingDate
          link={cooperative.GeneralMeetingLink}
          actualDate={cooperative.GeneralMeetingActualDate}
          plannedDate={cooperative.GeneralMeetingPlannedDate}
        />
      </BodyTableCell>
      <BodyTableCell className={classes.cell} align="left">
        {isCommentFieldActive ? (
          <Input
            value={fyComment}
            onChange={handleChangeComment}
            onBlur={handleSaveComment}
            onKeyDown={handleInputKeyDown}
          />
        ) : (
          <div className={classes.disabledInput}>
            <Highlight text={fyComment} />
          </div>
        )}
      </BodyTableCell>
      <BodyTableCell className={classes.cell}>
        <IconButton
          className={classes.actionBtn}
          onClick={() => onSelectCooperative(cooperative)}
        >
          <IcList className={classes.icon} />
        </IconButton>
      </BodyTableCell>
    </BodyTableRow>
  );
};

export default memo(GeneralCooperativesTableRow);
