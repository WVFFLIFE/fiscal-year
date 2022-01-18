import {
  useState,
  useRef,
  useCallback,
  useEffect,
  memo,
  forwardRef,
} from 'react';
import { Locale } from 'date-fns';
import { startOfDay } from 'utils/dates';

import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';

import Input from './Input';
import Body from './Body';

export interface ClassNames {
  inputRoot?: string;
}

export interface DatePickerProps {
  open?: boolean;
  date: Date | null;
  locale?: Locale;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  onChange(date: Date | null): void;
  className?: string;
  classes?: ClassNames;
  placeholder?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      open: openDefault = false,
      date,
      locale,
      classes: propsClasses,
      min,
      max,
      disabled,
      onChange,
      className,
      placeholder = 'dd.mm.yyyy',
    },
    inputRef
  ) => {
    const anchorEl = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setOpen(openDefault);
    }, [openDefault]);

    const handleOpen = useCallback(() => {
      setOpen(true);
    }, []);

    const handleClose = () => {
      setOpen(false);
    };

    const handleChangeDate = useCallback(
      (date: Date | null) => {
        onChange(date && startOfDay(date));
      },
      [onChange]
    );

    return (
      <>
        <div ref={anchorEl} className={className}>
          <Input
            className={propsClasses?.inputRoot}
            ref={inputRef}
            placeholder={placeholder}
            date={date}
            onChange={handleChangeDate}
            onClick={handleOpen}
          />
        </div>
        <Popover
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl.current}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          TransitionComponent={Fade}
        >
          <Body
            date={date}
            locale={locale}
            onChange={handleChangeDate}
            onClose={handleClose}
          />
        </Popover>
      </>
    );
  }
);

export default memo(DatePicker);
