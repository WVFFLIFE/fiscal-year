import { useStyles } from './style';

interface PropgressBarProps {
  value: number;
}

const ProgressBar: React.FC<PropgressBarProps> = ({ value }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span
        style={{ transform: `translateX(-${100 - value}%)` }}
        className={classes.loader}
      ></span>
    </div>
  );
};

export default ProgressBar;
