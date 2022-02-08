import { memo } from 'react';
import useBalancesTableRowData from './useBalancesTableRowData';
import { Column } from '../models';
import { useTranslation } from 'react-i18next';

import Highlight from 'components/Highlight';
import TextEditor from './TextEditor';
import RowActions from './RowActions';

import clsx from 'clsx';
import { useStyles } from './style';

interface BalancesTableRowProps<T extends object> {
  className?: string;
  data: T;
  column: Column<T>;
  disabled?: boolean;
  rowColor?: string;
}

const BalancesTableRow = <T extends object>({
  data,
  column,
  className,
  disabled,
  rowColor,
}: BalancesTableRowProps<T>) => {
  const classes = useStyles({ background: rowColor });
  const { t } = useTranslation();

  const {
    activeEditMode,
    inputData,
    isValid,
    handleChangeInputData,
    handleActivateEditMode,
    handleResetEditMode,
    handleSaveCurrent,
  } = useBalancesTableRowData(data, column);

  const text = data[column.field];

  return (
    <div
      className={clsx(classes.row, {
        [classes.active]: activeEditMode,
        [classes.disabled]: disabled || !column.editable,
        [classes.rowDisabled]: column.disabled,
      })}
    >
      <div className={classes.item}>{t(column.label)}</div>
      <div className={clsx(classes.item, classes.inputWrapper)}>
        {activeEditMode ? (
          <TextEditor
            autoFocus
            className={clsx(classes.input, { [classes.warning]: !isValid })}
            type={column.type}
            value={inputData}
            onChange={handleChangeInputData}
          />
        ) : column.render ? (
          column.render(data)
        ) : text ? (
          <Highlight text={String(text)} />
        ) : (
          '---'
        )}
      </div>
      {column.editable ? (
        <div className={clsx(classes.item, classes.actions)}>
          <RowActions
            active={activeEditMode}
            onActivateEditMode={handleActivateEditMode}
            onResetEditMode={handleResetEditMode}
            onSave={handleSaveCurrent}
            disabled={disabled}
            isValid={isValid}
          />
        </div>
      ) : (
        <div className={classes.item}></div>
      )}
    </div>
  );
};

export default memo(BalancesTableRow);
