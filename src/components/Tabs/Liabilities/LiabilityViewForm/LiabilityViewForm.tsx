import useLiabilityViewFormData from './useLiabilityViewFormData';

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
                Edit Liability
              </ActionButton>
            )}
          </div>
          <div className={classes.divider}></div>
          <div className={classes.columnsWrapper}>
            <ul className={classes.column}>
              <li className={classes.listItem}>
                <Field
                  label="Liability Name"
                  data={_get(liability, 'Name', null)}
                  required
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="Organization"
                  data={_get(liability, 'OrganizationName', null)}
                  required
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="Description"
                  data={_get(liability, 'Description', null)}
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label="Liability Type"
                  data={getLiabilityGeneralTypeLabel(
                    _get(liability, 'GeneralType', null)
                  )}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label="Liability Party"
                  data={_get(liability, 'PartyName', null)}
                />
              </li>
            </ul>
            <ul className={classes.column}>
              <li className={classes.listItem}>
                <Field
                  label="Start date"
                  data={_get(liability, 'StartDate', null)}
                  type="date"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="End date"
                  data={_get(liability, 'EndDate', null)}
                  type="date"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="Document number"
                  data={_get(liability, 'DocumentNumber')}
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="Usage"
                  data={getLiabilityUsageLabel(_get(liability, 'Usage', null))}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label="Product"
                  data={getLiabilityProductLabel(
                    _get(liability, 'Product', null)
                  )}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  label="Type"
                  data={getLiabilityTypeLabel(_get(liability, 'Type', null))}
                  type="translate"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label="Quantity"
                  data={_get(liability, 'Quantity', null)}
                  type="float6"
                />
              </li>
              <li className={classes.listItem}>
                <Field
                  required
                  label="Price item rate"
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
