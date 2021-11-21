import { FiscalYearModel } from 'models';

import { useStyles } from './style';

interface SelectedInfoProps {
  fiscalYear: FiscalYearModel;
}

const SelectedInfo: React.FC<SelectedInfoProps> = ({ fiscalYear }) => {
  const classes = useStyles();

  return <div className={classes.root}>{fiscalYear.Name}</div>;
};

export default SelectedInfo;
