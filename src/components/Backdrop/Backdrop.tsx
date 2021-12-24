import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

interface BackdropProps {
  loading: boolean;
}

const Backdrop: React.FC<BackdropProps> = ({ loading }) => {
  const classes = useStyles();

  return (
    <MuiBackdrop open={loading} sx={{ zIndex: 999 }}>
      <CircularProgress className={classes.loader} />
    </MuiBackdrop>
  );
};

export default Backdrop;
