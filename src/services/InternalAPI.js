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
  //InsuffisantePermission = 1
  //}
  unlockFiscalYear = async (fiscalYearId) => {
    return await this.executeRequest('uds_FiscalYearLock', {
      FiscalYearId: fiscalYearId,
      Lock: false,
    });
  };

  //request = { CooperativeId: cooperativeId, Content: content }
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

  //request = { FiscalYearId: fiscalYearId, StartDate: startDate, EndDate: endDate, IsClosed: isClosed }  isClosed - bool
  fiscalYearGeneralUpdate = async (request) => {
    return await this.executeTypeRequest('uds_FiscalYearUpdate', 3, request);
  };

  //request = { FiscalYearId: fiscalYearId, Comments: comments }
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
