import { useState, useEffect, SyntheticEvent, FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useAppDispatch from 'hooks/useAppDispatch';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { setSearchTerm } from 'features/generalPageSlice';

import { tabsList } from 'configs/tabs';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';

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
import UnsavedChanges from './UnsavedChanges';

import { useStyles } from './style';

const Tabs: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const fiscalYear = useSelectFiscalYear();
  const dispatch = useAppDispatch();

  const [selectedTab, setSelectedTab] = useState<string>('general');
  const [unsavedChangesDialogOpen, toggleUnsavedChangesDialogVisibility] =
    useToggleSwitch();

  useEffect(() => {
    unsavedChangesTracker.resetSaveAction();
  }, [fiscalYear]);

  const handleChangeSelectedTab = (event: SyntheticEvent, newValue: string) => {
    const changeSelectedTab = () => {
      dispatch(setSearchTerm(''));
      setSelectedTab(newValue);
    };

    if (unsavedChangesTracker.hasUnsavedChanges) {
      unsavedChangesTracker.setPendingAction(changeSelectedTab);
      toggleUnsavedChangesDialogVisibility();
    } else {
      changeSelectedTab();
    }
  };

  const tabsClasses = useMemo(
    () => ({
      root: classes.tabs,
      indicator: classes.indicator,
    }),
    [classes]
  );

  const tabClasses = useMemo(
    () => ({
      selected: classes.selected,
    }),
    [classes]
  );

  if (!fiscalYear) return null;

  return (
    <Box className={classes.root}>
      <MuiTabs
        value={selectedTab}
        onChange={handleChangeSelectedTab}
        classes={tabsClasses}
      >
        {tabsList.map((tabItem) => {
          return (
            <MuiTab
              key={tabItem.value}
              value={tabItem.value}
              className={classes.tab}
              classes={tabClasses}
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
        {selectedTab === 'annualReport' && <AnnualReport />}
        {selectedTab === 'parties' && <Parties />}
        {selectedTab === 'appendexis' && <Appendexis />}
        {selectedTab === 'liabilities' && <Liabilities />}
        {selectedTab === 'comments' && <Comments />}
        {selectedTab === 'documents' && <Documents />}
      </Box>
      <UnsavedChanges
        open={unsavedChangesDialogOpen}
        onClose={toggleUnsavedChangesDialogVisibility}
      />
    </Box>
  );
};

export default Tabs;
