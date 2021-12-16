import CrmAction from './CrmAction';

class FiscalYearInternalAPI {
  getCurrentUserLcid = () => {
    return window.parent.Xrm.Page.context.getUserLcid();
  };

  getCurrentUserId = () => {
    return window.parent.Xrm.Page.context.getUserId();
  };

  getCurrentEntityId = () => {
    return window.parent.Xrm.Page.data.entity.getId();
  };

  getLanguageCode = () => {
    const userLcid = this.getCurrentUserLcid();

    return userLcid === 1035 ? 'Finnish' : 'Default';
  };

  //https://dev.azure.com/uds-cloud-devops/Premis/_git/CSharpCode?path=/Modules/Accounting/Property.Accounting.FiscalYear/Property.Accounting.FiscalYear/Data/Requests/LiabilityCreateRequest.cs&version=GBm.mishko/FINN-14051&_a=contents
  createLiability = async (cooperativeId, newLiability) => {
    return await this.executeRequest('uds_FiscalYearLiabilityCreate', {
      CooperativeId: cooperativeId,
      NewLiability: newLiability,
    });
  };

  //https://dev.azure.com/uds-cloud-devops/Premis/_git/CSharpCode?path=/Modules/Accounting/Property.Accounting.FiscalYear/Property.Accounting.FiscalYear/Data/Requests/LiabilityUpdateRequest.cs&version=GBm.mishko/FINN-14051&_a=contents
  updateLiability = async (updatedLiability) => {
    return await this.executeRequest('uds_FiscalYearLiabilityUpdate', {
      UpdatedLiability: updatedLiability,
    });
  };

  deleteLiabilities = async (liabilitiesIds) => {
    return await this.executeRequest('uds_FiscalYearLiabilityDelete', {
      LiabilitiesIds: liabilitiesIds,
    });
  };

  getLiability = async (liabilityId) => {
    return await this.executeRequest('uds_FiscalYearLiability', {
      LiabilityId: liabilityId,
    });
  };

  getLiabilityParties = async (searchKey) => {
    return await this.executeRequest('uds_FiscalYearLiabilitiesPartiesList', {
      SearchKey: searchKey,
    });
  };

  getLiabilities = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearLiabilitiesList', {
      FiscalYearId: fiscalYearId,
    });
  };

  getSettings = async () => {
    return await this.executeRequest('uds_FiscalYearSettings', {});
  };

  getCooperativeParties = async (cooperativeId, fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearCooperativeParties', {
      CooperativeId: cooperativeId,
      FiscalYearId: fiscalYearId,
    });
  };

  //FiscalYearCopyResponseCode
  //{
  //OK = 0,
  //PreviousFiscalYearNotFound = 1,
  //AmbiguityFiscalYearNotFound = 2
  //}
  copyFiscalYear = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearCopy', {
      FiscalYearId: fiscalYearId,
    });
  };

  //Request must contains FiscalYearId or CooperativeId parameter
  //FiscalYearChangesValidationCode
  //{
  //OK = 1,
  //BadDates = 2,
  //NotFullYear = 3,
  //YearIntersects = 4
  //}
  validateFiscalYearChanges = async (
    cooperativeId,
    fiscalYearId,
    startDate,
    endDate
  ) => {
    return await this.executeRequest('uds_FiscalYearChangesValidation', {
      CooperativeId: cooperativeId,
      FiscalYearId: fiscalYearId,
      StartDate: startDate,
      EndDate: endDate,
    });
  };

  //FiscalYearLockResponseCode
  //{
  //OK = 0,
  //InsuffisantePermission = 1
  //}
  lockFiscalYear = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearLock', {
      FiscalYearId: fiscalYearId,
      Lock: true,
    });
  };

  //FiscalYearLockResponseCode
  //{
  //OK = 0,
  //InsuffisantePermission = 1
  //}
  unlockFiscalYear = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearLock', {
      FiscalYearId: fiscalYearId,
      Lock: false,
    });
  };

  //request = { FiscalYearId:guid, Content:string }
  updateConsumptionImage = async (request) => {
    return await this.executeTypeRequest(
      'uds_FiscalYearAttachmentUpdateRequest',
      2,
      request
    );
  };

  getConsumptionImage = async (fiscalYearId) => {
    return await this.executeTypeRequest('uds_FiscalYearAttachmentRequest', 2, {
      FiscalYearId: fiscalYearId,
    });
  };

  //request = { CooperativeId:guid, Content:string }
  updateCooperativeCover = async (request) => {
    return await this.executeTypeRequest(
      'uds_FiscalYearAttachmentUpdateRequest',
      1,
      request
    );
  };

  getCooperativeCover = async (cooperativeId) => {
    return await this.executeTypeRequest('uds_FiscalYearAttachmentRequest', 1, {
      CooperativeId: cooperativeId,
    });
  };

  getFiscalYear = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearRequest', {
      FiscalYearId: fiscalYearId,
    });
  };

  //https://dev.azure.com/uds-cloud-devops/Premis/_git/CSharpCode?path=/Modules/Accounting/Property.Accounting.FiscalYear/Property.Accounting.FiscalYear/Data/Requests/FiscalYearAppendexisPartUpdateRequest.cs&version=GBm.mishko/FINN-14051&_a=contents
  fiscalYearAppendexisUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 6, request);
  };

  //https://dev.azure.com/uds-cloud-devops/Premis/_git/CSharpCode?path=/Modules/Accounting/Property.Accounting.FiscalYear/Property.Accounting.FiscalYear/Data/Requests/FiscalYearAnnualReportPartUpdateRequest.cs&version=GBm.mishko/FINN-14051&_a=contents
  fiscalYearAnnualReportUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 2, request);
  };

  /* request = { FiscalYearId:guid
    PropertyMeintenanceProductName:string, PropertyMeintenanceSurplusDeficitPreviousFY:decimal? 
    VATCalculationsProductName:string, VATCalculationsSurplusDeficitPreviousFY:decimal?
    SpecFinCalcProductName1:string, SpecFinCalcSurplusDeficitPreviousFY1:decimal?, Show1:bool,
    SpecFinCalcProductName2:string, SpecFinCalcSurplusDeficitPreviousFY2:decimal?, Show2:bool,
    SpecFinCalcProductName3:string, SpecFinCalcSurplusDeficitPreviousFY3:decimal?, Show3:bool,
    SpecFinCalcProductName4:string, SpecFinCalcSurplusDeficitPreviousFY4:decimal?, Show4:bool,
    SpecFinCalcProductName5:string, SpecFinCalcSurplusDeficitPreviousFY5:decimal?, Show5:bool }
*/
  fiscalYearBalancesUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 4, request);
  };

  //request = { FiscalYearId:guid, HeatEnergyOfHotWater:int?, ConsumptionOfHotWater:int?, Population:int?, AddConsumptionReportToClosingTheBookReport:bool }
  fiscalYearConsumptionUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 5, request);
  };

  //request = { FiscalYearId:guid, StartDate:datetime, EndDate:datetime }
  fiscalYearGeneralUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 3, request);
  };

  //request = { FiscalYearId:guid, Comments:string }
  fiscalYearCommentsUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 1, request);
  };

  fiscalYearCreateBaseFolder = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearCreateBaseFolder', {
      FiscalYearId: fiscalYearId,
    });
  };

  getCooperativesInformationList = async (
    cooperativesIds,
    startDate,
    endDate
  ) => {
    return await this.executeRequest(
      'uds_FiscalYearCooperativesInformationList',
      {
        CooperativesIds: cooperativesIds,
        StartDate: startDate,
        EndDate: endDate,
      }
    );
  };

  getCooperativesList = async (
    startDate = null,
    endDate = null,
    includeAll = false
  ) => {
    return await this.executeRequest('uds_FiscalYearCooperativesList', {
      StartDate: startDate,
      EndDate: endDate,
      IncludeAll: includeAll,
    });
  };

  getCooperativeFiscalYearsList = async (cooperativeId) => {
    return await this.executeRequest(
      'uds_FiscalYearCooperativeFiscalYearsList',
      { CooperativeId: cooperativeId }
    );
  };

  getCommentsList = async (entityId) => {
    return await this.executeRequest('uds_CommentGetList', {
      EntityId: entityId,
      EntityName: 'uds_fiscalyear',
    });
  };

  commentCreate = async (entityId, comment) => {
    return await this.executeRequest('uds_CommentCreate', {
      EntityId: entityId,
      EntityName: 'uds_fiscalyear',
      Comment: comment,
    });
  };

  commentUpdate = async (entityId, comment) => {
    return await this.executeRequest('uds_CommentEdit', {
      EntityId: entityId,
      EntityName: 'uds_fiscalyear',
      Comment: comment,
    });
  };

  commentDelete = async (entityId, commentId) => {
    return await this.executeRequest('uds_CommentDelete', {
      EntityId: entityId,
      EntityName: 'uds_fiscalyear',
      CommentId: commentId,
    });
  };

  getDocumentsList = async (entityId, languageCode) => {
    return await this.executeRequest('uds_SharePointFiscalYearDocumentList', {
      Id: entityId,
      LanguageCode: languageCode,
    });
  };

  getDocumentFormMetadata = async (languageCode) => {
    return await this.executeRequest(
      'uds_SharePointFiscalYearDocumentFormMetadata',
      { LanguageCode: languageCode }
    );
  };

  documentPublish = async (documentId, publish) => {
    return await this.executeRequest(
      'uds_SharePointFiscalYearDocumentPublish',
      { DocumentId: documentId, Publish: publish }
    );
  };

  getDocument = async (documentId) => {
    return await this.executeRequest('uds_SharePointDocument', {
      DocumentId: documentId,
    });
  };

  documentCreate = async (parentFolderId, file, values, overwrite) => {
    return await this.executeRequest('uds_SharePointFiscalYearDocumentCreate', {
      ParentFolderId: parentFolderId,
      File: file,
      Values: values,
      Overwrite: overwrite,
    });
  };

  documentUpdate = async (
    documentId,
    name,
    values,
    newParentFolderId = null,
    overwrite = false
  ) => {
    return await this.executeRequest('uds_SharePointFiscalYearDocumentEdit', {
      DocumentId: documentId,
      Name: name,
      Values: values,
      NewParentFolderId: newParentFolderId,
      Overwrite: overwrite,
    });
  };

  documentDelete = async (documentId) => {
    return await this.executeRequest('uds_SharePointDocumentDelete', {
      DocumentId: documentId,
    });
  };

  documentDownload = async (documentId) => {
    return await this.executeRequest('uds_SharePointDocumentDownload', {
      DocumentId: documentId,
    });
  };

  folderCreate = async (parentFolderId, folderName) => {
    return await this.executeRequest('uds_SharePointFiscalYearFolderCreate', {
      ParentFolderId: parentFolderId,
      FolderName: folderName,
    });
  };

  folderUpdate = async (folderId, folderName) => {
    return await this.executeRequest('uds_SharePointFiscalYearFolderUpdate', {
      FolderId: folderId,
      FolderName: folderName,
    });
  };

  folderDelete = async (folderId) => {
    return await this.executeRequest('uds_SharePointFiscalYearFolderDelete', {
      FolderId: folderId,
    });
  };

  executeRequest = async (request, requestJson) => {
    const requestXml = CrmAction.GenerateRequestXml(request, requestJson);

    return await new Promise((success, error) =>
      CrmAction.Execute({
        requestXml: requestXml,
        async: true,
        successCallback: (data) => {
          success(data.Response);
          console.log(data);
        },
        errorCallback: (data) => error(data.message),
      })
    );
  };

  executeTypeRequest = async (request, requestType, requestJson) => {
    const requestXml = CrmAction.GenerateRequestWithTypeXml(
      request,
      requestType,
      requestJson
    );

    return await new Promise((success, error) =>
      CrmAction.Execute({
        requestXml: requestXml,
        async: true,
        successCallback: (data) => {
          success(data.Response);
          console.log(data);
        },
        errorCallback: (data) => error(data.message),
      })
    );
  };
}

export default FiscalYearInternalAPI;
