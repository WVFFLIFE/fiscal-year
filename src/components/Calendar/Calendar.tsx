import { KeyboardEvent, useRef } from 'react';
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
import { enGB, fi } from 'date-fns/locale';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

function getLocale() {
  return window.USER_LANGUAGE_CODE === 1035 ? fi : enGB;
}

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

export interface CalendarProps {
  /**
   * className applied to root element
   */
  className?: string;
  /**
   * Selected date in calendar
   */
  date: Date | null;
  /**
   * Min selectable date
   */
  min?: Date;
  /**
   * Max selectable date
   */
  max?: Date;
  /**
   * If `true` the picker is disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * Callback fired when the value (selected date) changes
   * @param date
   */
  onChange(date: Date | null): void;
}

const Calendar: React.FC<CalendarProps> = ({
  className,
  date,
  min,
  max,
  disabled,
  onChange,
}) => {
  const classes = useStyles();

  const defaultDate = date || new Date();

  const weeks = getWeeks(defaultDate);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    e.preventDefault();

    let d = startOfDay(defaultDate);

    if (e.key === 'ArrowUp') {
      onChange(subDays(d, 7));
      return;
    }

    if (e.key === 'ArrowDown') {
      onChange(addDays(d, 7));
      return;
    }

    if (e.key === 'ArrowLeft') {
      onChange(subDays(d, 1));
      return;
    }

    if (e.key === 'ArrowRight') {
      onChange(addDays(d, 1));
      return;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className={clsx(classes.root, className)}>
      <div className={classes.shortWeeksWrapper}>
        {weeksShort.map((weekShort) => (
          <div key={weekShort} className={classes.box}>
            <span className={classes.weekShort}>{weekShort}</span>
          </div>
        ))}
      </div>
      <div>
        {weeks.map((week, idx) => {
          return (
            <div key={idx} className={classes.row} role="presentation">
              {week.map((day) => {
                const currentMonth = isSameMonth(defaultDate, day),
                  selected = date ? isSameDay(date, day) : false,
                  today = isToday(day);

                return (
                  <Button
                    key={day.toDateString()}
                    tabIndex={0}
                    onClick={
                      disabled || selected ? undefined : () => onChange(day)
                    }
                    className={clsx(classes.box, classes.dayBox, {
                      [classes.notCurrentMonth]: !currentMonth,
                      [classes.today]: today,
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
