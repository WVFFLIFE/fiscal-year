import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonCooperativeModel, CalendarYearOption } from 'models';
import { isAllMyOwn } from 'utils';
import { defaultFormat } from 'utils/dates';

import clsx from 'clsx';
import { useStyles } from './style';

interface ContainerTopBarProps {
  className?: string;
  cooperatives: CommonCooperativeModel[];
  selectedCooperatives: CommonCooperativeModel[];
  selectedCalendarYear: CalendarYearOption | null;
}

const ContainerTopBar: React.FC<ContainerTopBarProps> = ({
  className,
  cooperatives,
  selectedCalendarYear,
  selectedCooperatives,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const coopsLabel = useMemo(() => {
    if (!selectedCooperatives.length) return null;
    if (selectedCooperatives.length === 1) {
      const [coop] = selectedCooperatives;
      return coop.Name;
    }
    if (isAllMyOwn(cooperatives, selectedCooperatives)) {
      return t('#common.allmyowncooperatives');
    }

    return t('#common.selectedcooperatives', {
      count: selectedCooperatives.length,
    });
  }, [t, selectedCooperatives, cooperatives]);

  return (
    <div className={clsx(classes.root, classes.text, className)}>
      {coopsLabel}{' '}
      {selectedCalendarYear && (
        <>
          <span className={classes.divider}></span>{' '}
          {defaultFormat(selectedCalendarYear.start)}
          {' - '}
          {defaultFormat(selectedCalendarYear.end)}
        </>
      )}
    </div>
  );
};

export default ContainerTopBar;
