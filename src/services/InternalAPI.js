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
    var userLcid = this.getCurrentUserLcid();

    return userLcid === 1035 ? 'Finnish' : 'Default';
  };

  getDocumentsList = async (entityId) => {
    return await this.executeRequest('uds_SharePointFiscalYearDocumentList', {
      Id: entityId,
      LanguageCode: this.getLanguageCode(),
    });
  };

  getDocumentFormMetadata = async () => {
    return await this.executeRequest(
      'uds_SharePointFiscalYearDocumentFormMetadata',
      { LanguageCode: this.getLanguageCode() }
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

  documentUpdate = async (documentId, name, values) => {
    return await this.executeRequest('uds_SharePointDocumentEdit', {
      DocumentId: documentId,
      Name: name,
      Values: values,
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
}

export default FiscalYearInternalAPI;
