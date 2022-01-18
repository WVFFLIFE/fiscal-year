import Tooltip from 'components/Tooltip';
import { RoundCheckIcon } from 'components/Icons';

import { defaultFormat, isBefore } from 'utils/dates';

import clsx from 'clsx';
import { useStyles } from './style';

interface MeetingDateProps {
  highlight(input: any): any;
  actualDate: string | null;
  plannedDate: string | null;
  link: string | null;
}

const MeetingDate: React.FC<MeetingDateProps> = ({
  link,
  highlight,
  actualDate,
  plannedDate,
}) => {
  const classes = useStyles();

  if (actualDate) {
    return (
      <Tooltip title={defaultFormat(new Date(actualDate))}>
        <RoundCheckIcon className={classes.checkIcon} />
      </Tooltip>
    );
  }

  if (plannedDate) {
    const pd = new Date(plannedDate);
    const isWarning = isBefore(pd, new Date());

    return (
      <a
        className={clsx(classes.date, {
          [classes.warning]: isWarning,
        })}
        href={link ?? undefined}
        target="_blank"
        rel="noopener noreferrer"
      >
        {highlight(defaultFormat(pd))}
      </a>
    );
  }

  return null;
};

export default MeetingDate;
