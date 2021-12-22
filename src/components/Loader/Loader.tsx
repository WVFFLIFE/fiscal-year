import { LoadingContainer } from 'components/Styled';
import { CircularProgress } from '@mui/material';

import { useStyles } from './style';

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => {
  const classes = useStyles();

  return (
    <LoadingContainer>
      <CircularProgress className={classes.loader} size={size} />
    </LoadingContainer>
  );
};

export default Loader;
