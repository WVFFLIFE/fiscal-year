export interface GroupsModel {
  IncludeClosingTheBookReport: boolean;
  IncludeProfitStatementReport: boolean;
  IncludeBalanceSheetReport: boolean;
  IncludeBalanceSheetBreakdownReport: boolean;
  IncludeLedgerAccountBook: boolean;
  IncludeDailyBook: boolean;
  IncludeBalance: boolean;
  IncludeProductSales: boolean;
  IncludeShareRegister: boolean;
  // IncludeAnnualReportAndFinanceCalculationOfCooperative: boolean;
}

interface SelectionListItem {
  id: keyof GroupsModel;
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
        id: 'IncludeClosingTheBookReport',
        headerName: '#dialog.annualreport.selection.closingthebookreport',
      },
      {
        id: 'IncludeProfitStatementReport',
        headerName: '#dialog.annualreport.selection.profitstatementreport',
      },
      {
        id: 'IncludeBalanceSheetReport',
        headerName: '#dialog.annualreport.selection.balancesheetreport',
      },
      {
        id: 'IncludeBalanceSheetBreakdownReport',
        headerName:
          '#dialog.annualreport.selection.balancesheetbreakdownreport',
      },
      {
        id: 'IncludeLedgerAccountBook',
        headerName: '#dialog.annualreport.selection.ledgeraccountbook',
      },
      {
        id: 'IncludeDailyBook',
        headerName: '#dialog.annualreport.selection.dailybook',
      },
      {
        id: 'IncludeBalance',
        headerName: '#dialog.annualreport.selection.balance',
      },
      {
        id: 'IncludeProductSales',
        headerName: '#dialog.annualreport.selection.productsales',
      },
      {
        id: 'IncludeShareRegister',
        headerName: '#dialog.annualreport.selection.shareregister',
      },
    ],
  },
};

export default generalConfig;
