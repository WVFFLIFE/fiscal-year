import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';

import { ErrorModel, EditorData } from 'models';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';
import { selectAppendexisSettings } from 'selectors/settingsSelectors';

import { additionalSettingsAdapter } from 'utils/fiscalYear';

import {
  selectAppendexisData,
  selectRunningNumberSettings,
} from 'selectors/generalPageSelectors';

import Services from 'services';

interface Column {
  id: string;
  label: string;
  editorData: EditorData;
  maxLength: number;
}

interface RequestStateModel {
  loading: boolean;
  updated: boolean;
  error: ErrorModel | null;
}

function getArticleId(str: string, id: string | null) {
  if (!id) return str;

  return `${str}_${id}`;
}

interface ArticleIdModel {
  current: string | null;
  prev: string | null;
}

const useAppendexisData = () => {
  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const { t } = useTranslation();

  const { appendexisData, appendexisSettings, rawRunningNumberSettings } =
    useStateSelector((state) => ({
      appendexisData: selectAppendexisData(state),
      appendexisSettings: selectAppendexisSettings(state),
      rawRunningNumberSettings: selectRunningNumberSettings(state),
    }));

  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    updated: false,
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

  const runningNumberSettings = useMemo(
    () => additionalSettingsAdapter(rawRunningNumberSettings, t),
    [rawRunningNumberSettings, t]
  );

  const handleSelectArticle = useCallback((id: string | null) => {
    setArticleId((prevState) => ({
      ...prevState,
      current: id,
      prev: id ? prevState.current : null,
    }));
  }, []);

  const updateFiscalYear = async () => {
    if (!fiscalYear?.id) return;

    await dispatch(fetchGeneralFiscalYear(fiscalYear.id));

    setRequestState((prevState) => ({
      ...prevState,
      updated: false,
    }));
  };

  const handleSaveArticle = useCallback(
    async (id: string, editorData: EditorData, cb?: () => void) => {
      if (!appendexisData || !fiscalYear?.id) return;

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
        const request = {
          FiscalYearId: fiscalYear.id,
          AccountingBasis: appendexisData.accountingBasis,
          AccountingBasisFormatted: appendexisData.accountingBasisFormatted,
          AccountingBasisHtml: appendexisData.accountingBasisHtml,
          AccountingBooks: appendexisData.accountingBooks,
          AccountingBooksFormatted: appendexisData.accountingBooksFormatted,
          AccountingBooksHtml: appendexisData.accountingBooksHtml,
          BalanceSheetNotes: appendexisData.balanceSheetNotes,
          BalanceSheetNotesFormatted: appendexisData.balanceSheetNotesFormatted,
          BalanceSheetNotesHtml: appendexisData.balanceSheetNotesHtml,
          LoansMaturingOverFiveYears: appendexisData.loansMaturingOverFiveYears,
          LoansMaturingOverFiveYearsFormatted:
            appendexisData.loansMaturingOverFiveYearsFormatted,
          LoansMaturingOverFiveYearsHtml:
            appendexisData.loansMaturingOverFiveYearsHtml,
          Personnel: appendexisData.personnel,
          PersonnelFormatted: appendexisData.personnelFormatted,
          PersonnelHtml: appendexisData.personnelHtml,
          ...newData,
        };

        const res = await Services.fiscalYearAppendexisUpdate(request);

        if (res.IsSuccess) {
          setRequestState((prevState) => ({
            ...prevState,
            loading: false,
            updated: true,
            error: null,
          }));

          if (cb) cb();
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
    [appendexisData, fiscalYear?.id]
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  useEffect(() => {
    if (requestState.updated) {
      updateFiscalYear();
    }
  }, [requestState.updated]);

  const columns: Column[] = useMemo(
    () =>
      appendexisData && fiscalYear?.id
        ? [
            {
              id: 'AccountingBasis',
              label: '#tab.appendexis.subtitle.accountingbasis',
              editorData: {
                formatted: appendexisData.accountingBasisFormatted,
                html: appendexisData.accountingBasisHtml,
                text: appendexisData.accountingBasis,
              },
              maxLength: appendexisSettings.accountingBasisMaxLength,
            },
            {
              id: 'Personnel',
              label: '#tab.appendexis.subtitle.personnel',
              editorData: {
                formatted: appendexisData.personnelFormatted,
                html: appendexisData.personnelHtml,
                text: appendexisData.personnel,
              },
              maxLength: appendexisSettings.personnelMaxLength,
            },
            {
              id: 'BalanceSheetNotes',
              label: '#tab.appendexis.subtitle.notestothebalancesheet',
              editorData: {
                formatted: appendexisData.balanceSheetNotesFormatted,
                html: appendexisData.balanceSheetNotesHtml,
                text: appendexisData.balanceSheetNotes,
              },
              maxLength: appendexisSettings.balanceSheetNotesMaxLength,
            },
            {
              id: 'LoansMaturingOverFiveYears',
              label: '#tab.appendexis.subtitle.loansmaturingoverfiveyears',
              editorData: {
                formatted: appendexisData.loansMaturingOverFiveYearsFormatted,
                html: appendexisData.loansMaturingOverFiveYearsHtml,
                text: appendexisData.loansMaturingOverFiveYears,
              },
              maxLength: appendexisSettings.loansMaturingOverFiveYearsMaxLength,
            },
            {
              id: 'AccountingBooks',
              label: '#tab.appendexis.subtitle.accountingbooks',
              editorData: {
                formatted: appendexisData.accountingBooksFormatted,
                html: appendexisData.accountingBooksHtml,
                text: appendexisData.accountingBooks,
              },
              maxLength: appendexisSettings.accountingBooksMaxLength,
            },
          ]
        : [],
    [appendexisData, appendexisSettings, fiscalYear?.id]
  );

  return {
    columns,
    articleId,
    requestState,
    runningNumberSettings,
    isClosed: !!fiscalYear?.isClosed,
    handleSaveArticle,
    handleSelectArticle,
    handleInitError,
  };
};

export default useAppendexisData;
