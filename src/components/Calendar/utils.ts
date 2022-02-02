import enGB from 'date-fns/locale/en-GB';
import startOfWeek from 'date-fns/startOfWeek';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import getDaysInMonth from 'date-fns/getDaysInMonth';

export function getShortWeeks(locale: Locale = enGB) {
  const firstDOW = startOfWeek(new Date(), { weekStartsOn: 1 });

  return Array.from(Array(7)).map((e, i) =>
    format(addDays(firstDOW, i), 'EEEEEE', { locale })
  );
}

export function getDays(date: Date) {
  let daysInMonth = getDaysInMonth(date);
  let days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(date.getFullYear(), date.getMonth(), i));
  }
  return days;
}

export function cloneDate(date: Date) {
  return new Date(date.getTime());
}

export function getWeeks(
  date: Date,
  { firstDayOfWeek = 1, forceSixRows = false, daysInWeek = 7 } = {}
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
  for (let i = daysInWeek - firstWeek.length; i > 0; i--) {
    const outsideDate = cloneDate(firstWeek[0]);
    outsideDate.setDate(firstWeek[0].getDate() - 1);
    firstWeek.unshift(outsideDate);
    daysInMonth++;
  }

  const lastWeek = weeks[weeks.length - 1];
  for (let i = lastWeek.length; i < daysInWeek; i++) {
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
