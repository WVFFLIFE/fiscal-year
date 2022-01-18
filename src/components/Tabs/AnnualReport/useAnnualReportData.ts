import { useMemo, useState, useCallback } from 'react';

import { ErrorModel, EditorData } from 'models';

import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import { selectAnnualReportData } from 'selectors/generalPageSelectors';
import { selectAnnualReportSettings } from 'selectors/settingsSelectors';

import Services from 'services';

interface Column {
  id: string;
  label: string;
  editorData: EditorData;
  maxLength?: number;
  singleline?: boolean;
}

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

interface ArticleIdModel {
  current: string | null;
  prev: string | null;
}

const useAnnualReportData = () => {
  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();
  const { annualReport, annualReportSettings } = useStateSelector((state) => ({
    annualReport: selectAnnualReportData(state),
    annualReportSettings: selectAnnualReportSettings(state),
  }));

  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    error: null,
  });
  const [articleId, setArticleId] = useState<ArticleIdModel>({
    current: null,
    prev: null,
  });

  // useEffect(() => {
  //   setArticleId({
  //     current: null,
  //     prev: null,
  //   });
  // }, [fiscalYear]);

  const handleSelectArticle = useCallback((id: string | null) => {
    setArticleId((prevState) => ({
      ...prevState,
      current: id,
      prev: id ? prevState.current : null,
    }));
  }, []);

  const handleSaveArticle = useCallback(
    async (id: string, editorData: EditorData, cb?: () => void) => {
      if (!fiscalYear?.id || !annualReport) return;
      try {
        setRequestState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const newData = {
          [id]: editorData.text,
          [`${id}Formatted`]: editorData.formatted,
          [`${id}Html`]: editorData.html,
        };
        const reqBody = {
          FiscalYearId: fiscalYear?.id || null,
          PersistentStrainsAndMortgages:
            annualReport.persistentStrainsAndMortgages,
          PersistentStrainsAndMortgagesFormatted:
            annualReport.persistentStrainsAndMortgagesFormatted,
          PersistentStrainsAndMortgagesHtml:
            annualReport.persistentStrainsAndMortgagesHtml,

          AnnualGeneralMeetings: annualReport.annualGeneralMeetings,
          AnnualGeneralMeetingsFormatted:
            annualReport.annualGeneralMeetingsFormatted,
          AnnualGeneralMeetingsHtml: annualReport.annualGeneralMeetingsHtml,

          TheBoardOfDirectorsConvenedDuringTheFY:
            annualReport.theBoardOfDirectorsConvenedDuringTheFY,
          TheBoardOfDirectorsConvenedDuringTheFYFormatted:
            annualReport.theBoardOfDirectorsConvenedDuringTheFYFormatted,
          TheBoardOfDirectorsConvenedDuringTheFYHtml:
            annualReport.theBoardOfDirectorsConvenedDuringTheFYHtml,

          EssentialEvents: annualReport.essentialEvents,
          EssentialEventsFormatted: annualReport.essentialEventsFormatted,
          EssentialEventsHtml: annualReport.essentialEventsHtml,

          ConsumptionData: annualReport.consumptionData,
          ConsumptionDataFormatted: annualReport.consumptionDataFormatted,
          ConsumptionDataHtml: annualReport.consumptionDataHtml,

          FutureDevelopment: annualReport.futureDevelopment,
          FutureDevelopmentFormatted: annualReport.futureDevelopmentFormatted,
          FutureDevelopmentHtml: annualReport.futureDevelopmentHtml,

          Liquidity: annualReport.liquidity,
          LiquidityFormatted: annualReport.liquidityFormatted,
          LiquidityHtml: annualReport.liquidityHtml,

          BudgetComprasion: annualReport.budgetComprasion,
          BudgetComprasionFormatted: annualReport.budgetComprasionFormatted,
          BudgetComprasionHtml: annualReport.budgetComprasionHtml,

          BoardsProposalOnThePL: annualReport.boardsProposalOnThePL,
          BoardsProposalOnThePLFormatted:
            annualReport.boardsProposalOnThePLFormatted,
          BoardsProposalOnThePLHtml: annualReport.boardsProposalOnThePLHtml,
          ...newData,
        };

        const res = await Services.fiscalYearAnnualReportUpdate(reqBody);

        if (res.IsSuccess) {
          setRequestState((prevState) => ({
            ...prevState,
            loading: false,
            error: null,
          }));

          if (cb) cb();

          await dispatch(fetchGeneralFiscalYear(fiscalYear.id));
        } else {
          throw new Error(res.Message);
        }
      } catch (err) {
        console.error(err);

        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    },
    [annualReport, dispatch, fiscalYear?.id]
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const columns: Column[] = useMemo(
    () =>
      annualReport
        ? [
            {
              id: 'PersistentStrainsAndMortgages',
              label: '#tab.annualreport.subtitle.persistentstrainsandmortgages',
              editorData: {
                formatted: annualReport.persistentStrainsAndMortgagesFormatted,
                html: annualReport.persistentStrainsAndMortgagesHtml,
                text: annualReport.persistentStrainsAndMortgages,
              },
              maxLength:
                annualReportSettings.persistentStrainsAndMortgagesMaxLength,
            },
            {
              id: 'AnnualGeneralMeetings',
              label: '#tab.annualreport.subtitle.annualgeneralmeetings',
              editorData: {
                formatted: annualReport.annualGeneralMeetingsFormatted,
                html: annualReport.annualGeneralMeetingsHtml,
                text: annualReport.annualGeneralMeetings,
              },
              maxLength: annualReportSettings.annualGeneralMeetingsMaxLength,
            },
            {
              id: 'TheBoardOfDirectorsConvenedDuringTheFY',
              label:
                '#tab.annualreport.subtitle.theboardofdirectorsconvenedduringthefiscalyear',
              editorData: {
                formatted:
                  annualReport.theBoardOfDirectorsConvenedDuringTheFYFormatted,
                html: annualReport.theBoardOfDirectorsConvenedDuringTheFYHtml,
                text: annualReport.theBoardOfDirectorsConvenedDuringTheFY,
              },
              maxLength:
                annualReportSettings.theBoardOfDirectorsConvenedDuringTheFYMaxLength,
              singleline: true,
            },
            {
              id: 'EssentialEvents',
              label: '#tab.annualreport.subtitle.essentialevents',
              editorData: {
                formatted: annualReport.essentialEventsFormatted,
                html: annualReport.essentialEventsHtml,
                text: annualReport.essentialEvents,
              },
              maxLength: annualReportSettings.essentialEventsMaxLength,
            },
            {
              id: 'ConsumptionData',
              label: '#tab.annualreport.subtitle.consumptiondata',
              editorData: {
                formatted: annualReport.consumptionDataFormatted,
                html: annualReport.consumptionDataHtml,
                text: annualReport.consumptionData,
              },
              maxLength: annualReportSettings.consumptionDataMaxLength,
            },
            {
              id: 'FutureDevelopment',
              label: '#tab.annualreport.subtitle.futuredevelopment',
              editorData: {
                formatted: annualReport.futureDevelopmentFormatted,
                html: annualReport.futureDevelopmentHtml,
                text: annualReport.futureDevelopment,
              },
              maxLength: annualReportSettings.futureDevelopmentMaxLength,
            },
            {
              id: 'Liquidity',
              label: '#tab.annualreport.subtitle.liquidity',
              editorData: {
                formatted: annualReport.liquidityFormatted,
                html: annualReport.liquidityHtml,
                text: annualReport.liquidity,
              },
              maxLength: annualReportSettings.liquidityMaxLength,
            },
            {
              id: 'BudgetComprasion',
              label: '#tab.annualreport.subtitle.budgetcomparison',
              editorData: {
                formatted: annualReport.budgetComprasionFormatted,
                html: annualReport.budgetComprasionHtml,
                text: annualReport.budgetComprasion,
              },
              maxLength: annualReportSettings.budgetComprasionMaxLength,
            },
            {
              id: 'BoardsProposalOnThePL',
              label: '#tab.annualreport.subtitle.boardsproposalonthepl',
              editorData: {
                formatted: annualReport.boardsProposalOnThePLFormatted,
                html: annualReport.boardsProposalOnThePLHtml,
                text: annualReport.boardsProposalOnThePL,
              },
              maxLength: annualReportSettings.boardsProposalOnThePLMaxLength,
            },
          ]
        : [],
    [annualReport, annualReportSettings]
  );

  return {
    articleId,
    columns,
    requestState,
    isClosed: !!fiscalYear?.isClosed,
    handleSaveArticle,
    handleInitError,
    handleSelectArticle,
  };
};

export default useAnnualReportData;
