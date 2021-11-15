import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

interface DropzoneProps {
  className?: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  onChange?(files: File[]): void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  className,
  maxFiles,
  multiple,
  accept,
  onChange,
}) => {
  const classes = useStyles();

  const { getRootProps, getInputProps, open, isDragActive, acceptedFiles } =
    useDropzone({
      accept,
      maxFiles,
      multiple,
      noClick: true,
      noKeyboard: true,
    });

  useEffect(() => {
    if (onChange) {
      onChange(acceptedFiles);
    }
  }, [acceptedFiles, onChange]);

  return (
    <div
      {...getRootProps()}
      className={clsx(classes.root, className, {
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
