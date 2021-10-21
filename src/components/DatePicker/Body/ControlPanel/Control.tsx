import { localeFormat, getYearsList } from 'utils';
import { addMonths, addYears, subMonths, subYears } from 'date-fns/esm';

import Button from '@mui/material/Button';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  DoubleArrowsLeftIcon,
  DoubleArrowsRightIcon,
} from 'components/Icons';
import { SmallIconButton } from 'components/Styled';

import { useStyles } from './style';

export type CalendarViewType = 'days' | 'months' | 'decade';

interface ControlPanelProps {
  date: Date | null;
  calendarView: CalendarViewType;
  onChangeDate(date: Date): void;
  onChangeCalendarView(view: CalendarViewType): void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  date,
  calendarView,
  onChangeDate,
  onChangeCalendarView,
}) => {
  const classes = useStyles();

  const tempDate = date || new Date();

  const renderDaysView = () => {
    return (
      <Button
        className={classes.textBtn}
        onClick={() => onChangeCalendarView('months')}
      >
        {localeFormat(tempDate, 'MMMM yyyy')}
      </Button>
    );
  };

  const renderMonthsView = () => {
    return (
      <Button
        className={classes.textBtn}
        onClick={() => onChangeCalendarView('decade')}
      >
        {localeFormat(tempDate, 'yyyy')}
      </Button>
    );
  };

  const renderDecadeView = () => {
    const yyyy = tempDate.getFullYear();
    const yearsList = getYearsList(yyyy - 9, yyyy);

    return (
      <Button
        className={classes.textBtn}
        onClick={() => onChangeCalendarView('days')}
      >{`${yearsList[0]} - ${yearsList[yearsList.length - 1]}`}</Button>
    );
  };

  const handleClickLeftArrow = () => {
    if (calendarView === 'days') {
      onChangeDate(subMonths(tempDate, 1));
      return;
    }

    if (calendarView === 'months' || calendarView === 'decade') {
      onChangeDate(subYears(tempDate, 1));
      return;
    }
  };

  const handleClickLeftDoubleArrows = () => {
    if (calendarView === 'days') {
      onChangeDate(subYears(tempDate, 1));
      return;
    }

    if (calendarView === 'months' || calendarView === 'decade') {
      onChangeDate(subYears(tempDate, 10));
      return;
    }
  };

  const handleClickRightArrow = () => {
    if (calendarView === 'days') {
      onChangeDate(addMonths(tempDate, 1));
      return;
    }

    if (calendarView === 'months' || calendarView === 'decade') {
      onChangeDate(addYears(tempDate, 1));
      return;
    }
  };

  const handleClickRightDoubleArrows = () => {
    if (calendarView === 'days') {
      onChangeDate(addYears(tempDate, 1));
      return;
    }

    if (calendarView === 'months' || calendarView === 'decade') {
      onChangeDate(addYears(tempDate, 10));
      return;
    }
  };

  return (
    <div className={classes.flex}>
      <SmallIconButton onClick={handleClickLeftDoubleArrows}>
        <DoubleArrowsLeftIcon className={classes.icon} />
      </SmallIconButton>
      <SmallIconButton onClick={handleClickLeftArrow}>
        <ArrowLeftIcon className={classes.icon} />
      </SmallIconButton>
      <div className={classes.textWrapper}>
        {calendarView === 'days' && renderDaysView()}
        {calendarView === 'months' && renderMonthsView()}
        {calendarView === 'decade' && renderDecadeView()}
      </div>
      <SmallIconButton onClick={handleClickRightArrow}>
        <ArrowRightIcon className={classes.icon} />
      </SmallIconButton>
      <SmallIconButton onClick={handleClickRightDoubleArrows}>
        <DoubleArrowsRightIcon className={classes.icon} />
      </SmallIconButton>
    </div>
  );
};

export default ControlPanel;
