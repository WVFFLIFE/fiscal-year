import { HTMLProps } from 'react';

import clsx from 'clsx';
import { useStyles } from './style';

const Title: React.FC<HTMLProps<HTMLHeadingElement>> = (props) => {
  const classes = useStyles();

  return (
    <h1 className={clsx(classes.h1, props.className)}>{props.children}</h1>
  );
};

export default Title;
