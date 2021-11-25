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

interface BaseCooperativesListProps {
  showExtendedList: boolean;
  selectedCooperatives: CommonCooperativeModel[];
  calendarYear: CalendarYearOption | null;
  commonCooperatives: CommonCooperativeModel[];
  extendedCooperatives: ExtendedCooperativeModel[];
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
  onChangeDefaultCooperative,
  onChangeCalendarYear,
  onChangeCooperatives,
  onShowExtendedList,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const { searchTerm, onChangeSearchTerm } = useSearchTerm();

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
        <Box padding={4} paddingX={2}>
          <ApplyButton
            disabled={isDisabledApplyButton}
            onClick={onShowExtendedList}
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
              cooperatives={extendedCooperatives}
              onSelectCooperative={onChangeDefaultCooperative}
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
