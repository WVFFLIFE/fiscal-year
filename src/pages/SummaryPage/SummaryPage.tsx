import { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import useSummaryPageData from './useSummaryPageData';

import { CommonCooperativeModel } from 'models';
import { buildCalendarYearOptions } from './utils';

import Box from '@mui/material/Box';
import PageSearch from 'components/controls/PageSearch';
import CooperativesPicker from 'components/CooperativesPicker';
import SelectCalendarYear from 'components/SelectCalendarYear';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import {
  FiltersWrapper,
  ApplyButton,
  InfoBox,
  Container,
  IconButton,
} from 'components/Styled';
import { RefreshIcon } from 'components/Icons';
import GeneralCooperativeTable from 'components/GeneralCooperativesTable';
import ContainerTopBar from './ContainerTopBar';

import { useStyles } from './style';

const calendarYearOptions = buildCalendarYearOptions(
  new Date('01.01.2017'),
  new Date()
);

const quickFilterOptions: QuickFilterOption[] = [
  { id: 'open_fy', label: '#control.quickfilter.openfy' },
  { id: 'open_fc', label: '#control.quickfilter.openfc' },
];

interface SummaryPageProps {
  commonCooperatives: CommonCooperativeModel[];
}

const SummaryPage: FC<SummaryPageProps> = ({ commonCooperatives }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    state,
    searchTerm,
    handleChangeSearchTerm,
    handleInitError,
    handleRefreshCooperatives,
    handleChangeActiveQuickFilter,
    handleChangeCalendarYear,
    handleSelectCooperative,
    handleChangeSelectedCooperatives,
  } = useSummaryPageData();

  const filteredExtendedCooperatives = useMemo(() => {
    return state.extendedCooperatives.filter((coop) => {
      return state.selected.quickFilter === 'open_fy'
        ? !coop.IsFiscalYearClosed
        : state.selected.quickFilter === 'open_fc'
        ? !coop.IsFinancialCalculationsAccepted
        : true;
    });
  }, [state.extendedCooperatives, state.selected.quickFilter]);

  const areCooperativesSelected = !!state.selected.cooperatives.length;
  const isDisabledCalendarYearPicker = !areCooperativesSelected;
  const isCalendarYearSelected = !!state.selected.calendarYear;
  const isEmptyFilter = isDisabledCalendarYearPicker || !isCalendarYearSelected;
  const isDisabledQuickFilter =
    !!isEmptyFilter && !state.extendedCooperatives.length;

  const hint = !areCooperativesSelected
    ? '#info.selectcooperative'
    : !isCalendarYearSelected
    ? '#info.selectcalendaryear'
    : '';

  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            className={classes.cooperativesPicker}
            multiple
            cooperatives={commonCooperatives}
            selectedCooperatives={state.selected.cooperatives}
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <SelectCalendarYear
            value={state.selected.calendarYear}
            options={calendarYearOptions}
            onChange={handleChangeCalendarYear}
            disabled={isDisabledCalendarYearPicker}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <QuickFilter
            itemClassName={classes.filterItem}
            active={state.selected.quickFilter}
            onChange={handleChangeActiveQuickFilter}
            options={quickFilterOptions}
            disabled={isDisabledQuickFilter}
          />
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Box padding={4} paddingLeft={2} paddingRight={1}>
            <IconButton
              className={classes.refreshBtn}
              onClick={handleRefreshCooperatives}
            >
              <RefreshIcon className={classes.refreshIcon} />
            </IconButton>
          </Box>
          <Box padding={4} paddingRight={2} paddingLeft={1}>
            <PageSearch
              searchTerm={searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </Box>
        </Box>
      </FiltersWrapper>
      {isEmptyFilter && <InfoBox>{t(hint)}</InfoBox>}
      {!isEmptyFilter &&
        (state.extendedCooperatives.length ? (
          <Container className={classes.offsetTop}>
            {state.current.cooperatives.length &&
              state.current.calendarYear && (
                <ContainerTopBar
                  className={classes.offsetBottom}
                  cooperatives={commonCooperatives}
                  selectedCooperatives={state.current.cooperatives}
                  selectedCalendarYear={state.current.calendarYear}
                />
              )}
            <GeneralCooperativeTable
              searchTerm={searchTerm}
              cooperatives={filteredExtendedCooperatives}
              onSelectCooperative={handleSelectCooperative}
              fetchExtendedCooperativesList={handleRefreshCooperatives}
            />
          </Container>
        ) : state.fetched ? (
          <InfoBox>{t('#info.nocooperatives')}</InfoBox>
        ) : null)}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default SummaryPage;
