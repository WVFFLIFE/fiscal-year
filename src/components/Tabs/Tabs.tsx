import { useState, SyntheticEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import useGeneralCtx from 'hooks/useGeneralCtx';

import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Documents from './Documents';
import General from './General';
import Balances from './Balances';
import Consumption from './Consumption';
import AnnualReport from './AnnualReport';
import Appendexis from './Appendexis';

import { useStyles } from './style';

interface TabItemModel {
  value: string;
  label: string;
  disabled?: boolean;
}

const tabsList: TabItemModel[] = [
  { label: 'General', value: 'general' },
  {
    label: 'Fiscal Year Balances',
    value: 'fiscalYearBalances',
  },
  { label: '#tab.consumption', value: 'consumptionData' },
  { label: '#tab.annualreport', value: 'annualReport' },
  { label: 'Toimijat', value: 'toimijat', disabled: true },
  { label: '#tab.appendexis', value: 'appendexis' },
  { label: 'Liabilities', value: 'liabilities', disabled: true },
  { label: '#tab.documents', value: 'documents' },
  { label: 'Comments', value: 'comments', disabled: true },
];

const Tabs: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { fiscalYear } = useGeneralCtx().state;

  const [selectedTab, setSelectedTab] = useState<string>('general');

  const handleChangeSelectedTab = (e: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  if (!fiscalYear) return null;

  return (
    <Box className={classes.root}>
      <MuiTabs
        value={selectedTab}
        onChange={handleChangeSelectedTab}
        classes={{ root: classes.tabs, indicator: classes.indicator }}
      >
        {tabsList.map((tabItem) => {
          return (
            <MuiTab
              key={tabItem.value}
              value={tabItem.value}
              className={classes.tab}
              classes={{
                selected: classes.selected,
              }}
              label={t(tabItem.label)}
              disabled={tabItem.disabled}
            />
          );
        })}
      </MuiTabs>
      <Box className={classes.box}>
        {selectedTab === 'general' && <General data={fiscalYear.general} />}
        {selectedTab === 'fiscalYearBalances' && <Balances />}
        {selectedTab === 'consumptionData' && <Consumption />}
        {selectedTab === 'annualReport' && (
          <AnnualReport data={fiscalYear.annualReport} />
        )}
        {selectedTab === 'appendexis' && <Appendexis />}
        {selectedTab === 'documents' && <Documents />}
      </Box>
    </Box>
  );
};

export default Tabs;
