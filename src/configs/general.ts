interface SelectionListItem {
  id: string;
  headerName: string;
}

interface GeneralConfig {
  annualReportPage: {
    selectionList: SelectionListItem[];
  };
}

const generalConfig: Readonly<GeneralConfig> = {
  annualReportPage: {
    selectionList: [
      {
        id: 'closingthebookreport',
        headerName: '#dialog.annualreport.selection.closingthebookreport',
      },
      {
        id: 'profitstatementreport',
        headerName: '#dialog.annualreport.selection.profitstatementreport',
      },
      {
        id: 'balancesheetreport',
        headerName: '#dialog.annualreport.selection.balancesheetreport',
      },
      {
        id: 'balancesheetbreakdownreport',
        headerName:
          '#dialog.annualreport.selection.balancesheetbreakdownreport',
      },
      {
        id: 'ledgeraccountbook',
        headerName: '#dialog.annualreport.selection.ledgeraccountbook',
      },
      {
        id: 'dailybook',
        headerName: '#dialog.annualreport.selection.dailybook',
      },
      {
        id: 'balance',
        headerName: '#dialog.annualreport.selection.balance',
      },
      {
        id: 'productsales',
        headerName: '#dialog.annualreport.selection.productsales',
      },
      {
        id: 'shareregister',
        headerName: '#dialog.annualreport.selection.shareregister',
      },
    ],
  },
};

export default generalConfig;
