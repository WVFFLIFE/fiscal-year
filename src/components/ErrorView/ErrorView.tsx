import { ErrorOutlineIcon } from 'components/Icons';

import { useStyles } from './style';

interface ErrorViewProps {
  messages: string[];
}

const ErrorView: React.FC<ErrorViewProps> = ({ messages }) => {
  const classes = useStyles();

  return (
    <div>
      <h3 className={classes.title}>Error</h3>
      <ErrorOutlineIcon className={classes.errorIcon} />
      <div className={classes.box}>
        {messages.map((message, idx) => (
          <p key={idx} className={classes.errorDescription}>
            {message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorView;
