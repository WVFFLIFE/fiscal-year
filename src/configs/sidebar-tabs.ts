import React from 'react';
import { SvgIconProps } from '@mui/material/SvgIcon';
import {
  LedgerAccountBookIcon,
  AccountStatementsIcon,
  BalanceSheetIcon,
  DailyBookIcon,
  FinancialCalculationIcon,
  FiscalYearIcon,
  ProfitStatementIcon,
} from 'components/Icons';

export interface TabOptionModel {
  id: string;
  label: string;
  icon: React.JSXElementConstructor<SvgIconProps>;
  href?: string;
  disabled?: boolean;
}

const sidebarTabsOptions: TabOptionModel[] = [
  {
    id: 'ledger-account',
    label: 'Ledger account book',
    icon: LedgerAccountBookIcon,
    disabled: true,
  },
  {
    id: 'daily-book',
    label: 'Daily Book',
    icon: DailyBookIcon,
    disabled: true,
  },
  {
    id: 'profit-statements',
    label: 'Profit Statements',
    icon: ProfitStatementIcon,
    disabled: true,
  },
  {
    id: 'balance-sheet',
    label: 'Balance Sheet',
    icon: BalanceSheetIcon,
    disabled: true,
  },
  {
    id: 'account-statements',
    label: 'Account Statements and Payments',
    icon: AccountStatementsIcon,
    disabled: true,
  },
  {
    id: 'financial-calculation',
    label: 'Financial Calculation',
    icon: FinancialCalculationIcon,
  },
  {
    id: 'fiscal-year',
    label: 'Fiscal Year',
    icon: FiscalYearIcon,
  },
];

export default sidebarTabsOptions;
