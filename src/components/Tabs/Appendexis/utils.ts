interface Options {
  type:
    | 'accountingBasis'
    | 'accountingBooks'
    | 'balanceSheetNotes'
    | 'loansMaturingOverFiveYears'
    | 'personnel';
}

export function saveRequestAdapter(
  text: string | null,
  formatted: string | null,
  html: string | null,
  options: Options
): Record<string, string | null> {
  const { type } = options;

  switch (type) {
    case 'accountingBasis':
      return {
        AccountingBasis: text,
        AccountingBasisFormatted: formatted,
        AccountingBasisHtml: html,
      };
    case 'accountingBooks':
      return {
        AccountingBooks: text,
        AccountingBooksFormatted: formatted,
        AccountingBooksHtml: html,
      };
    case 'balanceSheetNotes':
      return {
        BalanceSheetNotes: text,
        BalanceSheetNotesFormatted: formatted,
        BalanceSheetNotesHtml: html,
      };
    case 'loansMaturingOverFiveYears':
      return {
        LoansMaturingOverFiveYears: text,
        LoansMaturingOverFiveYearsFormatted: formatted,
        LoansMaturingOverFiveYearsHtml: html,
      };
    case 'personnel':
      return {
        Personnel: text,
        PersonnelFormatted: formatted,
        PersonnelHtml: html,
      };
    default:
      return {};
  }
}
