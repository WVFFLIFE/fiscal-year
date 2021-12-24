import { useTranslation } from 'react-i18next';
import { RenderDataType } from 'models/TableModel';

import renderAs from 'utils/renderAs';

import { useStyles } from './style';

interface FieldProps {
  label: string;
  data: string | number | null;
  required?: boolean;
  type?: RenderDataType;
}

const Field: React.FC<FieldProps> = ({
  label,
  data,
  type = 'string',
  required,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div>
      <span className={classes.label}>
        {t(label)}
        {required && <sup className={classes.required}>*</sup>}
      </span>
      <span className={classes.output}>
        {type === 'translate'
          ? data
            ? t(String(data))
            : null
          : renderAs(data, type)}
      </span>
    </div>
  );
};

export default Field;
