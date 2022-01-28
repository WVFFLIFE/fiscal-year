import useAddFormData from './useAddFormData';
import { useTranslation } from 'react-i18next';
import _has from 'lodash/has';

import NumberFormat from 'react-number-format';
import Box from '@mui/material/Box';
import { InputLabel, CancelButton, ApplyButton } from 'components/Styled';
import Input from 'components/Input';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import { useStyles } from './style';

interface AddFormProps {
  onClose(): void;
}

const AddForm: React.FC<AddFormProps> = ({ onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    formState,
    handleChangeDeficit,
    handleChangeProductName,
    upload,
    initValidation,
  } = useAddFormData(onClose);

  return (
    <form onSubmit={upload}>
      <h3 className={classes.title}>{t('#tab.balances.addnewproduct')}</h3>
      <Box marginBottom="20px">
        <InputLabel>
          {t('#tab.balances.addnewproduct.productname')}
          <sup className={classes.required}>*</sup>
        </InputLabel>
        <Input
          placeholder={t('#tab.balances.addnewproduct.enterproductname')}
          name="productName"
          value={formState.productName}
          onChange={handleChangeProductName}
          onFocus={initValidation}
          classes={{
            root: clsx({
              [classes.validationError]: _has(
                formState.validation,
                'productName'
              ),
            }),
          }}
        />
      </Box>
      <Box>
        <InputLabel>
          {t('#tab.balances.addnewproduct.deficit')}
          <sup className={classes.required}>*</sup>
        </InputLabel>
        <NumberFormat
          className={clsx(classes.numberInput, {
            [classes.validationError]: _has(
              formState.validation,
              'productName'
            ),
          })}
          decimalSeparator=","
          decimalScale={2}
          name="deficit"
          onChange={handleChangeDeficit}
          onFocus={initValidation}
          placeholder={t('#tab.balances.addnewproduct.enterdeficit')}
          thousandSeparator=" "
          value={formState.deficit}
        />
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginTop="40px"
      >
        <CancelButton className={classes.btnOffset} onClick={onClose}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton
          type="submit"
          disabled={
            !formState.deficit || !formState.productName || formState.uploading
          }
          endIcon={
            formState.uploading ? (
              <CircularProgress size={20} className={classes.loader} />
            ) : undefined
          }
        >
          {t('#button.add')}
        </ApplyButton>
      </Box>
    </form>
  );
};

export default AddForm;
