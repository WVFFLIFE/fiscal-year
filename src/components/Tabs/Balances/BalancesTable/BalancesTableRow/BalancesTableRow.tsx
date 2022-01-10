import { memo } from 'react';
import useBalancesTableRowData from './useBalancesTableRowData';
import { Column } from '../models';
import { useTranslation } from 'react-i18next';

import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import { EditIcon, CloseIcon, RoundCheckIcon } from 'components/Icons';
import Highlight from 'components/Highlight';

import clsx from 'clsx';
import { useStyles } from './style';

interface BalancesTableRowProps<T extends object> {
  className?: string;
  data: T;
  column: Column<T>;
  disabled?: boolean;
}

const BalancesTableRow = <T extends object>({
  data,
  column,
  className,
  disabled,
}: BalancesTableRowProps<T>) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const isDisabled = disabled || column.disabled;

  const {
    inputData,
    toggleEditMode,
    editModeOn,
    handleChangeInputData,
    handleSave,
    isValid,
  } = useBalancesTableRowData(data, column);

  const text = String(data[column.field]);

  return (
    <div
      className={clsx(classes.row, className, {
        [classes.disabled]: isDisabled,
      })}
    >
      <div className={classes.item}>{t(column.label)}</div>
      <div className={clsx(classes.item, classes.inputWrapper)}>
        {editModeOn ? (
          <Input
            value={inputData}
            onChange={handleChangeInputData}
            classes={{
              root: clsx(classes.input, {
                [classes.warning]: !isValid,
              }),
            }}
            inputClasses={{ input: classes.input }}
          />
        ) : column.render ? (
          column.render(data)
        ) : (
          text && <Highlight text={text} />
        )}
      </div>
      {column.editable && (
        <div className={clsx(classes.item, classes.actions)}>
          {editModeOn ? (
            <>
              <ActionButton
                palette="white"
                size="small"
                className={classes.btnOffset}
                onClick={toggleEditMode}
                disabled={disabled}
              >
                <CloseIcon className={classes.icon} />
              </ActionButton>
              <ActionButton
                palette="darkBlue"
                size="small"
                disabled={!isValid || disabled}
                onClick={handleSave}
              >
                <RoundCheckIcon className={classes.icon} />
              </ActionButton>
            </>
          ) : (
            <ActionButton
              palette="darkBlue"
              size="small"
              onClick={toggleEditMode}
              disabled={disabled}
            >
              <EditIcon className={classes.icon} />
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(BalancesTableRow);
