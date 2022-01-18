import { useState, useEffect, useCallback } from 'react';
import { Column } from '../models';

import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';
import { setActiveRowId, setPrevRowId } from 'features/balanceSlice';
import { selectBalanceSettings } from 'selectors/settingsSelectors';

import { toNumberFormat } from 'utils';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';
import _get from 'lodash/get';

function toNumber(val: string) {
  let newStr = '';

  for (let char of val) {
    if (char === ' ') {
      newStr += '';
    } else if (char === ',') {
      newStr += '.';
    } else {
      newStr += char;
    }
  }

  return Number(newStr);
  // return Number(val.replace(/ /g, '').replace(/,/g, '.'));
}

function isValidNumber(val: string) {
  return !!val && !isNaN(toNumber(val));
}

function toInputData(data: any, type: 'string' | 'number') {
  if (!data) return '';
  return data && type === 'number'
    ? toNumberFormat(Number(data)) || ''
    : String(data);
}

function getSettingsField(id: string) {
  switch (id) {
    case 'PropertyMeintenanceProductName':
      return 'propertyMaintenanceProductNameMaxLength';
    case 'VATCalculationsProductName':
      return 'vatCalculationsProductNameMaxLength';
    case 'SpecFinCalcProductName1':
      return 'specFinCalcProductName1MaxLength';
    case 'SpecFinCalcProductName2':
      return 'specFinCalcProductName2MaxLength';
    case 'SpecFinCalcProductName3':
      return 'specFinCalcProductName3MaxLength';
    case 'SpecFinCalcProductName4':
      return 'specFinCalcProductName4MaxLength';
    case 'SpecFinCalcProductName5':
      return 'specFinCalcProductName5MaxLength';
  }
}

const useBalancesTableRowData = <T extends object>(
  data: T,
  column: Column<T>
) => {
  const dispatch = useAppDispatch();
  const { prevRowId, activeRowId, balanceSettings } = useStateSelector(
    (state) => ({
      prevRowId: state.balance.prevRowId,
      activeRowId: state.balance.activeRowId,
      balanceSettings: selectBalanceSettings(state),
    })
  );

  const { type = 'string', onSave } = column;
  const isNumericType = type === 'number';

  const [activeEditMode, setActiveEditMode] = useState(false);
  const [inputData, setInputData] = useState('');
  const [touched, setTouched] = useState(false);

  const handleActivateEditMode = useCallback(() => {
    dispatch(setActiveRowId(column.id));
  }, [dispatch, column.id]);

  const handleResetEditMode = useCallback(() => {
    dispatch(setActiveRowId(null));
    setTouched(false);
  }, [dispatch]);

  const resetPrevRowId = () => {
    dispatch(setPrevRowId(null));
  };

  const handleChangeInputData = useCallback(
    (value: string) => {
      let val = value;
      if (column.field === 'productName') {
        const maxLengthFieldName = getSettingsField(column.id);
        const maxLength = maxLengthFieldName
          ? balanceSettings[maxLengthFieldName]
          : Infinity;

        if (value.length > maxLength) {
          val = value.substring(0, maxLength);
        }
      }
      setInputData(val);
      setTouched(true);
    },
    [balanceSettings]
  );

  const handleSave = async () => {
    const value = isNumericType ? toNumber(inputData) : inputData;
    await onSave(value);

    if (prevRowId) {
      resetPrevRowId();
    }

    setTouched(false);
  };

  useEffect(() => {
    if (activeRowId === column.id && !activeEditMode) {
      setActiveEditMode(true);
    } else {
      setActiveEditMode(false);
    }
  }, [activeRowId]);

  useEffect(() => {
    if (!activeEditMode && activeRowId && prevRowId === column.id && touched) {
      handleSave();
    }
  }, [activeEditMode]);

  useEffect(() => {
    if (activeEditMode) {
      setInputData(toInputData(_get(data, column.field, null), column.type));
    }
  }, [activeEditMode, data, column.type, column.field]);

  useEffect(() => {
    if (touched) {
      unsavedChangesTracker.addSaveAction(async () => {
        const value = isNumericType ? toNumber(inputData) : inputData;
        await onSave(value);

        return true;
      });
    } else {
      unsavedChangesTracker.resetSaveAction();
    }
  }, [touched, inputData, isNumericType]);

  const isValid = isNumericType ? isValidNumber(inputData) : !!inputData;

  return {
    inputData,
    activeEditMode,
    handleActivateEditMode,
    handleResetEditMode,
    handleChangeInputData,
    handleSave,
    isValid,
  };
};

export default useBalancesTableRowData;
