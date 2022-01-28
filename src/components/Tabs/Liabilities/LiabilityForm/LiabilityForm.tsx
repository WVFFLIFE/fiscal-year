import {
  GeneralTypeCode,
  ProductCode,
  TypeCode,
  UsageCode,
} from 'enums/liabilities';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';

import { selectLiabilitiesSettings } from 'selectors/settingsSelectors';

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

  const liabilitiesSettings = useStateSelector(selectLiabilitiesSettings);

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
    handleResetRequestErrors,
    handleSubmit,
  } = useLiabilityCreateFormData({ initialValues, action, onUpdate, onClose });

  const generalOptions = getCodes(GeneralTypeCode);
  const usageOptions = getCodes(UsageCode);
  const productOptions = getCodes(ProductCode);
  const typeOptions = getCodes(TypeCode);

  const SaveEndIcon = formik.isSubmitting ? (
    <CircularProgress size={17} className={classes.loader} />
  ) : undefined;

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.wrapper}>
        <ul className={classes.list}>
          <li className={classes.listItem}>
            <Field
              type="input"
              required
              label={t('#tab.liabilities.liabilityname')}
              error={formik.errors.liabilityName}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.liabilityName,
                onChange: handleChangeInput,
                name: 'liabilityName',
                type: 'text',
                inputProps: {
                  maxLength: liabilitiesSettings.nameMaxLength,
                },
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="input"
              required
              label={t('#tab.liabilities.organization')}
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
              label={t('#tab.liabilities.description')}
              ControlProps={{
                value: formik.values.description,
                onChange: handleChangeInput,
                name: 'description',
                multiline: true,
                rows: 5,
                maxRows: 5,
                placeholder: t('#tab.liabilities.description.placeholder'),
                inputClasses: { input: classes.textarea },
                inputProps: {
                  maxLength: liabilitiesSettings.descriptionMaxLength,
                },
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="select"
              required
              label={t('#tab.liabilities.liabilitytype')}
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
              label={t('#tab.liabilities.liabilityparty')}
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
              label={t('#tab.liabilities.startdate')}
              ControlProps={{
                date: formik.values.startDate,
                onChange: handleChangeStartDate,
                placeholder: t('#tab.liabilities.startdate.placeholder'),
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="datepicker"
              label={t('#tab.liabilities.enddate')}
              ControlProps={{
                date: formik.values.endDate,
                onChange: handleChangeEndDate,
                placeholder: t('#tab.liabilities.enddate.placeholder'),
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="input"
              label={t('#tab.liabilities.documentnumber')}
              ControlProps={{
                value: formik.values.documentNumber,
                onChange: handleChangeInput,
                name: 'documentNumber',
                type: 'text',
                inputProps: {
                  maxLength: liabilitiesSettings.documentNumberMaxLength,
                },
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              type="select"
              required
              label={t('#tab.liabilities.usage')}
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
              label={t('#tab.liabilities.product')}
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
              label={t('#tab.liabilities.type')}
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
              type="number"
              label={t('#tab.liabilities.quantity')}
              error={formik.errors.quantity}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.quantity,
                onChange: handleChangeQuantity,
                decimalScale: 0,
              }}
            />
          </li>
          <li className={classes.listItem}>
            <Field
              required
              type="number"
              label={t('#tab.liabilities.priceitemrate')}
              error={formik.errors.priceItemRate}
              onResetError={handleResetValidationErrors}
              ControlProps={{
                value: formik.values.priceItemRate,
                onChange: handleChnagePriceItemRate,
                decimalScale: 2,
                decimalSeparator: ',',
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
          className={classes.btnOffset}
          onClick={handleSubmit}
          disabled={formik.isSubmitting}
        >
          {t('#button.saveandnew')}
        </ActionButton>
        <ActionButton
          className={classes.btnOffset}
          disabled={formik.isSubmitting}
        >
          {t('#button.saveandcopy')}
        </ActionButton>
        <ActionButton
          disabled={formik.isSubmitting}
          palette="darkBlue"
          type="submit"
          endIcon={SaveEndIcon}
        >
          {t('#button.save')}
        </ActionButton>
      </div>
      <DialogError error={error} initError={handleResetRequestErrors} />
    </form>
  );
};

export type InitialFormValues = InitialValues;
export default LiabilityForm;
