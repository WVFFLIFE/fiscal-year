import { isWithinInterval } from 'utils/dates';

export function getOverlapingField(
  startDate: Date,
  endDate: Date,
  intersectPeriodStartDate: Date,
  intersectPeriodEndDate: Date
) {
  const isWithinIntervalStartDate = isWithinInterval(startDate, {
    start: intersectPeriodStartDate,
    end: intersectPeriodEndDate,
  });

  const isWithinIntervalEndDate = isWithinInterval(endDate, {
    start: intersectPeriodStartDate,
    end: intersectPeriodEndDate,
  });

  if (isWithinIntervalStartDate && isWithinIntervalEndDate) {
    return 'both';
  }

  if (isWithinIntervalStartDate) {
    return 'startDate';
  }

  if (isWithinIntervalEndDate) {
    return 'endDate';
  }

  return null;
}
