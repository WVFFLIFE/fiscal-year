import { useState, SyntheticEvent } from 'react';

import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Documents from './Documents';

import { useStyles } from './style';

interface TabItemModel {
  value: string;
  label: string;
  disabled?: boolean;
}

const tabsList: TabItemModel[] = [
  { label: 'General', value: 'general', disabled: true },
  {
    label: 'Fiscal Year Balances',
    value: 'fiscalYearBalances',
    disabled: true,
  },
  { label: 'Consumption data', value: 'consumptionData', disabled: true },
  { label: 'Annual report', value: 'annualReport', disabled: true },
  { label: 'Toimijat', value: 'toimijat', disabled: true },
  { label: 'Appendexis', value: 'appendexis', disabled: true },
  { label: 'Liabilities', value: 'liabilities', disabled: true },
  { label: 'Documents', value: 'documents' },
  { label: 'Comments', value: 'comments', disabled: true },
];

const Tabs = () => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState<string>('documents');

  const handleChangeSelectedTab = (e: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
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
              label={tabItem.label}
              disabled={tabItem.disabled}
            />
          );
        })}
      </MuiTabs>
      <Box className={classes.box}>
        {selectedTab === 'documents' && <Documents />}
      </Box>
    </Box>
  );
};

export default Tabs;
