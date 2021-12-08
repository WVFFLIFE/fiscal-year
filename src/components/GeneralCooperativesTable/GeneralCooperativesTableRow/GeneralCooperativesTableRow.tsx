import { memo, useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { ExtendedCooperativeModel } from 'models';
import { defaultFormat } from 'utils/dates';
import { getText } from 'utils/search';

import MeetingDate from '../MeetingDate';
import Box from '@mui/material/Box';
import Input from 'components/Input';
import { BodyTableCell, BodyTableRow, IconButton } from 'components/Styled';
import { IcList, CalendarIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

function isEmptyDate(cooperative: ExtendedCooperativeModel) {
  return (
    (!cooperative.BoardMeetingActualDate &&
      !cooperative.BoardMeetingPlannedDate) ||
    (!cooperative.AuditingActualDate && !cooperative.AuditingPlannedDate) ||
    (!cooperative.GeneralMeetingActualDate &&
      !cooperative.GeneralMeetingPlannedDate)
  );
}

interface GeneralCooperativesTableRowPropsModel {
  searchTerm: string;
  cooperative: ExtendedCooperativeModel;
  onSelectCooperative(cooperative: ExtendedCooperativeModel): void;
  saveComment(fyId: string, comment: string): Promise<void>;
}

const GeneralCooperativesTableRow: React.FC<GeneralCooperativesTableRowPropsModel> =
  ({ searchTerm, cooperative, onSelectCooperative, saveComment }) => {
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

    const handleHoverRow = () => {
      setIsCommentFieldActive(true);
    };

    const handleHoverRowOut = () => {
      setIsCommentFieldActive(false);
      setFyComment(cooperative.FiscalYearComments || '');
    };

    const handleSaveComment = async () => {
      if (hasUnsavedComment && cooperative.FiscalYearId) {
        await saveComment(cooperative.FiscalYearId, fyComment);
        setIsCommentFieldActive(false);
      }
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

    const highlight = getText(searchTerm);

    return (
      <BodyTableRow
        className={clsx({
          [classes.rowBorder]: isEmptyDate(cooperative),
        })}
        hover
        onMouseEnter={
          cooperative.IsFiscalYearClosed ? undefined : handleHoverRow
        }
        onMouseLeave={
          cooperative.IsFiscalYearClosed ? undefined : handleHoverRowOut
        }
      >
        <BodyTableCell className={clsx(classes.cell, classes.bold)}>
          <Box className={classes.box}>
            {cooperative.IsFiscalYearDoesNotMatchCalendar ? (
              <CalendarIcon
                className={clsx(classes.icon, classes.calendarIcon)}
              />
            ) : (
              <div className={classes.mockIcon}></div>
            )}
            {highlight(cooperative.Name)}
          </Box>
        </BodyTableCell>
        <BodyTableCell className={clsx(classes.cell, classes.bold)}>
          {cooperative.LatestClosedDate &&
            highlight(defaultFormat(new Date(cooperative.LatestClosedDate)))}
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
        <BodyTableCell className={classes.cell} align="center">
          <MeetingDate
            highlight={highlight}
            actualDate={cooperative.BoardMeetingActualDate}
            plannedDate={cooperative.BoardMeetingPlannedDate}
          />
        </BodyTableCell>
        <BodyTableCell className={classes.cell} align="center">
          <MeetingDate
            highlight={highlight}
            actualDate={cooperative.AuditingActualDate}
            plannedDate={cooperative.AuditingPlannedDate}
          />
        </BodyTableCell>
        <BodyTableCell className={classes.cell} align="center">
          <MeetingDate
            highlight={highlight}
            actualDate={cooperative.GeneralMeetingActualDate}
            plannedDate={cooperative.GeneralMeetingPlannedDate}
          />
        </BodyTableCell>
        <BodyTableCell className={classes.cell}>
          {isCommentFieldActive ? (
            <Input
              defaultValue={cooperative.FiscalYearComments}
              value={fyComment}
              onChange={handleChangeComment}
              onBlur={handleSaveComment}
              onKeyDown={handleInputKeyDown}
            />
          ) : (
            <div className={classes.disabledInput}>{highlight(fyComment)}</div>
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
