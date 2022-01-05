import { useMemo, useCallback } from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import {
  selectAppendexisData,
  selectRunningNumberSettings,
} from 'selectors/generalPageSelectors';

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
  ): Promise<BaseResponseModel | undefined>;
}

const useAppendexisData = () => {
  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const { appendexisData, runningNumberSettings } = useStateSelector(
    (state) => ({
      appendexisData: selectAppendexisData(state),
      runningNumberSettings: selectRunningNumberSettings(state),
    })
  );

  const handleSaveAppendexisData = useCallback(
    async (req: { [key: string]: string | null }) => {
      if (!appendexisData || !fiscalYear?.id) return;
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
        ...req,
      };

      return Services.fiscalYearAppendexisUpdate(request);
    },
    [appendexisData, fiscalYear?.id]
  );

  const handleUpdateFiscalYear = useCallback(async () => {
    if (fiscalYear?.id) dispatch(fetchGeneralFiscalYear(fiscalYear.id));
  }, [fiscalYear]);

  const columns: Column[] = useMemo(
    () =>
      appendexisData
        ? [
            {
              label: '#tab.appendexis.subtitle.accountingbasis',
              editorData: {
                formatted: appendexisData.accountingBasisFormatted,
                html: appendexisData.accountingBasisHtml,
                text: appendexisData.accountingBasis,
              },
              onSave: (text, formatted, html) =>
                handleSaveAppendexisData(
                  saveRequestAdapter(text, formatted, html, {
                    type: 'accountingBasis',
                  })
                ),
            },
            {
              label: '#tab.appendexis.subtitle.personnel',
              editorData: {
                formatted: appendexisData.personnelFormatted,
                html: appendexisData.personnelHtml,
                text: appendexisData.personnel,
              },
              onSave: (text, formatted, html) =>
                handleSaveAppendexisData(
                  saveRequestAdapter(text, formatted, html, {
                    type: 'personnel',
                  })
                ),
            },
            {
              label: '#tab.appendexis.subtitle.notestothebalancesheet',
              editorData: {
                formatted: appendexisData.balanceSheetNotesFormatted,
                html: appendexisData.balanceSheetNotesHtml,
                text: appendexisData.balanceSheetNotes,
              },
              onSave: (text, formatted, html) =>
                handleSaveAppendexisData(
                  saveRequestAdapter(text, formatted, html, {
                    type: 'balanceSheetNotes',
                  })
                ),
            },
            {
              label: '#tab.appendexis.subtitle.loansmaturingoverfiveyears',
              editorData: {
                formatted: appendexisData.loansMaturingOverFiveYearsFormatted,
                html: appendexisData.loansMaturingOverFiveYearsHtml,
                text: appendexisData.loansMaturingOverFiveYears,
              },
              onSave: (text, formatted, html) =>
                handleSaveAppendexisData(
                  saveRequestAdapter(text, formatted, html, {
                    type: 'loansMaturingOverFiveYears',
                  })
                ),
            },
            {
              label: '#tab.appendexis.subtitle.accountingbooks',
              editorData: {
                formatted: appendexisData.accountingBooksFormatted,
                html: appendexisData.accountingBooksHtml,
                text: appendexisData.accountingBooks,
              },
              onSave: (text, formatted, html) =>
                handleSaveAppendexisData(
                  saveRequestAdapter(text, formatted, html, {
                    type: 'accountingBooks',
                  })
                ),
            },
          ]
        : [],
    [appendexisData]
  );

  return {
    columns,
    runningNumberSettings,
    isClosed: !!fiscalYear?.isClosed,
    handleUpdateFiscalYear,
  };
};

export default useAppendexisData;
