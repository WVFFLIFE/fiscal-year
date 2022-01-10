import { useState, ChangeEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useSuccessDialogState from 'hooks/useSuccessDialogState';

import { ErrorModel } from 'models';
import { GroupsModel } from 'configs/general';

import { Services } from 'services/s';
import { saveAs } from 'file-saver';

const AnnualReportService = new Services.AnnualReports();

function isAbleToDownloadArchieve(groups: GroupsModel) {
  let selected = 0;
  const values = Object.values(groups);

  for (let val of values) {
    if (val > 1) break;
    if (val) selected++;
  }

  return selected > 1;
}

interface StateModel {
  selectedGroups: GroupsModel;
  creating: boolean;
  saving: boolean;
  error: ErrorModel | null;
}

const useAnnualReportFormData = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<StateModel>({
    selectedGroups: {
      IncludeBalance: false,
      IncludeBalanceSheetBreakdownReport: false,
      IncludeBalanceSheetReport: false,
      IncludeClosingTheBookReport: true,
      IncludeDailyBook: false,
      IncludeLedgerAccountBook: false,
      IncludeProductSales: false,
      IncludeProfitStatementReport: false,
      IncludeShareRegister: false,
    },
    creating: false,
    saving: false,
    error: null,
  });
  const successDialog = useSuccessDialogState();
  const fiscalYear = useSelectFiscalYear();
  const filters = useStateSelector((state) => state.generalPage.filters);

  const handleChangeSelectedGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setState((prevState) => ({
      ...prevState,
      selectedGroups: {
        ...prevState.selectedGroups,
        [name]: checked,
      },
    }));
  };

  const handleSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setState((prevState) => {
        const mapedGroups = (
          Object.keys(prevState.selectedGroups) as Array<keyof GroupsModel>
        ).reduce((acc, next) => {
          acc[next] = checked;
          return acc;
        }, {} as GroupsModel);
        return {
          ...prevState,
          selectedGroups: mapedGroups,
        };
      });
    },
    []
  );

  const downloadReport = async (
    req: Services.Model.AnnualReports.Get.Request
  ) => {
    const res = await AnnualReportService.get(req, false);

    if (res.IsSuccess) {
      const [report] = res.Reports;
      if (report) {
        const dataURL = `data:${report.MimeType};base64,${report.DocumentBody}`;
        saveAs(dataURL, report.DocumentName);
      } else {
        throw new Error(`Report is missing`);
      }
    } else {
      throw new Error(res.Message);
    }
  };

  const downloadReportsArchieve = async (
    req: Services.Model.AnnualReports.Get.Request
  ) => {
    const res = await AnnualReportService.get(req, true);

    if (res.IsSuccess) {
      const MIMEType = 'application/zip';
      const dataURL = `data:${MIMEType};base64,${res.Content}`;

      saveAs(dataURL, res.ArchieveName);
    } else {
      throw new Error(res.Message);
    }
  };

  const handleLoadReports = async () => {
    if (!fiscalYear?.id || !fiscalYear.general.cooperativeId) return;
    try {
      setState((prevState) => ({
        ...prevState,
        creating: true,
      }));

      let req = {
        FiscalYearId: fiscalYear.id,
        CooperativeId: fiscalYear.general.cooperativeId,
        ...state.selectedGroups,
      };

      const shouldDownloadArchieve = isAbleToDownloadArchieve(
        state.selectedGroups
      );
      const download = shouldDownloadArchieve
        ? downloadReportsArchieve
        : downloadReport;

      await download(req);

      setState((prevState) => ({
        ...prevState,
        creating: false,
      }));
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        creating: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleSaveToDocuments = async () => {
    if (!fiscalYear?.id || !fiscalYear.general.cooperativeId) return;
    try {
      setState((prevState) => ({
        ...prevState,
        saving: true,
      }));

      let req = {
        FiscalYearId: fiscalYear.id,
        CooperativeId: fiscalYear.general.cooperativeId,
        ...state.selectedGroups,
      };

      const res = await AnnualReportService.save(req);

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          saving: false,
        }));

        successDialog.open();
      } else {
        throw new Error(t('#dialog.annualreport.savetodocuments.error'));
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
        saving: false,
      }));
    }
  };

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    state,
    filters,
    successDialog,
    handleChangeSelectedGroup,
    handleSelectAll,
    handleLoadReports,
    handleSaveToDocuments,
    handleInitError,
  };
};

export default useAnnualReportFormData;
