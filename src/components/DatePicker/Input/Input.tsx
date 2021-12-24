import { useState, useEffect, ChangeEvent, memo, MouseEvent } from 'react';
import useFirstMount from 'hooks/useFirstMount';

import { defaultFormat, isValid, format } from 'utils/dates';

import { IconButton } from 'components/Styled';
import { CalendarIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

function getDateStr(date: Date | null) {
  return date ? defaultFormat(date) : '';
}

function validateYear(year: string) {
  return +year >= 1900 && +year <= 2099;
}

function validate(date: Date) {
  return isValid(date) && validateYear(format(date, 'yyyy'));
}

function parseDate(d: string) {
  let regex = /^(0?[1-9]|[12][0-9]|3[01])[.](0?[1-9]|1[012])[.]\d{4}$/;
  let dateStr = d.replace(/\/|-/g, '.');

  if (!regex.test(dateStr)) return new Date('invalid');

  let [dd, mm, yyyy] = dateStr.split('.');

  return new Date(
    `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
  );
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

  const firstMount = useFirstMount();
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
    if (!firstMount) {
      if (value) {
        const valid = validate(parseDate(value));
        setValidationError(!valid);
      } else {
        setValidationError(false);
      }
      onChange(value ? parseDate(value) : null);
    }
  }, [value]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
    onChange(isValid(parsedDate) ? parsedDate : null);
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
