import { useTranslation } from 'react-i18next';

import { dateTimeFormat } from 'utils/dates';

import CalendarIcon from 'components/Icons/CalendarIcon';

import clsx from 'clsx';
import { useStyles } from './style';

interface ModifiedInfoProps {
  className?: string;
  createdBy: string | null;
  createdOn: string | null;
  modifiedBy: string | null;
  modifiedOn: string | null;
}

const ModifiedInfo: React.FC<ModifiedInfoProps> = ({
  className,
  createdBy,
  createdOn,
  modifiedBy,
  modifiedOn,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={className}>
      <div className={clsx(classes.row, classes.offset)}>
        <CalendarIcon className={classes.icon} />
        {t('#tab.liabilities.createdon')}: &nbsp;
        <span className={classes.light}>
          {createdOn ? dateTimeFormat(new Date(createdOn)) : `—`}
        </span>
        &nbsp; {t('#common.by')} &nbsp;
        <span className={clsx(classes.light, classes.underline)}>
          {createdBy || '—'}
        </span>
      </div>
      <div className={clsx(classes.row)}>
        <CalendarIcon className={classes.icon} />
        {t('#tab.liabilities.modifiedon')}: &nbsp;
        <span className={classes.light}>
          {modifiedOn ? dateTimeFormat(new Date(modifiedOn)) : `—`}
        </span>
        &nbsp; {t('#common.by')} &nbsp;
        <span className={clsx(classes.underline, classes.light)}>
          {modifiedBy || '—'}
        </span>
      </div>
    </div>
  );
};

export default ModifiedInfo;
