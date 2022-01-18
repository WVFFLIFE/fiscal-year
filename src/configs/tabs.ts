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

export { tabsList };
