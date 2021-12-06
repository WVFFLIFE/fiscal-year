import { useTranslation } from 'react-i18next';

import { ErrorOutlineIcon } from 'components/Icons';
import { ApplyButton } from 'components/Styled';

import { useStyles } from './style';

interface ViewProps {
  title: string;
  description: string;
  onClose(): void;
}

const View: React.FC<ViewProps> = ({ title, description, onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>{title}</h3>
      <ErrorOutlineIcon className={classes.icon} />
      <p className={classes.description}>{description}</p>
      <div className={classes.btnsWrapper}>
        <ApplyButton onClick={onClose}>{t('#button.ok')}</ApplyButton>
      </div>
    </div>
  );
};

export default View;
