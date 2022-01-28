import { ChangeEvent } from 'react';
import { MettadataAttributeModel } from 'services';

import CheckboxControl from 'components/CheckboxControl';

import { useStyles } from './style';

interface CheckboxGroupProps {
  className?: string;
  selected: string[];
  attribute: MettadataAttributeModel;
  name: string;
  title: string;
  onChange(e: ChangeEvent<HTMLInputElement>, groupName: string): void;
  disabled?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  className,
  name,
  attribute,
  selected,
  title,
  onChange,
  disabled,
}) => {
  const classes = useStyles();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e, name);
  };

  return (
    <div className={className}>
      <span className={classes.title}>{title}</span>
      <ul className={classes.list}>
        {attribute.AvailableValues.map((value) => {
          const checked = selected.includes(value);
          return (
            <li key={value} className={classes.item}>
              <CheckboxControl
                name={value}
                label={value}
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CheckboxGroup;
