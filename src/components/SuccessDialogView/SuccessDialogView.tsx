import { RoundCheckIcon } from 'components/Icons';

import { useStyles } from './style';

const SuccessDialogView = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <RoundCheckIcon className={classes.icon} />
      <p className={classes.description}>
        Files have been successfully uploaded
      </p>
    </div>
  );
};

export default SuccessDialogView;
