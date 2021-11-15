import { memo } from 'react';

import { formatBytes } from 'utils';

import { IconButton } from 'components/Styled';
import { CloseIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface FilesListProps {
  className?: string;
  files: File[];
  onRemove(name: string): void;
}

const FilesList: React.FC<FilesListProps> = ({
  className,
  files,
  onRemove,
}) => {
  const classes = useStyles();

  if (!files.length) return null;

  return (
    <ul className={clsx(classes.list, className)}>
      {files.map((file) => {
        return (
          <li key={file.name} className={classes.item}>
            <span className={classes.name}>{file.name}</span>
            <span className={classes.flex}>
              <span className={classes.size}>{formatBytes(file.size)}</span>
              <IconButton onClick={() => onRemove(file.name)}>
                <CloseIcon className={classes.closeIcon} />
              </IconButton>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default memo(FilesList);
