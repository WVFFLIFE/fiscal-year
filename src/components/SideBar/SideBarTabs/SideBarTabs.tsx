import { SyntheticEvent } from 'react';

import sidebarOptions from 'configs/sidebar-tabs';

import { Tabs, Tab } from '@mui/material';
import { SideBarIconWrapper } from 'components/Styled';

import { useStyles } from './style';

export interface SideBarTabsProps {
  selected: string;
  onChange(e: SyntheticEvent<Element, Event>, value: string): void;
}

const SideBarTabs: React.FC<SideBarTabsProps> = ({ selected, onChange }) => {
  const classes = useStyles();

  return (
    <Tabs
      value={selected}
      onChange={onChange}
      orientation="vertical"
      variant="scrollable"
      scrollButtons={false}
      TabIndicatorProps={{
        hidden: true,
      }}
    >
      {sidebarOptions.map(({ id, label, disabled = false, icon: Icon }) => {
        return (
          <Tab
            disabled={disabled}
            key={id}
            label={label}
            icon={
              <SideBarIconWrapper>
                <Icon className={classes.icon} />
              </SideBarIconWrapper>
            }
            value={id}
            classes={{
              root: classes.tab,
            }}
          />
        );
      })}
    </Tabs>
  );
};

export default SideBarTabs;
