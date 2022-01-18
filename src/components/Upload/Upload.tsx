import { FC } from 'react';

import useUploadData, { HookArgs } from './useUploadData';

import Dropzone from 'components/Dropzone';

interface UploadProps extends HookArgs {
  disabled?: boolean;
}

const Upload: FC<UploadProps> = ({
  onUpload,
  onDelete,
  onPreview,
  disabled,
}) => {
  const q = useUploadData({ onUpload, onDelete, onPreview });

  return (
    <Dropzone
      maxFiles={1}
      accept="image/jpeg, image/jpg, image/png"
      disabled={disabled}
    />
  );
};

export default Upload;
