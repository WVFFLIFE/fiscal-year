import { useTranslation } from 'react-i18next';

import { ErrorOutlineIcon } from 'components/Icons';

import { useStyles } from './style';

interface ErrorViewProps {
  title?: string;
  messages: string[];
}

const ErrorView: React.FC<ErrorViewProps> = ({ messages, title }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>{title || t('#common.error')}</h3>
      <ErrorOutlineIcon className={classes.errorIcon} />
      <ul className={classes.box}>
        {messages.map((message, idx) => (
          <li key={idx} className={classes.errorItem}>
            <span className={classes.errorDescription}>{message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorView;
