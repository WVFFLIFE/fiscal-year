import { useState, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { setMonth, setYear, getMonth, getYear, Locale } from 'date-fns';
import { enGB } from 'date-fns/locale';

import Control, { CalendarViewType } from './ControlPanel';
import Calendar from 'components/Calendar';
import MonthsView from './MonthsView';
import DecadeView from './DecadeView';
import { ApplyButton, CancelButton } from 'components/Styled';

import { useStyles } from './style';

interface BodyProps {
  date: Date | null;
  locale?: Locale;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  onChange(date: Date | null): void;
  onClose(): void;
}

const Body: React.FC<BodyProps> = ({
  date,
  locale = enGB,
  onChange,
  onClose,
  disabled,
  max,
  min,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [tempDate, setTempDate] = useState(() => date || new Date());
  const [calendarView, setCalendarView] = useState<CalendarViewType>('days');

  const handleChangeCalendarView = (view: CalendarViewType) => {
    setCalendarView(view);
  };

  const handleChangeTempDate = (date: Date) => {
    setTempDate(date);
  };

  const handleChangeMonth = (monthDate: Date) => {
    setTempDate((prevDate) => setMonth(prevDate, getMonth(monthDate)));
    setCalendarView('days');
  };

  const handleChangeYear = (yearDate: Date) => {
    setTempDate((prevDate) => setYear(prevDate, getYear(yearDate)));
    setCalendarView('months');
  };

  const handleApply = () => {
    onChange(tempDate);
    onClose();
  };

  const handleCalendarKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleApply();
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.calendar}>
        <Control
          locale={locale}
          date={tempDate}
          calendarView={calendarView}
          onChangeDate={handleChangeTempDate}
          onChangeCalendarView={handleChangeCalendarView}
        />
        {calendarView === 'days' && (
          <Calendar
            date={tempDate}
            locale={locale}
            selectedDate={date}
            onChangeDate={handleChangeTempDate}
            maxDate={max}
            minDate={min}
            disabled={disabled}
            onKeyDown={handleCalendarKeyDown}
          />
        )}
        {calendarView === 'months' && (
          <MonthsView
            locale={locale}
            date={tempDate}
            onChangeMonth={handleChangeMonth}
          />
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
