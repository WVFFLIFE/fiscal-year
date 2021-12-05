import { useState } from 'react';

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
  handleDeleteCurrentFile(): Promise<void>;
}

const Preview: React.FC<PreviewProps> = ({
  src,
  progress,
  className,
  loading,
  uploading,
  deleting,
  handleDeleteCurrentFile,
}) => {
  const classes = useStyles();
  const [showFullImage, setShowFullImage] = useState(false);

  const handleOpenFullImageModal = () => {
    setShowFullImage(true);
  };

  const handleCloseFullImageModal = () => {
    setShowFullImage(false);
  };

  if (loading || uploading || deleting) {
    const text = loading
      ? 'Loading...'
      : uploading
      ? 'Uploading...'
      : deleting
      ? 'Deleting...'
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
      <div className={clsx(classes.wrapper, className)}>
        <img className={classes.img} src={src} alt="Preview" />
        <div className={classes.mask}>
          <ActionButton
            className={clsx(classes.btn, classes.btnOffset)}
            onClick={handleOpenFullImageModal}
          >
            <EyeIcon className={classes.icon} />
          </ActionButton>
          <ActionButton
            className={classes.btn}
            onClick={handleDeleteCurrentFile}
          >
            <DeleteIcon className={classes.icon} />
          </ActionButton>
        </div>
      </div>
      <Dialog
        maxWidth="md"
        open={showFullImage}
        handleClose={handleCloseFullImageModal}
        fullWidth={false}
      >
        <h3 className={classes.title}>Cover page image</h3>
        <FullImage src={src} />
      </Dialog>
    </>
  );
};

export default Preview;
