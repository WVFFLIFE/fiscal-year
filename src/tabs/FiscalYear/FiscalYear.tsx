import { useState, useCallback } from 'react';
import { FiscalYearModel, MockCooperative } from 'models';
import { useTranslation } from 'react-i18next';

import { cooperatives, fiscalYears } from 'mock';

import { FiltersWrapper } from 'components/Styled';
import Box from '@mui/material/Box';
import Title from 'components/Title';
import FiscalYearPicker from 'components/FiscalYearPicker';
import CooperativesPicker from 'components/CooperativesPicker';
import PageSearch from 'components/controls/PageSearch';
import Button from 'components/Button';
import AddFiscalYearButton from 'components/AddFiscalYearButton';
import { LockIcon, CopyIcon } from 'components/Icons';
import { ApplyButton } from 'components/Styled';
import Input from 'components/Input';
import Select from 'components/Select';

import GeneralInformationTable from 'components/GeneralInformationTable';

import TextEditor from 'components/TextEditor';

import { useStyles } from './style';

const FiscalYear = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState<FiscalYearModel | null>(null);
  const [selectedCooperatives, setSelectedCooperatives] = useState<
    MockCooperative[]
  >([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectValue, setSelectValue] = useState('test');
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleChangeSelect = (val: typeof selectValue) => {
    setSelectValue(val);
  };

  const handleChangeSelectedFiscalYear = useCallback(
    (fiscalYear: FiscalYearModel | null) => {
      setSelectedFiscalYear(fiscalYear);
    },
    []
  );

  const handleChangeSelectedCooperatives = useCallback(
    (newCooperatives: MockCooperative[]) => {
      setSelectedCooperatives(newCooperatives);
    },
    []
  );

  const handleChangeSearchTerm = useCallback((val: string) => {
    setSearchTerm(val);
  }, []);

  const renderInfoBox = (
    isSelectedCooperatives: boolean,
    isSelectedFiscalYear: boolean
  ) => {
    const text = !isSelectedCooperatives
      ? '#info.selectcooperative'
      : !isSelectedFiscalYear
      ? 'Please select calendar year'
      : '';

    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
        paddingX={3}
        paddingY={5}
        bgcolor="#fff"
      >
        <span className={classes.info}>{t(text)}</span>
      </Box>
    );
  };

  const isSelectedCooperatives = !!selectedCooperatives.length;
  const isSelectedFiscalYear = !!selectedFiscalYear;
  const hasEmptyFilters = !isSelectedCooperatives || !isSelectedFiscalYear;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={5}
      >
        <Title>{t('#page.title')}</Title>
        <Box display="flex" alignItems="center">
          <Button
            size="large"
            className={classes.btn}
            classes={{
              startIcon: classes.icon,
            }}
            label={t('#button.lockfydata')}
            startIcon={<LockIcon />}
          />
          <Button
            className={classes.btn}
            classes={{
              startIcon: classes.icon,
            }}
            label={t('#button.copyfy')}
            startIcon={<CopyIcon />}
          />
          <AddFiscalYearButton />
        </Box>
      </Box>
      <FiltersWrapper>
        <Box padding={4} paddingLeft={2} paddingRight={2}>
          <CooperativesPicker
            cooperatives={cooperatives}
            selectedCooperatives={selectedCooperatives}
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingLeft={2} paddingRight={2}>
          <FiscalYearPicker
            disabled={!isSelectedCooperatives}
            fiscalYears={fiscalYears}
            selectedFiscalYear={selectedFiscalYear}
            onSelectFiscalYear={handleChangeSelectedFiscalYear}
          />
        </Box>
        <Box padding={4} paddingLeft={2} paddingRight={2}>
          <ApplyButton disabled={hasEmptyFilters}>
            {t('#button.apply')}
          </ApplyButton>
        </Box>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          padding={4}
          paddingLeft={2}
          paddingRight={2}
        >
          <PageSearch
            searchTerm={searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Box>
      </FiltersWrapper>
      {hasEmptyFilters
        ? renderInfoBox(isSelectedCooperatives, isSelectedFiscalYear)
        : null}
      <GeneralInformationTable />
      <TextEditor />

      <Input />

      <Select
        value={selectValue}
        options={['dog', 'test', 'qwe']}
        onChange={handleChangeSelect}
      />
    </>
  );
};

export default FiscalYear;
