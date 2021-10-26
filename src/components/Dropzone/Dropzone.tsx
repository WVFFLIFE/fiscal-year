import { useDropzone } from 'react-dropzone';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

const Dropzone = () => {
  const classes = useStyles();

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png, image/svg+xml',
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(classes.root, {
        [classes.dragActive]: isDragActive,
      })}
    >
      <input {...getInputProps()} />
      <span className={classes.text}>Drop attachments here</span>
      <span className={classes.or}>or</span>
      <Button className={classes.btn} onClick={open}>
        Select
      </Button>
    </div>
  );
};

export default Dropzone;
