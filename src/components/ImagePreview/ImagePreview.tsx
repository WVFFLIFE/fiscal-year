import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ProgressBar from 'components/ProgressBar';
import { ActionButton } from 'components/Styled';
import { DeleteIcon, EyeIcon } from 'components/Icons';
import Dialog from 'components/Dialog';
import FullImage from './FullImage';

import clsx from 'clsx';
import { useStyles } from './style';

interface PreviewProps {
  className?: string;
  src: string | null;
  progress: number;
  loading: boolean;
  uploading: boolean;
  deleting: boolean;
  onDelete(): Promise<void>;
  overviewTitle?: string;
  disabled?: boolean;
}

const Preview: React.FC<PreviewProps> = ({
  src,
  progress,
  className,
  loading,
  uploading,
  deleting,
  disabled,
  onDelete,
  overviewTitle,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [showFullImage, setShowFullImage] = useState(false);

  const handleOpenFullImageModal = () => {
    setShowFullImage(true);
  };

  const handleCloseFullImageModal = () => {
    setShowFullImage(false);
  };

  if (loading || uploading || deleting) {
    const text = loading
      ? t('#imagepreview.loading')
      : uploading
      ? t('#imagepreview.loading')
      : deleting
      ? t('#imagepreview.deleting')
      : null;
    return (
      <div className={clsx(classes.progressRoot, className)}>
        <span className={classes.loadingText}>{text}</span>
        <ProgressBar value={progress} />
      </div>
    );
  }

  if (!src) return null;

  return (
    <>
      <div
        className={clsx(classes.wrapper, className, {
          [classes.disabled]: disabled,
        })}
      >
        <img className={classes.img} src={src} alt="Preview" />
        {!disabled && (
          <div className={classes.mask}>
            <ActionButton
              className={clsx(classes.btn, classes.btnOffset)}
              onClick={handleOpenFullImageModal}
            >
              <EyeIcon className={classes.icon} />
            </ActionButton>
            <ActionButton className={classes.btn} onClick={onDelete}>
              <DeleteIcon className={classes.icon} />
            </ActionButton>
          </div>
        )}
      </div>
      <Dialog
        maxWidth="md"
        open={showFullImage}
        handleClose={handleCloseFullImageModal}
        fullWidth={false}
      >
        <h3 className={classes.title}>{overviewTitle}</h3>
        <FullImage src={src} />
      </Dialog>
    </>
  );
};

export default Preview;
