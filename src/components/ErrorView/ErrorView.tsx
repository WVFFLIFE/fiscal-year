import { ErrorOutlineIcon } from 'components/Icons';

import { useStyles } from './style';

interface ErrorViewProps {
  messages: string[];
}

const ErrorView: React.FC<ErrorViewProps> = ({ messages }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Error</h3>
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
