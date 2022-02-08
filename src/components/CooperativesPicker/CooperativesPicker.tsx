import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { CommonCooperativeModel } from 'models';

import { getMyOwnCooperatives } from 'utils';

import Picker from 'components/controls/Picker';
import SingleView from './SingleView';
import MultipleView from './MultipleView';

import clsx from 'clsx';
import { useStyles } from './style';

function isAllMyOwn(
  cooperatives: CommonCooperativeModel[],
  selectedCooperatives: CommonCooperativeModel[]
) {
  const allMyOwnCoops = getMyOwnCooperatives(cooperatives);
  const selectedMyOwnCooperatives = getMyOwnCooperatives(selectedCooperatives);

  return allMyOwnCoops.length === selectedMyOwnCooperatives.length;
}

interface CooperativesPickerProps {
  className?: string;
  /**
   * If `true`, the menu will support multiple selections
   * @default false
   */
  multiple?: boolean;
  /**
   * If `true` component will be disabled
   * @default false
   */
  disabled?: boolean;
  /**
   * List of cooperatives
   */
  cooperatives: CommonCooperativeModel[];
  /**
   * List of selected cooperatives
   */
  selectedCooperatives: CommonCooperativeModel[];
  /**
   * Callback fired when cooperative(s) will be selected (in single mode)
   * or apply button will be clicked (multiple mode)
   * @param {CommonCooperativeModel[]} cooperatives
   */
  onSelectCooperatives(cooperatives: CommonCooperativeModel[]): void;
}

const CooperativesPicker: React.FC<CooperativesPickerProps> = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    cooperatives,
    onSelectCooperatives,
    selectedCooperatives,
    className,
    disabled = false,
    multiple = false,
  } = props;

  const renderValue = () => {
    if (!selectedCooperatives.length) return null;

    if (selectedCooperatives.length === 1) {
      const [coop] = selectedCooperatives;
      return coop.Name;
    }

    if (isAllMyOwn(cooperatives, selectedCooperatives)) {
      return t('#control.allowncooperativeselected');
    }

    return t('#control.partailcooperativesselected', {
      num: selectedCooperatives.length,
    });
  };

  const renderBody = (onClosePicker: () => void) => {
    return (
      <div className={classes.body}>
        {multiple ? (
          <MultipleView
            cooperatives={cooperatives}
            selectedCooperatives={selectedCooperatives}
            onClose={onClosePicker}
            onSelect={onSelectCooperatives}
          />
        ) : (
          <SingleView
            cooperatives={cooperatives}
            selectedCooperatives={selectedCooperatives}
            onClose={onClosePicker}
            onSelect={onSelectCooperatives}
          />
        )}
      </div>
    );
  };

  return (
    <Picker
      className={clsx(classes.picker, className)}
      disabled={disabled}
      placeholder={`- ${t('#control.cooperativepicker.placeholder')} -`}
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default memo(CooperativesPicker);
