import { useTranslation } from 'react-i18next';

import { RoundCheckIcon } from 'components/Icons';
import ActionButton from 'components/ActionButton';

import { useStyles } from './style';

interface SuccessDialogViewProps {
  text: string;
  onClose?(): void;
}

const SuccessDialogView: React.FC<SuccessDialogViewProps> = ({
  text,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <RoundCheckIcon className={classes.icon} />
      <p className={classes.description}>{text}</p>
      {onClose && (
        <div className={classes.btnsWrapper} onClick={onClose}>
          <ActionButton palette="darkBlue">{t('#button.ok')}</ActionButton>
        </div>
      )}
    </div>
  );
};

export default SuccessDialogView;
