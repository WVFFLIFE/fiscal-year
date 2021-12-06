import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

interface PseudoTableRowProps<T extends { [key: string]: any } = {}> {
  data: T;
  column: PseudoTableColumn<T>;
  disabled?: boolean;
  className?: string;
}

const PseudoTableRow = <T extends { [key: string]: any } = {}>({
  data,
  column,
  disabled,
  className,
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
      field: typeof val === 'string' ? val : '',
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
            value={editState.field}
            onChange={handleChangeActiveField}
            classes={{ root: classes.input }}
            inputClasses={{ input: classes.input }}
          />
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
              >
                <CloseIcon className={classes.icon} />
              </ActionButton>
              <ActionButton palette="darkBlue" size="small">
                <RoundCheckIcon className={classes.icon} />
              </ActionButton>
            </>
          ) : (
            <ActionButton
              palette="darkBlue"
              size="small"
              onClick={handleOpenEditModel}
            >
              <EditIcon className={classes.icon} />
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
};

export default PseudoTableRow;
