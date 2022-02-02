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
  | {
      type: 'number';
      ControlProps: NumberFormatProps;
    }
  | { type: 'select'; ControlProps: SelectProps }
  | { type: 'datepicker'; ControlProps: DatePickerProps }
  | { type: 'partylookup'; ControlProps: PartyLookUpProps };

type FieldProps = {
  label: string;
  className?: string;
  required?: boolean;
  error?: string;
} & ComponentProps;

const Field: React.FC<FieldProps> = ({
  label,
  className,
  required = false,
  error,
  type,
  ControlProps,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const errorClassNames = clsx({ [classes.borderRed]: !!error });

  const renderComponent = () => {
    switch (type) {
      case 'input':
        return (
          <Input
            {...(ControlProps as InputProps)}
            classes={{ root: errorClassNames }}
          />
        );
      case 'number':
        return (
          <NumberFormat
            {...(ControlProps as NumberFormatProps)}
            className={clsx(
              classes.numberInput,
              (ControlProps as NumberFormatProps).className,
              errorClassNames
            )}
          />
        );
      case 'select':
        return <Select {...(ControlProps as SelectProps)} error={!!error} />;
      case 'datepicker':
        return (
          <DatePicker
            {...(ControlProps as DatePickerProps)}
            classes={{ inputRoot: errorClassNames }}
          />
        );
      case 'partylookup':
        return (
          <PartyLookup
            {...(ControlProps as PartyLookUpProps)}
            classes={{ border: errorClassNames }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
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
