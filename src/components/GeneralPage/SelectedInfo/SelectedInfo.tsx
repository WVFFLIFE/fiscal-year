import { FiscalYearModel, CommonCooperativeModel } from 'models';
import { useTranslation } from 'react-i18next';
import { defaultFormat } from 'utils/dates';

import { useStyles } from './style';

interface SelectedInfoProps {
  fiscalYear: FiscalYearModel;
  selectedCooperative: CommonCooperativeModel;
}

const SelectedInfo: React.FC<SelectedInfoProps> = ({
  selectedCooperative,
  fiscalYear,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const start = defaultFormat(new Date(fiscalYear.StartDate));
  const end = defaultFormat(new Date(fiscalYear.EndDate));

  return (
    <div className={classes.root}>
      {selectedCooperative.Name}
      <span className={classes.divider}></span>
      {t('#common.fiscalyear')} {start} - {end}
    </div>
  );
};

export default SelectedInfo;
