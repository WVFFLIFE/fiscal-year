import { useState, SyntheticEvent, FC } from 'react';
import { useTranslation } from 'react-i18next';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useAppDispatch from 'hooks/useAppDispatch';
import { setSearchTerm } from 'features/generalPageSlice';

import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Documents from './Documents';
import General from './General';
import Balances from './Balances';
import Consumption from './Consumption';
import AnnualReport from './AnnualReport';
import Appendexis from './Appendexis';
import Parties from './Parties';
import Liabilities from './Liabilities';
import Comments from './Comments';

import { useStyles } from './style';

interface TabItemModel {
  value: string;
  label: string;
  disabled?: boolean;
}

const tabsList: TabItemModel[] = [
  { label: '#tab.general', value: 'general' },
  {
    label: '#tab.balances',
    value: 'balances',
  },
  { label: '#tab.consumption', value: 'consumption' },
  { label: '#tab.annualreport', value: 'annualReport' },
  { label: '#tab.parties', value: 'parties' },
  { label: '#tab.appendexis', value: 'appendexis' },
  { label: '#tab.liabilities', value: 'liabilities' },
  { label: '#tab.documents', value: 'documents' },
  { label: '#tab.comments', value: 'comments' },
];

const Tabs: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const fiscalYear = useSelectFiscalYear();
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<string>('general');

  const handleChangeSelectedTab = (e: SyntheticEvent, newValue: string) => {
    dispatch(setSearchTerm(''));
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
        {selectedTab === 'balances' && <Balances />}
        {selectedTab === 'consumption' && <Consumption />}
        {selectedTab === 'annualReport' && (
          <AnnualReport data={fiscalYear.annualReport} />
        )}
        {selectedTab === 'parties' && <Parties />}
        {selectedTab === 'appendexis' && <Appendexis />}
        {selectedTab === 'liabilities' && <Liabilities />}
        {selectedTab === 'comments' && <Comments />}
        {selectedTab === 'documents' && <Documents />}
      </Box>
    </Box>
  );
};

export default Tabs;
