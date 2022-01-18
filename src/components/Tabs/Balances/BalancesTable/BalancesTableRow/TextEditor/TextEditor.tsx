import { ChangeEvent, FC, memo } from 'react';

import NumberFormat, {
  NumberFormatValues,
  SourceInfo,
} from 'react-number-format';
import Input from 'components/Input';

import clsx from 'clsx';
import { useStyles } from './style';

interface TextEditorProps {
  type: 'string' | 'number';
  value: string;
  onChange(value: string, name?: string): void;
  autoFocus?: boolean;
  className?: string;
  name?: string;
  maxLength?: number;
  placeholder?: string;
}

const TextEditor: FC<TextEditorProps> = ({
  autoFocus,
  type,
  value,
  onChange,
  name,
  maxLength,
  className,
  placeholder,
}) => {
  const classes = useStyles();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    onChange(value, name);
  };

  const handleChangeNumber = (
    values: NumberFormatValues,
    sourceInfo: SourceInfo
  ) => {
    const { value } = values;
    if (sourceInfo.source === 'event') {
      onChange(value);
    }
  };

  return type === 'string' ? (
    <Input
      autoFocus={autoFocus}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleChangeInput}
      classes={{
        root: clsx(classes.textInput, className),
      }}
      inputClasses={{ input: classes.textInput }}
    />
  ) : (
    <NumberFormat
      autoFocus={autoFocus}
      className={clsx(classes.numberInput, className)}
      value={value}
      name={name}
      placeholder={placeholder}
      onValueChange={handleChangeNumber}
      isNumericString
      thousandSeparator=" "
      decimalSeparator=","
      decimalScale={2}
    />
  );
};

export default memo(TextEditor);
