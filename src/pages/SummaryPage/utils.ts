import {
  eachYearOfInterval,
  startOfYear,
  endOfYear,
  subYears,
} from 'utils/dates';
import { CalendarYearOption } from 'models';

export function buildCalendarYearOptions(
  start: Date,
  end: Date
): CalendarYearOption[] {
  return eachYearOfInterval({ start, end })
    .reverse()
    .map((date) => ({
      start: startOfYear(date),
      end: endOfYear(date),
    }));
}

export function getDefaultCalendarYear(): CalendarYearOption {
  const prevYear = subYears(new Date(), 1);

  return {
    start: startOfYear(prevYear),
    end: endOfYear(prevYear),
  };
}
