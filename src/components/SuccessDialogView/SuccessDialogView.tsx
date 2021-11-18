import { RoundCheckIcon } from 'components/Icons';

import { useStyles } from './style';

interface SuccessDialogViewProps {
  text: string;
}

const SuccessDialogView: React.FC<SuccessDialogViewProps> = ({ text }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RoundCheckIcon className={classes.icon} />
      <p className={classes.description}>{text}</p>
    </div>
  );
};

export default SuccessDialogView;
