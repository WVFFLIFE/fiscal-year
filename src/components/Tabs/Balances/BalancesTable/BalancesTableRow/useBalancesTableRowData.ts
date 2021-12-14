import { useState, useEffect, ChangeEvent } from 'react';
import { Column } from '../models';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { toIntStr, toFloatStr, toNumberFormat } from 'utils';
import _get from 'lodash/get';

function toNumber(val: string) {
  return Number(val.replace(/ /g, '').replace(/,/g, '.'));
}

function isValidNumber(val: string) {
  return !!val && !isNaN(toNumber(val));
}

function converToTypeFormat(val: string, type: 'string' | 'int' | 'float') {
  switch (type) {
    case 'string':
      return val;
    case 'float':
      return toFloatStr(val);
    case 'int':
      return toIntStr(val);
    default:
      return val;
  }
}

const useBalancesTableRowData = <T extends object>(
  data: T,
  column: Column<T>
) => {
  const { type = 'string', onSave } = column;
  const isNumericType = type === 'float' || type === 'int';

  const [editModeOn, toggleEditMode] = useToggleSwitch(false);
  const [inputData, setInputData] = useState(() =>
    data[column.field] && column.type === 'float'
      ? toNumberFormat(Number(data[column.field])) || ''
      : String(_get(data, column.field, ''))
  );

  const handleChangeInputData = (e: ChangeEvent<HTMLInputElement>) => {
    let val = converToTypeFormat(e.target.value, type);

    setInputData(val);
  };

  const handleSave = async () => {
    const value = isNumericType ? toNumber(inputData) : inputData;
    await onSave(value);
  };

  useEffect(() => {
    if (!editModeOn) {
      setInputData('');
    } else {
      setInputData(
        data[column.field] && column.type === 'float'
          ? toNumberFormat(Number(data[column.field])) || ''
          : String(_get(data, column.field, ''))
      );
    }
  }, [editModeOn, data, column.type, column.field]);

  const isValid = isNumericType ? isValidNumber(inputData) : !!inputData;

  return {
    inputData,
    editModeOn,
    toggleEditMode,
    handleChangeInputData,
    handleSave,
    isValid,
  };
};

export default useBalancesTableRowData;
