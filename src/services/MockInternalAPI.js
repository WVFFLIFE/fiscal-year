import {
  attr,
  list,
  baseCooperatives,
  enhancedCooperatives,
  fiscalYearsList,
  fiscalYear,
} from './mock';

const DELAY = 500;

class MockService {
  execute = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(data);
      }, DELAY);
    });
  };

  getFiscalYear = () => {
    return this.execute(fiscalYear);
  };

  getCooperativesList = () => {
    return this.execute(baseCooperatives);
  };

  getCooperativesInformationList = (cooperativeIds, startDate, endDate) => {
    return this.execute(enhancedCooperatives);
  };

  getCooperativeFiscalYearsList = (coopId) => {
    return this.execute(fiscalYearsList);
  };

  getDocumentsList = (enityId) => {
    return this.execute(list);
  };

  documentDownload = (documentId) => {
    return this.execute(undefined);
  };

  getDocumentFormMetadata = () => {
    return this.execute(attr);
  };

  folderUpdate = (folderId, folderName) => {
    return this.execute({ IsSuccess: true, Message: '' });
  };

  folderCreate = async (parentFolderId, folderName) => {
    return this.execute({ IsSuccess: true, Message: '' });
  };

  documentCreate = async (parentFolderId, file, values, overwrite) => {
    return this.execute({ IsSuccess: true, Message: '' });
  };
}

export default MockService;
