import {
  GeneralTypeCode,
  ProductCode,
  TypeCode,
  UsageCode,
} from 'enums/liabilities';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import useStateSelector from 'hooks/useStateSelector';

import { isValid } from 'utils/dates';

import { selectLiabilitiesSettings } from 'selectors/settingsSelectors';

import useCreateFormData, {
  InitialValues,
  ValidationError,
} from './useCreateFormData';
import {
  getLiabilityGeneralTypeLabel,
  getLiabilityUsageLabel,
  getLiabilityProductLabel,
  getLiabilityTypeLabel,
} from 'configs/dictionaries';

import Dialog from 'components/Dialog';
import DialogError from 'components/DialogError';
import Field from './Field';
import ActionButton from 'components/ActionButton';
import CircularProgress from '@mui/material/CircularProgress';
import SuccessDialogView from 'components/SuccessDialogView';

import { useStyles } from './style';

function getCodes<T extends { [key: string]: any }>(enumerable: T) {
  return Object.values(enumerable).filter((v) => typeof v === 'number');
}

const generalOptions = getCodes(GeneralTypeCode);
const usageOptions = getCodes(UsageCode);
const productOptions = getCodes(ProductCode);
const typeOptions = getCodes(TypeCode);

interface LiabilityFormProps {
  action: 'create' | 'edit';
  initialValues?: InitialValues;
  onUpdate(loading?: boolean): void;
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
    formType,
    isOpenSuccessDialog,
    control,
    errors,
    requestState,
    handleSave,
    handleSaveAndNew,
    handleInitError,
    handleCloseSuccessDialog,
    handleSaveAndCopy,
  } = useCreateFormData(action, initialValues, onClose, onUpdate);

  const isDisabledSaveBtn =
    requestState.save || requestState.saveAndCopy || requestState.saveAndNew;

  return (
    <>
      <form onSubmit={handleSave}>
        <div className={classes.wrapper}>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Controller
                name="liabilityName"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Field
                    type="input"
                    required
                    label={t('#tab.liabilities.liabilityname')}
                    error={
                      !!(
                        errors.liabilityName &&
                        errors.liabilityName.type === 'required'
                      )
                        ? ValidationError.Required
                        : ''
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      inputRef: field.ref,
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="cooperative"
                rules={{
                  validate: Boolean,
                }}
                control={control}
                render={({ field }) => (
                  <Field
                    type="input"
                    required
                    label={t('#tab.liabilities.organization')}
                    error={
                      errors.cooperative ? ValidationError.Required : undefined
                    }
                    ControlProps={{
                      ...field,
                      value: field.value?.name,
                      readonly: true,
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Field
                    type="input"
                    label={t('#tab.liabilities.description')}
                    ControlProps={{
                      ...field,
                      multiline: true,
                      rows: 5,
                      maxRows: 5,
                      placeholder: t(
                        '#tab.liabilities.description.placeholder'
                      ),
                      inputClasses: { input: classes.textarea },
                      inputProps: {
                        maxLength: liabilitiesSettings.descriptionMaxLength,
                      },
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="generalType"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field
                    type="select"
                    required
                    label={t('#tab.liabilities.liabilitytype')}
                    error={
                      !!(
                        errors.generalType &&
                        errors.generalType.type === 'required'
                      )
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      inputRef: field.ref,
                      options: generalOptions,
                      getOptionLabel: (option) =>
                        t(getLiabilityGeneralTypeLabel(option) || ''),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="liabilityParty"
                control={control}
                rules={{ validate: (data) => !!data.id }}
                render={({ field }) => (
                  <Field
                    type="partylookup"
                    required
                    label={t('#tab.liabilities.liabilityparty')}
                    error={
                      errors.liabilityParty
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      ...field,
                      value: field.value.name,
                      onChange: field.onChange,
                    }}
                  />
                )}
              />
            </li>
          </ul>
          <ul className={classes.list}>
            <li className={classes.listItem}>
              <Controller
                name="startDate"
                control={control}
                rules={{
                  validate: (date) => (date ? isValid(date) : true),
                }}
                render={({ field }) => (
                  <Field
                    type="datepicker"
                    label={t('#tab.liabilities.startdate')}
                    error={
                      errors.startDate
                        ? ValidationError.InvalidDateFormat
                        : undefined
                    }
                    ControlProps={{
                      ...field,
                      date: field.value,
                      placeholder: t('#tab.liabilities.startdate.placeholder'),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  validate: (date) => (date ? isValid(date) : true),
                }}
                render={({ field }) => (
                  <Field
                    type="datepicker"
                    label={t('#tab.liabilities.enddate')}
                    error={
                      errors.endDate
                        ? ValidationError.InvalidDateFormat
                        : undefined
                    }
                    ControlProps={{
                      ...field,
                      date: field.value,
                      placeholder: t('#tab.liabilities.enddate.placeholder'),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="documentNumber"
                control={control}
                render={({ field }) => (
                  <Field
                    type="input"
                    label={t('#tab.liabilities.documentnumber')}
                    ControlProps={{
                      ...field,
                      type: 'text',
                      inputProps: {
                        maxLength: liabilitiesSettings.documentNumberMaxLength,
                      },
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="usage"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field
                    type="select"
                    required
                    label={t('#tab.liabilities.usage')}
                    error={
                      errors.usage && errors.usage.type === 'required'
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      inputRef: field.ref,
                      options: usageOptions,
                      name: 'usage',
                      getOptionLabel: (option) =>
                        t(getLiabilityUsageLabel(option) || ''),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="product"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field
                    type="select"
                    required
                    label={t('#tab.liabilities.product')}
                    error={
                      errors.product && errors.product.type === 'required'
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      inputRef: field.ref,
                      options: productOptions,
                      getOptionLabel: (option) =>
                        t(getLiabilityProductLabel(option) || ''),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Field
                    type="select"
                    label={t('#tab.liabilities.type')}
                    error={
                      errors.type && errors.type.type === 'required'
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      ...field,
                      options: typeOptions,
                      name: 'type',
                      getOptionLabel: (option) =>
                        t(getLiabilityTypeLabel(option) || ''),
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="quantity"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field
                    required
                    type="number"
                    label={t('#tab.liabilities.quantity')}
                    error={
                      errors.quantity && errors.quantity.type === 'required'
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      getInputRef: field.ref,
                      allowNegative: false,
                      decimalScale: 0,
                    }}
                  />
                )}
              />
            </li>
            <li className={classes.listItem}>
              <Controller
                name="priceItemRate"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Field
                    required
                    type="number"
                    label={t('#tab.liabilities.priceitemrate')}
                    error={
                      errors.priceItemRate &&
                      errors.priceItemRate.type === 'required'
                        ? ValidationError.Required
                        : undefined
                    }
                    ControlProps={{
                      value: field.value,
                      onChange: field.onChange,
                      getInputRef: field.ref,
                      allowNegative: false,
                      decimalScale: 2,
                      decimalSeparator: ',',
                    }}
                  />
                )}
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
            onClick={handleSaveAndNew}
            disabled={isDisabledSaveBtn}
            endIcon={
              requestState.saveAndNew ? (
                <CircularProgress size={17} className={classes.loader} />
              ) : undefined
            }
          >
            {t('#button.saveandnew')}
          </ActionButton>
          <ActionButton
            className={classes.btnOffset}
            disabled={isDisabledSaveBtn}
            onClick={handleSaveAndCopy}
            endIcon={
              requestState.saveAndCopy ? (
                <CircularProgress size={17} className={classes.loader} />
              ) : undefined
            }
          >
            {t('#button.saveandcopy')}
          </ActionButton>
          <ActionButton
            palette="darkBlue"
            type="submit"
            disabled={isDisabledSaveBtn}
            endIcon={
              requestState.save ? (
                <CircularProgress size={17} className={classes.loader} />
              ) : undefined
            }
          >
            {t('#button.save')}
          </ActionButton>
        </div>
      </form>
      <Dialog
        maxWidth="xs"
        open={isOpenSuccessDialog}
        handleClose={handleCloseSuccessDialog}
      >
        <SuccessDialogView
          onClose={handleCloseSuccessDialog}
          text={
            formType === 'create'
              ? 'Entity was successfully created'
              : 'Entity was successfully updated'
          }
        />
      </Dialog>
      <DialogError error={requestState.error} initError={handleInitError} />
    </>
  );
};

export type InitialFormValues = InitialValues;
export default LiabilityForm;
