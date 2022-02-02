import { KeyboardEvent, useEffect, useRef, HTMLProps, useMemo } from 'react';
import {
  getDate,
  addDays,
  subDays,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
  isValid,
  Locale,
} from 'date-fns';
import { enGB } from 'date-fns/locale';

import { getShortWeeks, getWeeks } from './utils';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

export interface CalendarProps extends HTMLProps<HTMLDivElement> {
  /**
   * Date-fns locale is used for displaying localized labels
   * @default enGB
   */
  locale?: Locale;
  /**
   * Date for rendering calendar view
   */
  date: Date | null;
  /**
   * Selected date in calendar
   */
  selectedDate: Date | null;
  /**
   * Min selectable date
   */
  minDate?: Date;
  /**
   * Max selectable date
   */
  maxDate?: Date;
  /**
   * If `true` the picker is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback fired when the value (selected date) changes
   * @param date
   */
  onChangeDate(date: Date | null): void;
}

const Calendar: React.FC<CalendarProps> = ({
  className,
  locale = enGB,
  date,
  selectedDate,
  minDate,
  maxDate,
  disabled,
  onChangeDate,
  ...rest
}) => {
  const classes = useStyles();
  const pickedRef = useRef<HTMLButtonElement>(null);

  const defaultDate = date && isValid(date) ? date : new Date();
  const weeks = getWeeks(defaultDate);

  const weeksShort = useMemo(() => getShortWeeks(locale), [locale]);

  useEffect(() => {
    if (pickedRef.current) {
      pickedRef.current.focus();
    }
  }, [date]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    let d = startOfDay(defaultDate);

    if (e.key.includes('Arrow') || e.key === 'Enter') {
      e.preventDefault();
    }

    if (e.key === 'ArrowUp') {
      onChangeDate(subDays(d, 7));
      return;
    }

    if (e.key === 'ArrowDown') {
      onChangeDate(addDays(d, 7));
      return;
    }

    if (e.key === 'ArrowLeft') {
      onChangeDate(subDays(d, 1));
      return;
    }

    if (e.key === 'ArrowRight') {
      onChangeDate(addDays(d, 1));
      return;
    }
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.shortWeeksWrapper}>
        {weeksShort.map((weekShort) => (
          <div key={weekShort} className={classes.box}>
            <span className={classes.weekShort}>{weekShort}</span>
          </div>
        ))}
      </div>
      <div onKeyDown={handleKeyDown}>
        {weeks.map((week, idx) => {
          return (
            <div key={idx} className={classes.row} role="presentation">
              {week.map((day) => {
                const currentMonth = isSameMonth(defaultDate, day),
                  selected = selectedDate
                    ? isSameDay(selectedDate, day)
                    : false,
                  picked = isSameDay(defaultDate, day),
                  today = isToday(day);

                return (
                  <Button
                    disableFocusRipple
                    tabIndex={picked ? 0 : -1}
                    ref={picked ? pickedRef : undefined}
                    key={day.toDateString()}
                    onClick={
                      disabled || selected ? undefined : () => onChangeDate(day)
                    }
                    className={clsx(classes.box, classes.dayBox, {
                      [classes.notCurrentMonth]: !currentMonth,
                      [classes.today]: today,
                      [classes.picked]: picked,
                      [classes.selectedDay]: selected,
                    })}
                  >
                    <span className={classes.day}>{getDate(day)}</span>
                  </Button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
