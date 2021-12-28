import { ChangeEvent, memo, forwardRef, cloneElement } from 'react';

import SearchIcon from 'components/Icons/SearchIcon';

import clsx from 'clsx';
import { useStyles } from './style';

type ClassNames = Partial<{
  root: string;
  input: string;
  iconWrapper: string;
}>;

interface SearchProps {
  className?: string;
  autoFocus?: boolean;
  value?: string;
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
  Icon?: JSX.Element;
  classes?: ClassNames;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  (
    {
      className,
      value,
      onChange,
      autoFocus = false,
      placeholder,
      Icon = <SearchIcon />,
      classes: propsClasses,
    },
    ref
  ) => {
    const classes = useStyles();

    return (
      <div className={clsx(classes.wrapper, className, propsClasses?.root)}>
        {Icon && (
          <span
            className={clsx(classes.iconWrapper, propsClasses?.iconWrapper)}
          >
            {cloneElement(Icon, { className: classes.icon })}
          </span>
        )}
        <input
          className={clsx(
            classes.input,
            {
              [classes.withIcon]: !!Icon,
            },
            propsClasses?.input
          )}
          autoFocus={autoFocus}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default memo(Search);
