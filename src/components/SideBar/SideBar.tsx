import { memo } from 'react';

import { Logo } from 'components/Styled';
import SideBarTabs, { SideBarTabsProps } from './SideBarTabs';
import logoURL from 'assets/images/logo.png';

import clsx from 'clsx';
import { useStyles } from './style';

interface SideBarProps {
  selectedTab: SideBarTabsProps['selected'];
  onChangeTab: SideBarTabsProps['onChange'];
}

const SideBar: React.FC<SideBarProps> = ({ selectedTab, onChangeTab }) => {
  const classes = useStyles();

  return (
    <div className={clsx('no-scroll', classes.root)}>
      <Logo src={logoURL} alt="Fiscal Year" className={classes.offset} />
      <SideBarTabs selected={selectedTab} onChange={onChangeTab} />
    </div>
  );
};

export default memo(SideBar);
