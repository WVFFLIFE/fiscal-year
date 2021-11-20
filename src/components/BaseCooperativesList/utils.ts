import { eachYearOfInterval, startOfYear, endOfYear } from 'date-fns';
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
