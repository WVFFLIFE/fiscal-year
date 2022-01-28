import { defaultFormat, isBefore, startOfDay } from 'utils/dates';

import Highlight from 'components/Highlight';
import Tooltip from 'components/Tooltip';
import { RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface MeetingDateProps {
  actualDate: string | null;
  plannedDate: string | null;
  link: string | null;
}

const MeetingDate: React.FC<MeetingDateProps> = ({
  link,
  actualDate,
  plannedDate: plannedDateStr,
}) => {
  const classes = useStyles();

  if (actualDate) {
    return (
      <div className={classes.centered}>
        <Tooltip title={defaultFormat(new Date(actualDate))}>
          <RoundCheckIcon className={classes.checkIcon} />
        </Tooltip>
      </div>
    );
  }

  if (plannedDateStr) {
    const plannedDate = new Date(plannedDateStr);
    const isWarning = isBefore(plannedDate, startOfDay(new Date()));

    return (
      <a
        className={clsx(classes.date, {
          [classes.warning]: isWarning,
        })}
        href={link ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Highlight text={defaultFormat(plannedDate)} />
      </a>
    );
  }

  return null;
};

export default MeetingDate;
