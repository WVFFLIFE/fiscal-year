import { FiscalYearModel, CommonCooperativeModel } from 'models';
import { useTranslation } from 'react-i18next';
import { defaultFormat } from 'utils/dates';

import { IconButton } from 'components/Styled';
import { ListBulletsIcon } from 'components/Icons';

import { useStyles } from './style';

interface SelectedInfoProps {
  fiscalYear: FiscalYearModel;
  selectedCooperative: CommonCooperativeModel;
  backwardToSummaryPage(): void;
}

const SelectedInfo: React.FC<SelectedInfoProps> = ({
  selectedCooperative,
  fiscalYear,
  backwardToSummaryPage,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const start = defaultFormat(new Date(fiscalYear.StartDate));
  const end = defaultFormat(new Date(fiscalYear.EndDate));

  return (
    <div className={classes.root}>
      <IconButton className={classes.iconBtn} onClick={backwardToSummaryPage}>
        <ListBulletsIcon className={classes.icon} />
      </IconButton>
      {selectedCooperative.Name}
      <span className={classes.divider}></span>
      {t('#common.fiscalyear')} {start} - {end}
    </div>
  );
};

export default SelectedInfo;
