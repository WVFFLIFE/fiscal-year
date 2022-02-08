import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';

import ActionButton from 'components/ActionButton';

import clsx from 'clsx';
import { useStyles } from './style';

interface DropzoneProps {
  className?: string;
  maxFiles?: number;
  multiple?: boolean;
  accept?: string;
  onChange?(files: File[]): void;
  disabled?: boolean;
}

const Dropzone: React.FC<DropzoneProps> = ({
  className,
  maxFiles,
  multiple,
  accept,
  disabled = false,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    onDropAccepted: onChange,
    disabled,
    accept,
    maxFiles,
    multiple,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(classes.root, className, {
        [classes.dragActive]: isDragActive,
        [classes.disabled]: disabled,
      })}
    >
      <input {...getInputProps()} />
      <span className={classes.text}>
        {t(
          maxFiles === 1
            ? `#control.dropzone.attachment`
            : '#control.dropzone.attachments'
        )}
      </span>
      <span className={classes.or}>{t('#common.or')}</span>
      <ActionButton
        className={classes.btn}
        size="small"
        onClick={open}
        disabled={disabled}
      >
        {t('#button.select')}
      </ActionButton>
    </div>
  );
};

export default Dropzone;
