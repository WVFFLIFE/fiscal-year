import { useState, useRef } from 'react';

import Popover from '@mui/material/Popover';
import Fade from '@mui/material/Fade';

import Input from './Input';
import Body from './Body';

interface DatePickerProps {
  date: Date | null;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  onChange(date: Date | null): void;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  date,
  min,
  max,
  disabled,
  onChange,
  className,
}) => {
  const anchorEl = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div ref={anchorEl} className={className}>
        <Input
          placeholder="dd.mm.yyyy"
          date={date}
          onChange={onChange}
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
        <Body date={date} onChange={onChange} onClose={handleClose} />
      </Popover>
    </>
  );
};

export default DatePicker;
