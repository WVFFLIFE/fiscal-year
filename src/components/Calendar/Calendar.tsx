import { KeyboardEvent, useState, useEffect, useRef, HTMLProps } from 'react';
import {
  getDaysInMonth,
  getDate,
  startOfWeek,
  format,
  addDays,
  subDays,
  isSameMonth,
  isSameDay,
  isToday,
  startOfDay,
} from 'date-fns';
import { getLocale } from 'utils';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

function getShortWeeks() {
  const locale = getLocale();
  const firstDOW = startOfWeek(new Date(), { weekStartsOn: 1 });

  return Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDOW, i), 'EEEEEE', { locale })
  );
}

const DAYS_IN_WEEK = 7;
const weeksShort = getShortWeeks();

function getDays(date: Date) {
  let daysInMonth = getDaysInMonth(date);
  let days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return days;
}

function cloneDate(date: Date) {
  return new Date(date.getTime());
}

function getWeeks(
  date: Date,
  { firstDayOfWeek = 1, forceSixRows = false } = {}
) {
  let days = getDays(date);
  let daysInMonth = days.length;
  let week: Date[] = [];
  let weeks: typeof week[] = [];

  // build weeks array
  days.forEach((day) => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
    if (days.indexOf(day) === days.length - 1) {
      weeks.push(week);
    }
  });

  const firstWeek = weeks[0];
  for (let i = DAYS_IN_WEEK - firstWeek.length; i > 0; i--) {
    const outsideDate = cloneDate(firstWeek[0]);
    outsideDate.setDate(firstWeek[0].getDate() - 1);
    firstWeek.unshift(outsideDate);
    daysInMonth++;
  }

  const lastWeek = weeks[weeks.length - 1];
  for (let i = lastWeek.length; i < DAYS_IN_WEEK; i++) {
    const outsideDate = cloneDate(lastWeek[lastWeek.length - 1]);
    outsideDate.setDate(lastWeek[lastWeek.length - 1].getDate() + 1);
    lastWeek.push(outsideDate);
    daysInMonth++;
  }

  if (forceSixRows && daysInMonth < 42) {
    let lastDayOfMonth = weeks[weeks.length - 1][6];
    let lastWeek = [];
    let index = 1;
    while (daysInMonth < 42) {
      let lastDayOfMonthClone = cloneDate(lastDayOfMonth);
      let day = new Date(
        lastDayOfMonthClone.setDate(lastDayOfMonthClone.getDate() + index)
      );
      if (lastWeek.length > 0 && day.getDay() === firstDayOfWeek) {
        weeks.push(lastWeek);
        lastWeek = [];
      }
      lastWeek.push(day);
      daysInMonth++;
      index++;
    }
    weeks.push(lastWeek);
  }

  return weeks;
}

export interface CalendarProps extends HTMLProps<HTMLDivElement> {
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

  const defaultDate = date || new Date();
  const weeks = getWeeks(defaultDate);

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
