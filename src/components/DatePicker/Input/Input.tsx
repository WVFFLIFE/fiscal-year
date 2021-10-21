import { useState, useEffect, ChangeEvent, memo, MouseEvent } from 'react';

import format from 'date-fns/format';
import isValid from 'date-fns/isValid';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import { IconButton } from 'components/Styled';
import { CalendarIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

function getDateStr(date: Date | null) {
  return date ? format(date, DEFAULT_FORMAT_PATTERN) : '';
}

function parseDate(d: string) {
  let regex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;
  let dateStr = d.replace(/\/|-/g, '.');

  if (!regex.test(dateStr)) return null;

  let [dd, mm, yyyy] = dateStr.split('.');

  return new Date(`${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`);
}

interface InputProps {
  date: Date | null;
  onChange(date: Date | null): void;
  onClick(e: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  date,
  className,
  onChange,
  onClick,
  placeholder,
}) => {
  const classes = useStyles();

  const [value, setValue] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [focused, setFocused] = useState(false);

  const parsedDate = parseDate(value);

  useEffect(() => {
    if (isValid(date)) {
      setValue(getDateStr(date));
    }
  }, [date]);

  useEffect(() => {
    if (value === '') {
      setValidationError(false);
    } else {
      setValidationError(!isValid(parsedDate));
    }
  }, [parsedDate, value]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    onChange(parsedDate);
  };

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.focus]: focused,
        [classes.error]: validationError,
      })}
    >
      <IconButton className={classes.iconBtn} onClick={onClick}>
        <CalendarIcon className={classes.icon} />
      </IconButton>
      <input
        placeholder={placeholder}
        className={classes.input}
        value={value}
        onChange={handleChangeInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default memo(Input);
