import { ChangeEvent, useState, useEffect, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { toNumberFormat } from 'utils';

import { PseudoTableColumn } from '../PseudoTable';
import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import { EditIcon, CloseIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface EditStateModel {
  open: boolean;
  field: string;
}

function toNumber(val: string) {
  return Number(val.replace(/ /g, '').replace(/,/g, '.'));
}

function isValidNumber(val: string) {
  return !!val && !isNaN(toNumber(val));
}

interface PseudoTableRowProps<T extends { [key: string]: any } = {}> {
  data: T;
  column: PseudoTableColumn<T>;
  disabled?: boolean;
  className?: string;
  onSave(options: { [key: string]: string | number }, cb?: () => void): void;
}

const PseudoTableRow = <T extends { [key: string]: any } = {}>({
  data,
  column,
  disabled,
  className,
  onSave,
}: PseudoTableRowProps<T>) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [editState, setEditState] = useState<EditStateModel>({
    open: false,
    field: '',
  });

  const handleOpenEditModel = () => {
    const val = data[column.field];
    setEditState({
      open: true,
      field:
        column.type === 'number'
          ? val
            ? toNumberFormat(val) || ''
            : ''
          : val
          ? String(val)
          : '',
    });
  };

  const handleCloseEditMode = () => {
    setEditState({
      open: false,
      field: '',
    });
  };

  const handleChangeActiveField = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setEditState((prevState) => ({
      ...prevState,
      field: value,
    }));
  };

  const handleChangeNumber = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/[^0-9,]/g, '')
      .replace(/[,](?=.*[,])/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const [num, decimal] = value.split(',');

    if (decimal?.length > 2) {
      value = `${num},${decimal.substr(0, 2)}`;
    }

    setEditState((prevState) => ({
      ...prevState,
      field: value,
    }));
  };

  const handleSave = () => {
    onSave(
      {
        [column.field]:
          column.type === 'number'
            ? toNumber(editState.field)
            : editState.field,
      },
      handleCloseEditMode
    );
  };

  useEffect(() => {
    handleCloseEditMode();
  }, [data]);

  const isValid =
    column.type === 'number'
      ? isValidNumber(editState.field)
      : !!editState.field;

  return (
    <div
      className={clsx(classes.row, className, {
        [classes.disabled]: disabled,
      })}
    >
      <div className={classes.item}>{t(column.label)}</div>
      <div className={clsx(classes.item, classes.inputWrapper)}>
        {editState.open ? (
          <Input
            value={String(editState.field)}
            onChange={
              column.type === 'number'
                ? handleChangeNumber
                : handleChangeActiveField
            }
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
          data[column.field]
        )}
      </div>
      {column.editable && (
        <div className={clsx(classes.item, classes.actions)}>
          {editState.open ? (
            <>
              <ActionButton
                palette="white"
                size="small"
                className={classes.btnOffset}
                onClick={handleCloseEditMode}
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
              onClick={handleOpenEditModel}
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

export default memo(PseudoTableRow);
