import { useTranslation } from 'react-i18next';

import Select, { SelectProps } from 'components/controls/Select';
import Input, { InputProps } from 'components/Input';
import DatePicker, { DatePickerProps } from 'components/DatePicker';

import clsx from 'clsx';
import { useStyles } from './style';

type ComponentProps =
  | { type: 'input'; ControlProps: InputProps }
  | { type: 'select'; ControlProps: SelectProps }
  | { type: 'datepicker'; ControlProps: DatePickerProps };

type FieldProps = {
  label: string;
  className?: string;
  required?: boolean;
  error?: boolean;
  errorText?: string;
} & ComponentProps;

const Field: React.FC<FieldProps> = ({
  label,
  className,
  required = false,
  error,
  errorText,
  type,
  ControlProps,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderComponent = () => {
    switch (type) {
      case 'input':
        return <Input {...(ControlProps as InputProps)} />;
      case 'select':
        return <Select {...(ControlProps as SelectProps)} />;
      case 'datepicker':
        return <DatePicker {...(ControlProps as DatePickerProps)} />;
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
      {error && <span className={classes.error}>{errorText}</span>}
    </div>
  );
};

export default Field;
