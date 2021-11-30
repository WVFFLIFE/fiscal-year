import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useSearchTerm from 'hooks/useSearchTerm';
import {
  ExtendedCooperativeModel,
  CommonCooperativeModel,
  CalendarYearOption,
} from 'models';
import { buildCalendarYearOptions } from './utils';

import Box from '@mui/material/Box';
import PageSearch from 'components/controls/PageSearch';
import CooperativesPicker from 'components/CooperativesPicker';
import SelectCalendarYear from 'components/SelectCalendarYear';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import {
  FiltersWrapper,
  ApplyButton,
  InfoBox,
  Container,
} from 'components/Styled';
import GeneralCooperativeTable from 'components/GeneralCooperativesTable';
import ContainerTopBar from './ContainerTopBar';

import { useStyles } from './style';

const calendarYearOptions = buildCalendarYearOptions(
  new Date('01.01.2017'),
  new Date()
);

const quickFilterOptions: QuickFilterOption[] = [
  { id: 'open_fy', label: 'Open FY' },
  { id: 'open_fc', label: 'Open FC' },
];

interface BaseCooperativesListProps {
  showExtendedList: boolean;
  selectedCooperatives: CommonCooperativeModel[];
  calendarYear: CalendarYearOption | null;
  commonCooperatives: CommonCooperativeModel[];
  extendedCooperatives: ExtendedCooperativeModel[];
  fetchExtendedCooperativesList(): Promise<void>;
  onChangeDefaultCooperative(
    defaultCooperative: ExtendedCooperativeModel
  ): void;
  onChangeCalendarYear(calendarYear: CalendarYearOption): void;
  onChangeCooperatives(coops: CommonCooperativeModel[]): void;
  onShowExtendedList(): void;
}

const BaseCooperativesList: React.FC<BaseCooperativesListProps> = ({
  showExtendedList,
  selectedCooperatives,
  calendarYear,
  commonCooperatives,
  extendedCooperatives,
  fetchExtendedCooperativesList,
  onChangeDefaultCooperative,
  onChangeCalendarYear,
  onChangeCooperatives,
  onShowExtendedList,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(
    null
  );
  const { searchTerm, onChangeSearchTerm } = useSearchTerm();

  const handleChangeActiveQuickFilter = useCallback(
    (newQuickFilter: string) => {
      setActiveQuickFilter((prevState) =>
        prevState === newQuickFilter ? null : newQuickFilter
      );
    },
    []
  );

  const filteredExtendedCooperatives = useMemo(() => {
    return extendedCooperatives.filter((coop) => {
      return activeQuickFilter === 'open_fy'
        ? !coop.IsFiscalYearClosed
        : activeQuickFilter === 'open_fc'
        ? !coop.IsFinancialCalculationsAccepted
        : true;
    });
  }, [extendedCooperatives, activeQuickFilter]);

  const isDisabledCalendarYearPicker = !!!selectedCooperatives.length;
  const isSelectedCalendarYear = !!calendarYear;
  const isEmptyFilter = isDisabledCalendarYearPicker || !isSelectedCalendarYear;
  const isDisabledApplyButton = isEmptyFilter;
  const show = showExtendedList && !isEmptyFilter;

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
            selectedCooperatives={selectedCooperatives}
            onSelectCooperatives={onChangeCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <SelectCalendarYear
            value={calendarYear}
            options={calendarYearOptions}
            onChange={onChangeCalendarYear}
            disabled={isDisabledCalendarYearPicker}
          />
        </Box>
        <Box marginRight={4} padding={4} paddingX={2}>
          <ApplyButton
            disabled={isDisabledApplyButton}
            onClick={onShowExtendedList}
          >
            {t('#button.apply')}
          </ApplyButton>
        </Box>
        <Box padding={4} paddingX={2}>
          <QuickFilter
            itemClassName={classes.filterItem}
            active={activeQuickFilter}
            onChange={handleChangeActiveQuickFilter}
            options={quickFilterOptions}
            disabled={!show && !extendedCooperatives.length}
          />
        </Box>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          padding={4}
          paddingX={2}
        >
          <PageSearch searchTerm={searchTerm} onChange={onChangeSearchTerm} />
        </Box>
      </FiltersWrapper>
      {isEmptyFilter && <InfoBox>{t(hint)}</InfoBox>}
      {show ? (
        extendedCooperatives.length ? (
          <Container className={classes.offsetTop}>
            <ContainerTopBar
              className={classes.offsetBottom}
              cooperatives={commonCooperatives}
              selectedCooperatives={selectedCooperatives}
              selectedCalendarYear={calendarYear}
            />
            <GeneralCooperativeTable
              searchTerm={searchTerm}
              cooperatives={filteredExtendedCooperatives}
              onSelectCooperative={onChangeDefaultCooperative}
              fetchExtendedCooperativesList={fetchExtendedCooperativesList}
            />
          </Container>
        ) : (
          <InfoBox>{t('#info.nocooperatives')}</InfoBox>
        )
      ) : null}
    </>
  );
};

export default BaseCooperativesList;
