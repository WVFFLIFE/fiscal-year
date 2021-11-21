import { useTranslation } from 'react-i18next';
import useBaseCooperativesListData from './useBaseCooperativesListData';
import { ExtendedCooperativeModel, CommonCooperativeModel } from 'models';

import Box from '@mui/material/Box';
import PageSearch from 'components/controls/PageSearch';
import CooperativesPicker from 'components/CooperativesPicker';
import SelectCalendarYear from 'components/SelectCalendarYear';
import { FiltersWrapper, ApplyButton, InfoBox } from 'components/Styled';
import GeneralCooperativeTable from 'components/GeneralCooperativesTable';

interface BaseCooperativesListProps {
  commonCooperatives: CommonCooperativeModel[];
  extendedCooperatives: ExtendedCooperativeModel[];
  fetchExtendedCooperativesList(
    coopIds: string[],
    startDate: string,
    endDate: string
  ): Promise<void>;
  onChangeDefaultCooperative(
    defaultCooperative: ExtendedCooperativeModel
  ): void;
}

const BaseCooperativesList: React.FC<BaseCooperativesListProps> = ({
  commonCooperatives,
  extendedCooperatives,
  fetchExtendedCooperativesList,
  onChangeDefaultCooperative,
}) => {
  const { t } = useTranslation();
  const {
    state,
    selected,
    calendarYearOptions,
    handleChangeSelectedCooperatives,
    handleChangeCalendarYear,
    handleChangeSearchTerm,
    handleShowExtendedCooperatives,
  } = useBaseCooperativesListData(fetchExtendedCooperativesList);

  const isDisabledCalendarYearPicker = !!!selected.cooperatives.length;
  const isSelectedCalendarYear = !!selected.calendarYear;
  const isEmptyFilter = isDisabledCalendarYearPicker || !isSelectedCalendarYear;
  const isDisabledApplyButton = isEmptyFilter;
  const showExtendedList = !isEmptyFilter && !!extendedCooperatives.length;

  const hint = isDisabledCalendarYearPicker
    ? '#info.selectcooperative'
    : !isSelectedCalendarYear
    ? 'Please select calendar year'
    : '';

  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            multiple
            cooperatives={commonCooperatives}
            selectedCooperatives={selected.cooperatives}
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <SelectCalendarYear
            value={selected.calendarYear}
            options={calendarYearOptions}
            onChange={handleChangeCalendarYear}
            disabled={isDisabledCalendarYearPicker}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <ApplyButton
            disabled={isDisabledApplyButton}
            onClick={handleShowExtendedCooperatives}
          >
            {t('#button.apply')}
          </ApplyButton>
        </Box>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          padding={4}
          paddingX={2}
        >
          <PageSearch
            searchTerm={state.searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Box>
      </FiltersWrapper>
      {isEmptyFilter && <InfoBox>{t(hint)}</InfoBox>}
      {showExtendedList && (
        <GeneralCooperativeTable
          cooperatives={extendedCooperatives}
          onSelectCooperative={onChangeDefaultCooperative}
        />
      )}
    </>
  );
};

export default BaseCooperativesList;
