import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { setMonth, setYear } from 'date-fns';

import Control, { CalendarViewType } from './ControlPanel';
import Calendar, { CalendarProps } from 'components/Calendar';
import MonthsView from './MonthsView';
import DecadeView from './DecadeView';
import { ApplyButton, CancelButton } from 'components/Styled';

import { useStyles } from './style';

interface BodyProps extends CalendarProps {
  onClose(): void;
}

const Body: React.FC<BodyProps> = ({
  date,
  onChange,
  onClose,
  disabled,
  max,
  min,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [tempDate, setTempDate] = useState(() => date);
  const [calendarView, setCalendarView] = useState<CalendarViewType>('days');

  const handleChangeCalendarView = (view: CalendarViewType) => {
    setCalendarView(view);
  };

  const handleChangeTempDate = (date: Date) => {
    setTempDate(date);
  };

  const handleChangeMonth = (month: number) => {
    setTempDate((prevDate) => setMonth(prevDate || new Date(), month));
    setCalendarView('days');
  };

  const handleChangeYear = (year: number) => {
    setTempDate((prevDate) => setYear(prevDate || new Date(), year));
  };

  const handleApply = () => {
    onChange(tempDate);
    onClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.calendar}>
        <Control
          date={tempDate}
          calendarView={calendarView}
          onChangeDate={handleChangeTempDate}
          onChangeCalendarView={handleChangeCalendarView}
        />
        {calendarView === 'days' && (
          <Calendar
            date={tempDate}
            onChange={handleChangeTempDate}
            max={max}
            min={min}
            disabled={disabled}
          />
        )}
        {calendarView === 'months' && (
          <MonthsView onChangeMonth={handleChangeMonth} />
        )}
        {calendarView === 'decade' && (
          <DecadeView date={tempDate} onChangeYear={handleChangeYear} />
        )}
      </div>
      <div className={classes.btnsWrapper}>
        <CancelButton className={classes.cancelBtn} onClick={onClose}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton onClick={handleApply}>{t('#button.apply')}</ApplyButton>
      </div>
    </div>
  );
};

export default Body;
