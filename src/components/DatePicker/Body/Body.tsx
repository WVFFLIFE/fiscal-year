import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Calendar, { CalendarProps } from 'components/Calendar';
import { ApplyButton, CancelButton } from 'components/Styled';

import { useStyles } from './style';

interface BodyProps extends CalendarProps {
  onClose(): void;
}

const Body: React.FC<BodyProps> = ({
  date,
  onChange,
  onClose,
  disabled,
  max,
  min,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [tempDate, setTempDate] = useState(() => date);

  const handleChangeTempDate = (date: Date) => {
    setTempDate(date);
  };

  const handleApply = () => {
    onChange(tempDate);
    onClose();
  };

  return (
    <div className={classes.root}>
      <div className={classes.calendar}>
        <Calendar
          date={tempDate}
          onChange={handleChangeTempDate}
          max={max}
          min={min}
          disabled={disabled}
        />
      </div>
      <div className={classes.btnsWrapper}>
        <CancelButton className={classes.cancelBtn} onClick={onClose}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton onClick={handleApply}>{t('#button.apply')}</ApplyButton>
      </div>
    </div>
  );
};

export default Body;
