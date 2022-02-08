import { useTranslation } from 'react-i18next';
import useCopyData from './useCopyData';

import FiscalYearPicker from 'components/FiscalYearPicker';
import InfoIcon from 'components/Icons/InfoIcon';
import ActionButton from 'components/ActionButton';
import { BtnLoader } from 'components/Styled';
import DialogError from 'components/DialogError';

import { useStyles } from './style';

interface CopyExistingViewProps {
  onClose(): void;
}

const CopyExistingView: React.FC<CopyExistingViewProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    fiscalYearsList,
    requestState,
    handleChangeFiscalYear,
    handleCreateFromSource,
    handleResetError,
    selectedFiscalYear,
  } = useCopyData(onClose);

  const isDisabledCreateBtn = !!!selectedFiscalYear || requestState.loading;

  return (
    <div>
      <h2 className={classes.title}>{t('#common.copyfiscalyear')}</h2>
      <div className={classes.iconWrapper}>
        <InfoIcon className={classes.infoIcon} />
      </div>
      <p className={classes.description}>
        {t('#confirmation.copy.description')}
      </p>
      <FiscalYearPicker
        value={selectedFiscalYear}
        options={fiscalYearsList}
        onSelectFiscalYear={handleChangeFiscalYear}
      />
      <div className={classes.btnsWrapper}>
        <ActionButton className={classes.cancelBtn} onClick={onClose}>
          {t('#button.cancel')}
        </ActionButton>
        <ActionButton
          disabled={isDisabledCreateBtn}
          palette="darkBlue"
          onClick={handleCreateFromSource}
          endIcon={requestState.loading ? <BtnLoader size={17} /> : undefined}
        >
          {t('#button.copy')}
        </ActionButton>
      </div>
      <DialogError error={requestState.error} initError={handleResetError} />
    </div>
  );
};

export default CopyExistingView;
