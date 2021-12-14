interface Options {
  type:
    | 'persistentStrainsAndMortgages'
    | 'annualGeneralMeetings'
    | 'theBoardOfDirectorsConvenedDuring'
    | 'essentialEvents'
    | 'consumptionData'
    | 'futureDevelopment'
    | 'liquidity'
    | 'budgetComprasion'
    | 'boardsProposalOnThePL';
}

export function saveRequestAdapter(
  text: string | null,
  formatted: string | null,
  html: string | null,
  options: Options
): { [key: string]: string | null } {
  const { type } = options;

  switch (type) {
    case 'persistentStrainsAndMortgages':
      return {
        PersistentStrainsAndMortgages: text,
        PersistentStrainsAndMortgagesFormatted: formatted,
        PersistentStrainsAndMortgagesHtml: html,
      };
    case 'annualGeneralMeetings':
      return {
        AnnualGeneralMeetings: text,
        AnnualGeneralMeetingsFormatted: formatted,
        AnnualGeneralMeetingsHtml: html,
      };
    case 'theBoardOfDirectorsConvenedDuring':
      return {
        TheBoardOfDirectorsConvenedDuringTheFY: text,
        TheBoardOfDirectorsConvenedDuringTheFYFormatted: formatted,
        TheBoardOfDirectorsConvenedDuringTheFYHtml: html,
      };
    case 'essentialEvents':
      return {
        EssentialEvents: text,
        EssentialEventsFormatted: formatted,
        EssentialEventsHtml: html,
      };
    case 'consumptionData':
      return {
        ConsumptionData: text,
        ConsumptionDataFormatted: formatted,
        ConsumptionDataHtml: html,
      };
    case 'futureDevelopment':
      return {
        FutureDevelopment: text,
        FutureDevelopmentFormatted: formatted,
        FutureDevelopmentHtml: html,
      };
    case 'liquidity':
      return {
        Liquidity: text,
        LiquidityFormatted: formatted,
        LiquidityHtml: html,
      };
    case 'budgetComprasion':
      return {
        BudgetComprasion: text,
        BudgetComprasionFormatted: formatted,
        BudgetComprasionHtml: html,
      };
    case 'boardsProposalOnThePL':
      return {
        BoardsProposalOnThePL: text,
        BoardsProposalOnThePLFormatted: formatted,
        BoardsProposalOnThePLHtml: html,
      };
    default:
      return {};
  }
}
