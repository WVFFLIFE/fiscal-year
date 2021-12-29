import {
  GeneralTypeCode,
  ProductCode,
  TypeCode,
  UsageCode,
} from 'enums/liabilities';
import { useTranslation } from 'react-i18next';
import useLiabilityCreateFormData, {
  InitialValues,
} from './useLiabilityCreateFormData';
import {
  getLiabilityGeneralTypeLabel,
  getLiabilityUsageLabel,
  getLiabilityProductLabel,
  getLiabilityTypeLabel,
} from 'configs/dictionaries';

import DialogError from 'components/DialogError';
import Field from './Field';
import ActionButton from 'components/ActionButton';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

function getCodes<T extends { [key: string]: any }>(enumerable: T) {
  return Object.values(enumerable).filter((v) => typeof v === 'number');
}

interface LiabilityFormProps {
  action: 'create' | 'edit';
  initialValues?: InitialValues | null;
  onUpdate(): void;
  onClose(): void;
}

const LiabilityForm: React.FC<LiabilityFormProps> = ({
  action,
  initialValues,
  onUpdate,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    formik,
    error,
    handleChangeInput,
    handleChangeSelect,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeLiabilityParty,
    handleChangeQuantity,
    handleChnagePriceItemRate,
    handleResetValidationErrors,
    handleResetCommonErrors,
  } = useLiabilityCreateFormData({ initialValues, action, onUpdate, onClose });

  const generalOptions = getCodes(GeneralTypeCode);
  const usageOptions = getCodes(UsageCode);
  const productOptions = getCodes(ProductCode);
  const typeOptions = getCodes(TypeCode);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.wrapper}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Field
              type="input"
              required
              label="Liability Name"
              error={formik.errors.liabilityName}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.liabilityName,
                onChange: handleChangeInput,
                name: 'liabilityName',
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="input"
              required
              label="Organization"
              onResetError={handleResetValidationErrors}
              error={formik.errors.cooperativeName}
              ControlProps={{
                value: formik.values.cooperativeName,
                readonly: true,
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="input"
              label="Description"
              ControlProps={{
                value: formik.values.description,
                onChange: handleChangeInput,
                name: 'description',
                multiline: true,
                rows: 5,
                maxRows: 5,
                placeholder: 'Type description here',
                inputClasses: { input: classes.textarea },
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="select"
              required
              label="Liability Type"
              error={formik.errors.generalType}
              onResetError={handleResetValidationErrors}
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
          <li className={classes.listItem}>
            <Field
              type="partylookup"
              required
              label="Liability Party"
              error={formik.errors.liabilityPartyName}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.liabilityPartyName,
                onChange: handleChangeLiabilityParty,
              }}
            />
          </li>
        </ul>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Field
              type="datepicker"
              label="Start date"
              ControlProps={{
                date: formik.values.startDate,
                onChange: handleChangeStartDate,
                placeholder: 'Select date',
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
                placeholder: 'Select date',
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
                name: 'documentNumber',
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="select"
              required
              label="Usage"
              error={formik.errors.usage}
              onResetError={handleResetValidationErrors}
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
              error={formik.errors.product}
              onResetError={handleResetValidationErrors}
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
          <li className={classes.listItem}>
            <Field
              required
              type="input"
              label="Quantity"
              error={formik.errors.quantity}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.quantity,
                onChange: handleChangeQuantity,
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              required
              type="input"
              label="Price item rate"
              error={formik.errors.priceItemRate}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.priceItemRate,
                onChange: handleChnagePriceItemRate,
              }}
            />
          </li>
        </ul>
      </div>

      <div className={classes.btnsWrapper}>
        <ActionButton className={classes.btnOffset} onClick={onClose}>
          {t('#button.cancel')}
        </ActionButton>
        <ActionButton
          disabled={formik.isSubmitting}
          palette="darkBlue"
          type="submit"
          endIcon={
            formik.isSubmitting ? (
              <CircularProgress size={17} className={classes.loader} />
            ) : undefined
          }
        >
          {t('#button.save')}
        </ActionButton>
      </div>
      <DialogError error={error} initError={handleResetCommonErrors} />
    </form>
  );
};

export type InitialFormValues = InitialValues;
export default LiabilityForm;
