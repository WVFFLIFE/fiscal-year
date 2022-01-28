import { useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import NumberFormat, { NumberFormatProps } from 'react-number-format';
import Select, { SelectProps } from 'components/controls/Select';
import Input, { InputProps } from 'components/Input';
import DatePicker, { DatePickerProps } from 'components/DatePicker';
import PartyLookup, { PartyLookUpProps } from '../../PartyLookUp';

import clsx from 'clsx';
import { useStyles } from './style';

type ComponentProps =
  | { type: 'input'; ControlProps: InputProps }
  | { type: 'number'; ControlProps: NumberFormatProps }
  | { type: 'select'; ControlProps: SelectProps }
  | { type: 'datepicker'; ControlProps: DatePickerProps }
  | { type: 'partylookup'; ControlProps: PartyLookUpProps };

type FieldProps = {
  label: string;
  className?: string;
  required?: boolean;
  error?: string;
  onResetError?(): void;
} & ComponentProps;

const Field: React.FC<FieldProps> = ({
  label,
  className,
  required = false,
  error,
  type,
  ControlProps,
  onResetError,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!!error && rootRef.current) {
      rootRef.current.scrollIntoView();
    }
  }, [error]);

  const handleChange = useCallback(
    (...args) => {
      if (onResetError) {
        onResetError();
      }

      // @ts-ignore
      ControlProps.onChange && ControlProps.onChange(...args);
    },
    [ControlProps, onResetError]
  );

  const renderComponent = () => {
    switch (type) {
      case 'input':
        return (
          <Input
            {...(ControlProps as InputProps)}
            onChange={handleChange}
            classes={{ root: clsx({ [classes.borderRed]: !!error }) }}
          />
        );
      case 'number':
        return (
          <NumberFormat
            {...(ControlProps as NumberFormatProps)}
            className={clsx(
              classes.numberInput,
              (ControlProps as NumberFormatProps).className
            )}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <Select
            {...(ControlProps as SelectProps)}
            onChange={handleChange}
            error={!!error}
          />
        );
      case 'datepicker':
        return (
          <DatePicker
            {...(ControlProps as DatePickerProps)}
            onChange={handleChange}
          />
        );
      case 'partylookup':
        return (
          <PartyLookup
            {...(ControlProps as PartyLookUpProps)}
            onChange={handleChange}
            classes={{ border: clsx({ [classes.borderRed]: !!error }) }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={clsx(classes.root, className)} ref={rootRef}>
      <span className={classes.label}>
        {t(label)}
        {required && <sup className={classes.required}>*</sup>}
      </span>
      {renderComponent()}
      {error && <span className={classes.error}>{error}</span>}
    </div>
  );
};

export default Field;
