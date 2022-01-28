import useLiabilityViewFormData from './useLiabilityViewFormData';
import { useTranslation } from 'react-i18next';

import {
  getLiabilityGeneralTypeLabel,
  getLiabilityProductLabel,
  getLiabilityTypeLabel,
  getLiabilityUsageLabel,
} from 'configs/dictionaries';
import _get from 'lodash/get';

import SuspenceFacade from 'components/SuspenceFacade';
import ModifiedInfo from './ModifiedInfo';
import Field from './Field';
import ActionButton from 'components/ActionButton';
import EditIcon from 'components/Icons/EditIcon';

import { useStyles } from './style';

interface LiabilityViewFormProps {
  id: string;
  isClosed: boolean;
  onEdit(): void;
}

const LiablityViewForm: React.FC<LiabilityViewFormProps> = ({
  id,
  isClosed,
  onEdit,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { requestState, handleInitError } = useLiabilityViewFormData(id);

  const { loading, error, liability } = requestState;

  return (
    <SuspenceFacade
      loading={loading}
      error={error}
      onInitError={handleInitError}
    >
      {liability && (
        <div>
          <div className={classes.top}>
            <ModifiedInfo
              className={classes.modifiedInfo}
              createdBy={liability.CreatedByName}
              createdOn={liability.CreatedOn}
              modifiedBy={liability.ModifiedByName}
              modifiedOn={liability.ModifiedOn}
            />
            {!isClosed && (
              <ActionButton
                palette="darkBlue"
                startIcon={<EditIcon />}
                onClick={onEdit}
              >
                {t('#tab.liabilities.edit')}
              </ActionButton>
            )}
          </div>
          <div className={classes.divider}></div>
          <div className={classes.columnsWrapper}>
            <ul className={classes.column}>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.liabilityname')}
                  data={_get(liability, 'Name', null)}
                  required
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.organization')}
                  data={_get(liability, 'OrganizationName', null)}
                  required
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.description')}
                  data={_get(liability, 'Description', null)}
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label={t('#tab.liabilities.liabilitytype')}
                  data={getLiabilityGeneralTypeLabel(
                    _get(liability, 'GeneralType', null)
                  )}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label={t('#tab.liabilities.liabilityparty')}
                  data={_get(liability, 'PartyName', null)}
                />
              </li>
            </ul>
            <ul className={classes.column}>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.startdate')}
                  data={_get(liability, 'StartDate', null)}
                  type="date"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.enddate')}
                  data={_get(liability, 'EndDate', null)}
                  type="date"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.documentnumber')}
                  data={_get(liability, 'DocumentNumber')}
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.usage')}
                  data={getLiabilityUsageLabel(_get(liability, 'Usage', null))}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label={t('#tab.liabilities.product')}
                  data={getLiabilityProductLabel(
                    _get(liability, 'Product', null)
                  )}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label={t('#tab.liabilities.type')}
                  data={getLiabilityTypeLabel(_get(liability, 'Type', null))}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label={t('#tab.liabilities.quantity')}
                  data={_get(liability, 'Quantity', null)}
                  type="int"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label={t('#tab.liabilities.priceitemrate')}
                  data={_get(liability, 'PriceItemRate', null)}
                  type="money"
                />
              </li>
            </ul>
          </div>
        </div>
      )}
    </SuspenceFacade>
  );
};

export default LiablityViewForm;
