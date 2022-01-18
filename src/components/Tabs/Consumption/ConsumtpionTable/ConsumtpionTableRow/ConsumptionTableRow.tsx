import { ChangeEvent, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Input from 'components/Input';
import ActionButton from 'components/ActionButton';
import { EditIcon, CloseIcon, RoundCheckIcon } from 'components/Icons';
import Highlight from 'components/Highlight';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';

import clsx from 'clsx';
import { useStyles } from './style';

interface ConsumptionTableRowProps {
  active: boolean;
  data: number | null;
  field: string;
  label: string;
  disabled?: boolean;
  onSave(option: { [key: string]: number }): Promise<unknown>;
  onSelectActiveRow(id: string | null): void;
}

function isValidNumber(val: number) {
  return typeof val === 'number' && !isNaN(val);
}

function toInputData(data: any) {
  return typeof data === 'string' || typeof data === 'number'
    ? String(data)
    : '';
}

const ConsumptionTableRow: React.FC<ConsumptionTableRowProps> = ({
  active,
  data,
  field,
  label,
  disabled,
  onSave,
  onSelectActiveRow,
}) => {
  const classes = useStyles();

  const [fieldData, setFieldData] = useState(data ? String(data) : '');
  const [touched, setTouched] = useState(false);

  const handleActivateEditMode = () => {
    onSelectActiveRow(field);
  };

  const handleResetEditMode = () => {
    onSelectActiveRow(null);
  };

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9]/g, '');

    setFieldData(value);
    setTouched(true);
  };

  const handleSave = useCallback(async () => {
    await onSave({ [field]: +fieldData });

    if (active) {
      handleResetEditMode();
    }
  }, [active, field, fieldData]);

  const handleCancelBtnClick = () => {
    setTouched(false);
    handleResetEditMode();
  };

  useEffect(() => {
    if (touched) {
      unsavedChangesTracker.addSaveAction(async () => {
        await onSave({ [field]: +fieldData });
        return true;
      });
    } else {
      unsavedChangesTracker.resetSaveAction();
    }
  }, [touched, field, fieldData]);

  useEffect(() => {
    if (active) {
      setFieldData(toInputData(data));
    } else {
      setFieldData('');

      if (touched) {
        setTouched(false);
        handleSave();
      }
    }
  }, [active, data]);

  return (
    <Box
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.disabled]: disabled,
      })}
    >
      <Box className={clsx(classes.cell, classes.label)}>{label}</Box>
      <Box className={clsx(classes.cell, classes.value)}>
        {active ? (
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
          data && <Highlight text={String(data)} />
        )}
      </Box>
      <Box className={clsx(classes.cell, classes.actions)}>
        {!disabled ? (
          active ? (
            <>
              <ActionButton
                palette="white"
                className={classes.btnOffset}
                onClick={handleCancelBtnClick}
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
              onClick={handleActivateEditMode}
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
