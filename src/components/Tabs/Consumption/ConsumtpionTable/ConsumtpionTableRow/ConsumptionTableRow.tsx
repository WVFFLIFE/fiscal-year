import { ChangeEvent, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import { EditIcon, CloseIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface ConsumptionTableRowProps {
  data: number | null;
  field: string;
  label: string;
  disabled?: boolean;
  onSave(option: { [key: string]: number }): Promise<unknown>;
}

function isValidNumber(val: number) {
  return typeof val === 'number' && !isNaN(val);
}

const ConsumptionTableRow: React.FC<ConsumptionTableRowProps> = ({
  data,
  field,
  label,
  disabled,
  onSave,
}) => {
  const classes = useStyles();

  const [editMode, setEditMode] = useState(false);
  const [fieldData, setFieldData] = useState(data ? String(data) : '');

  const handleOpenEditMode = () => {
    setEditMode(true);
  };

  const handleCloseEditMode = () => {
    setEditMode(false);
  };

  const handleResetField = () => {
    setFieldData('');
    handleCloseEditMode();
  };

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, '');

    setFieldData(value);
  };

  const handleSave = async () => {
    await onSave({ [field]: +fieldData });
    handleResetField();
  };

  useEffect(() => {
    if (editMode) {
      setFieldData(data ? String(data) : '');
    } else {
      setFieldData('');
    }
  }, [editMode, data]);

  useEffect(() => {
    handleResetField();
  }, [data]);

  return (
    <Box
      className={clsx(classes.root, {
        [classes.disabled]: disabled,
      })}
    >
      <Box className={clsx(classes.cell, classes.label)}>{label}</Box>
      <Box className={clsx(classes.cell, classes.value)}>
        {editMode ? (
          <Input
            autoFocus
            value={fieldData}
            onChange={handleChangeData}
            classes={{
              root: classes.input,
            }}
            inputClasses={{ input: classes.input }}
          />
        ) : (
          data
        )}
      </Box>
      <Box className={clsx(classes.cell, classes.actions)}>
        {!disabled ? (
          editMode ? (
            <>
              <ActionButton
                palette="white"
                className={classes.btnOffset}
                onClick={handleCloseEditMode}
              >
                <CloseIcon className={classes.icon} />
              </ActionButton>
              <ActionButton
                palette="darkBlue"
                onClick={handleSave}
                disabled={!isValidNumber(+fieldData)}
              >
                <RoundCheckIcon className={classes.icon} />
              </ActionButton>
            </>
          ) : (
            <ActionButton
              palette="darkBlue"
              onClick={handleOpenEditMode}
              disabled={disabled}
            >
              <EditIcon className={classes.icon} />
            </ActionButton>
          )
        ) : null}
      </Box>
    </Box>
  );
};

export default ConsumptionTableRow;
