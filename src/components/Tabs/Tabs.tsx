import { useState, SyntheticEvent } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import Documents, { DocumentsTabProps } from './Documents';
import General, { GeneralTabProps } from './General';
import Balances, { BalancesProps } from './Balances';

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
  { label: 'Consumption data', value: 'consumptionData', disabled: true },
  { label: 'Annual report', value: 'annualReport', disabled: true },
  { label: 'Toimijat', value: 'toimijat', disabled: true },
  { label: 'Appendexis', value: 'appendexis', disabled: true },
  { label: 'Liabilities', value: 'liabilities', disabled: true },
  { label: '#tab.documents', value: 'documents' },
  { label: 'Comments', value: 'comments', disabled: true },
];

interface TabsProps {
  DocumentsTabProps: DocumentsTabProps;
  GeneralTabProps: GeneralTabProps;
  BalancesTabProps: BalancesProps;
}

const Tabs: React.FC<TabsProps> = ({
  BalancesTabProps,
  DocumentsTabProps,
  GeneralTabProps,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState<string>('general');

  const handleChangeSelectedTab = (e: SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

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
        {selectedTab === 'general' && <General {...GeneralTabProps} />}
        {selectedTab === 'fiscalYearBalances' && (
          <Balances {...BalancesTabProps} />
        )}
        {selectedTab === 'documents' && <Documents {...DocumentsTabProps} />}
      </Box>
    </Box>
  );
};

export default Tabs;
