import { useMemo, useCallback } from 'react';
import { AnnualReportModel, getFiscalYearId } from 'utils/fiscalYear';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { saveRequestAdapter } from './utils';
import Services, { BaseResponseModel } from 'services';

interface EditorData {
  text: string | null;
  formatted: string | null;
  html: string | null;
}

interface Column {
  label: string;
  editorData: EditorData;
  onSave(
    text: string | null,
    formatted: string | null,
    html: string | null
  ): Promise<BaseResponseModel>;
}

const useAnnualReportData = (data: AnnualReportModel) => {
  const {
    state: { fiscalYear },
    fetchGeneralData,
  } = useGeneralCtx();

  const saveFields = async (req: { [key: string]: string | null }) => {
    const reqBody = {
      FiscalYearId: fiscalYear?.id || null,
      PersistentStrainsAndMortgages: data.persistentStrainsAndMortgages,
      PersistentStrainsAndMortgagesFormatted:
        data.persistentStrainsAndMortgagesFormatted,
      PersistentStrainsAndMortgagesHtml: data.persistentStrainsAndMortgagesHtml,

      AnnualGeneralMeetings: data.annualGeneralMeetings,
      AnnualGeneralMeetingsFormatted: data.annualGeneralMeetingsFormatted,
      AnnualGeneralMeetingsHtml: data.annualGeneralMeetingsHtml,

      TheBoardOfDirectorsConvenedDuringTheFY:
        data.theBoardOfDirectorsConvenedDuringTheFY,
      TheBoardOfDirectorsConvenedDuringTheFYFormatted:
        data.theBoardOfDirectorsConvenedDuringTheFYFormatted,
      TheBoardOfDirectorsConvenedDuringTheFYHtml:
        data.theBoardOfDirectorsConvenedDuringTheFYHtml,

      EssentialEvents: data.essentialEvents,
      EssentialEventsFormatted: data.essentialEventsFormatted,
      EssentialEventsHtml: data.essentialEventsHtml,

      ConsumptionData: data.consumptionData,
      ConsumptionDataFormatted: data.consumptionDataFormatted,
      ConsumptionDataHtml: data.consumptionDataHtml,

      FutureDevelopment: data.futureDevelopment,
      FutureDevelopmentFormatted: data.futureDevelopmentFormatted,
      FutureDevelopmentHtml: data.futureDevelopmentHtml,

      Liquidity: data.liquidity,
      LiquidityFormatted: data.liquidityFormatted,
      LiquidityHtml: data.liquidityHtml,

      BudgetComprasion: data.budgetComprasion,
      BudgetComprasionFormatted: data.budgetComprasionFormatted,
      BudgetComprasionHtml: data.budgetComprasionHtml,

      BoardsProposalOnThePL: data.boardsProposalOnThePL,
      BoardsProposalOnThePLFormatted: data.boardsProposalOnThePLFormatted,
      BoardsProposalOnThePLHtml: data.boardsProposalOnThePLHtml,
      ...req,
    };

    return Services.fiscalYearAnnualReportUpdate(reqBody);
  };

  const updateFiscalYear = useCallback(async () => {
    const fiscalYearId = getFiscalYearId(fiscalYear);

    if (fiscalYearId) fetchGeneralData(fiscalYearId);
  }, [fiscalYear]);

  const columns: Column[] = useMemo(
    () => [
      {
        label: '#tab.annualreport.subtitle.persistentstrainsandmortgages',
        editorData: {
          formatted: data.persistentStrainsAndMortgagesFormatted,
          html: data.persistentStrainsAndMortgagesHtml,
          text: data.persistentStrainsAndMortgages,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'persistentStrainsAndMortgages',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.annualgeneralmeetings',
        editorData: {
          formatted: data.annualGeneralMeetingsFormatted,
          html: data.annualGeneralMeetingsHtml,
          text: data.annualGeneralMeetings,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'annualGeneralMeetings',
            })
          ),
      },
      {
        label:
          '#tab.annualreport.subtitle.theboardofdirectorsconvenedduringthefiscalyear',
        editorData: {
          formatted: data.theBoardOfDirectorsConvenedDuringTheFYFormatted,
          html: data.theBoardOfDirectorsConvenedDuringTheFYHtml,
          text: data.theBoardOfDirectorsConvenedDuringTheFY,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'theBoardOfDirectorsConvenedDuring',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.essentialevents',
        editorData: {
          formatted: data.essentialEventsFormatted,
          html: data.essentialEventsHtml,
          text: data.essentialEvents,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'essentialEvents',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.consumptiondata',
        editorData: {
          formatted: data.consumptionDataFormatted,
          html: data.consumptionDataHtml,
          text: data.consumptionData,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'consumptionData',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.futuredevelopment',
        editorData: {
          formatted: data.futureDevelopmentFormatted,
          html: data.futureDevelopmentHtml,
          text: data.futureDevelopment,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'futureDevelopment',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.liquidity',
        editorData: {
          formatted: data.liquidityFormatted,
          html: data.liquidityHtml,
          text: data.liquidity,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'liquidity',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.budgetcomparison',
        editorData: {
          formatted: data.budgetComprasionFormatted,
          html: data.budgetComprasionHtml,
          text: data.budgetComprasion,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'budgetComprasion',
            })
          ),
      },
      {
        label: '#tab.annualreport.subtitle.boardsproposalonthepl',
        editorData: {
          formatted: data.boardsProposalOnThePLFormatted,
          html: data.boardsProposalOnThePLHtml,
          text: data.boardsProposalOnThePL,
        },
        onSave: (text, formatted, html) =>
          saveFields(
            saveRequestAdapter(text, formatted, html, {
              type: 'boardsProposalOnThePL',
            })
          ),
      },
    ],
    [data]
  );

  return { columns, isClosed: !!fiscalYear?.isClosed, updateFiscalYear };
};

export default useAnnualReportData;
