import useCopyDialogData from './useCopyDialogData';
import { useTranslation } from 'react-i18next';

import FiscalYearPicker from 'components/FiscalYearPicker';
import InfoIcon from 'components/Icons/InfoIcon';
import ActionButton from 'components/ActionButton';
import { BtnLoader } from 'components/Styled';

import { useStyles } from './style';

interface CopyDialogBodyProps {
  onClose(): void;
}

const CopyDialogBody: React.FC<CopyDialogBodyProps> = ({ onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    hasPreviousFiscalYear,
    fiscalYearsList,
    requestState,
    selectedFiscalYear,
    handleChangeFiscalYear,
    handleCreateFromSource,
  } = useCopyDialogData({ onClose });

  const isDisabledCreateBtn =
    !!!selectedFiscalYear || requestState.creating || !hasPreviousFiscalYear;

  return (
    <div>
      <h2 className={classes.title}>{t('#dialog.copyfyfromexisting.title')}</h2>
      <div className={classes.iconWrapper}>
        <InfoIcon className={classes.infoIcon} />
      </div>
      <p className={classes.description}>
        {t('#dialog.copyfyfromexisting.description')}
      </p>
      <FiscalYearPicker
        value={selectedFiscalYear}
        options={fiscalYearsList}
        onSelectFiscalYear={handleChangeFiscalYear}
        disabled={!hasPreviousFiscalYear}
      />
      <div className={classes.btnsWrapper}>
        <ActionButton className={classes.cancelBtn} onClick={onClose}>
          {t('#button.cancel')}
        </ActionButton>
        <ActionButton
          disabled={isDisabledCreateBtn}
          palette="darkBlue"
          onClick={handleCreateFromSource}
          endIcon={requestState.creating ? <BtnLoader size={17} /> : undefined}
        >
          {t('#button.create')}
        </ActionButton>
      </div>
    </div>
  );
};

export default CopyDialogBody;
