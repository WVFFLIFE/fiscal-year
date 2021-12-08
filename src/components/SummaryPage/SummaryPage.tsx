import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSummaryPageData from './useSummaryPageData';
import useSearchTerm from 'hooks/useSearchTerm';
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
  { id: 'open_fy', label: 'Open FY' },
  { id: 'open_fc', label: 'Open FC' },
];

interface SummaryPageProps {
  commonCooperatives: CommonCooperativeModel[];
}

const SummaryPage: React.FC<SummaryPageProps> = ({ commonCooperatives }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    state,
    handleInitError,
    isDisabledApplyButton,
    handleLoadCooperatives,
    handleRefreshCooperatives,
    handleChangeActiveQuickFilter,
    handleChangeCalendarYear,
    handleSelectCooperative,
    handleChangeSelectedCooperatives,
  } = useSummaryPageData();

  const { searchTerm, onChangeSearchTerm } = useSearchTerm();

  const filteredExtendedCooperatives = useMemo(() => {
    return state.extendedCooperatives.filter((coop) => {
      return state.selected.quickFilter === 'open_fy'
        ? !coop.IsFiscalYearClosed
        : state.selected.quickFilter === 'open_fc'
        ? !coop.IsFinancialCalculationsAccepted
        : true;
    });
  }, [state.extendedCooperatives, state.selected.quickFilter]);

  const isDisabledCalendarYearPicker = !!!state.selected.cooperatives.length;
  const isSelectedCalendarYear = !!state.selected.calendarYear;
  const isEmptyFilter = isDisabledCalendarYearPicker || !isSelectedCalendarYear;
  const show = !isEmptyFilter;

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
        <Box marginRight={4} padding={4} paddingX={2}>
          <ApplyButton
            disabled={isDisabledApplyButton}
            onClick={handleLoadCooperatives}
          >
            {t('#button.apply')}
          </ApplyButton>
        </Box>
        <Box padding={4} paddingX={2}>
          <QuickFilter
            itemClassName={classes.filterItem}
            active={state.selected.quickFilter}
            onChange={handleChangeActiveQuickFilter}
            options={quickFilterOptions}
            disabled={!show && !state.extendedCooperatives.length}
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
            <PageSearch searchTerm={searchTerm} onChange={onChangeSearchTerm} />
          </Box>
        </Box>
      </FiltersWrapper>
      {isEmptyFilter && <InfoBox>{t(hint)}</InfoBox>}
      {show ? (
        state.extendedCooperatives.length ? (
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
        ) : (
          <InfoBox>{t('#info.nocooperatives')}</InfoBox>
        )
      ) : null}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default SummaryPage;
