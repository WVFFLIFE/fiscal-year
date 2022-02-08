import { memo } from 'react';
import { FiscalYearModel, CommonCooperativeModel } from 'models';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import { selectCooperativeLink } from 'selectors/generalPageSelectors';
import { defaultFormat } from 'utils/dates';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';

import Box from '@mui/material/Box';
import { IconButton } from 'components/Styled';
import { ListBulletsIcon } from 'components/Icons';
import AnnualReport from './AnnualReport';
import CreateEvent from './CreateEvent';
import Tooltip from 'components/Tooltip';
import UnsavedChanges from 'components/Tabs/UnsavedChanges';

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

  const cooperativeLink = useStateSelector(selectCooperativeLink);

  const [unsavedChangesDialogOpen, toggleUnsavedChangesDialogVisibility] =
    useToggleSwitch();

  const handleClickBackBtn = () => {
    if (unsavedChangesTracker.hasUnsavedChanges) {
      unsavedChangesTracker.setPendingAction(backwardToSummaryPage);
      toggleUnsavedChangesDialogVisibility();
    } else {
      backwardToSummaryPage();
    }
  };

  const start = defaultFormat(new Date(fiscalYear.StartDate));
  const end = defaultFormat(new Date(fiscalYear.EndDate));

  return (
    <div className={classes.root}>
      <div className={classes.leftSide}>
        <Tooltip title={t('#common.summary') as string} arrow>
          <IconButton className={classes.iconBtn} onClick={handleClickBackBtn}>
            <ListBulletsIcon className={classes.icon} />
          </IconButton>
        </Tooltip>
        <a
          className={classes.link}
          href={cooperativeLink}
          target="_blank"
          rel="noreferrer"
        >
          {selectedCooperative.Name}
          <span className={classes.divider}></span>
          {t('#common.fiscalyear')} {start} - {end}
        </a>
      </div>
      <div className={classes.rightSide}>
        <Box marginRight="20px">
          <CreateEvent />
        </Box>
        <AnnualReport />
      </div>
      <UnsavedChanges
        open={unsavedChangesDialogOpen}
        onClose={toggleUnsavedChangesDialogVisibility}
      />
    </div>
  );
};

export default memo(SelectedInfo);
