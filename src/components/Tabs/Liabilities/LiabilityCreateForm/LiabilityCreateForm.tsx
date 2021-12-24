import {
  GeneralTypeCode,
  ProductCode,
  TypeCode,
  UsageCode,
} from 'enums/liabilities';
import { useTranslation } from 'react-i18next';
import useLiabilityCreateFormData from './useLiabilityCreateFormData';
import {
  getLiabilityGeneralTypeLabel,
  getLiabilityUsageLabel,
  getLiabilityProductLabel,
  getLiabilityTypeLabel,
} from 'configs/dictionaries';

import Field from './Field';

import { useStyles } from './style';

function getCodes<T extends { [key: string]: any }>(enumerable: T) {
  return Object.values(enumerable).filter((v) => typeof v === 'number');
}

interface InitialValues {
  liabilityName: string;
  organization: string;
  description: string;
  generalType: number | null;
  liabilityParty: number | null;
  startDate: string | null;
  endDate: string | null;
  documentNumber: string;
  usage: number | null;
  product: number | null;
  type: number | null;
  quantity: number | null;
  priceItemRate: number | null;
}

interface LiabilityCreateFormProps {
  initialValues?: any;
  onSubmit?(values: any): Promise<unknown>;
}

const LiabilityCreateForm: React.FC<LiabilityCreateFormProps> = ({
  initialValues,
  onSubmit,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    formik,
    handleChangeInput,
    handleChangeSelect,
    handleChangeStartDate,
    handleChangeEndDate,
  } = useLiabilityCreateFormData({ initialValues, onSubmit });

  const generalOptions = getCodes(GeneralTypeCode);
  const usageOptions = getCodes(UsageCode);
  const productOptions = getCodes(ProductCode);
  const typeOptions = getCodes(TypeCode);

  return (
    <div className={classes.root}>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Field
            type="input"
            required
            label="Liability Name"
            ControlProps={{
              value: formik.values.liabilityName,
              onChange: handleChangeInput,
              name: 'liabilityName',
            }}
          />
        </li>
        {/* <li className={classes.listItem}>
          <Field
            type="input"
            required
            label="Liability Name"
            ControlProps={{
              value: formik.values.liabilityName,
              onChange: handleChangeInput,
              name: 'liabilityName',
            }}
          />
        </li> */}
        <li className={classes.listItem}>
          <Field
            type="input"
            label="Description"
            ControlProps={{
              value: formik.values.description,
              onChange: handleChangeInput,
              name: 'description',
              multiline: true,
              placeholder: 'Type description here',
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="select"
            required
            label="Liability Type"
            ControlProps={{
              value: formik.values.generalType,
              options: generalOptions,
              onChange: handleChangeSelect,
              name: 'generalType',
              getOptionLabel: (option) =>
                t(getLiabilityGeneralTypeLabel(option) || ''),
            }}
          />
        </li>
        {/* <li className={classes.listItem}>
          <Field
            type="input"
            required
            label="Liability Name"
            ControlProps={{
              value: formik.values.liabilityName,
              onChange: handleChangeInput,
              name: 'liabilityName',
            }}
          />
        </li> */}
      </ul>
      <ul className={classes.list}>
        <li className={classes.listItem}>
          <Field
            type="datepicker"
            label="Start date"
            ControlProps={{
              date: formik.values.startDate,
              onChange: handleChangeStartDate,
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="datepicker"
            label="End date"
            ControlProps={{
              date: formik.values.endDate,
              onChange: handleChangeEndDate,
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="input"
            label="Document number"
            ControlProps={{
              value: formik.values.documentNumber,
              onChange: handleChangeInput,
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="select"
            required
            label="Usage"
            ControlProps={{
              value: formik.values.usage,
              options: usageOptions,
              onChange: handleChangeSelect,
              name: 'usage',
              getOptionLabel: (option) =>
                t(getLiabilityUsageLabel(option) || ''),
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="select"
            required
            label="Product"
            ControlProps={{
              value: formik.values.product,
              options: productOptions,
              onChange: handleChangeSelect,
              name: 'product',
              getOptionLabel: (option) =>
                t(getLiabilityProductLabel(option) || ''),
            }}
          />
        </li>
        <li className={classes.listItem}>
          <Field
            type="select"
            label="Type"
            ControlProps={{
              value: formik.values.type,
              options: typeOptions,
              onChange: handleChangeSelect,
              name: 'type',
              getOptionLabel: (option) =>
                t(getLiabilityTypeLabel(option) || ''),
            }}
          />
        </li>
      </ul>
    </div>
  );
};

export default LiabilityCreateForm;
