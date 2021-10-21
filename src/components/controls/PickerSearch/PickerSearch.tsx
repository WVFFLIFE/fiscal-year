import { memo, forwardRef, HTMLProps } from 'react';

import clsx from 'clsx';
import { useStyles } from './style';

const PickerSearch = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
  (props, ref) => {
    const classes = useStyles();
    const { className, ...rest } = props;

    return (
      <input {...rest} ref={ref} className={clsx(classes.root, className)} />
    );
  }
);

export default memo(PickerSearch);
