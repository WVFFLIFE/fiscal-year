interface BaseResponseModel {
  IsSuccess: boolean;
  Message: string;
}

interface AttributeHeaderModel {
  InternalName: string;
  DisplayName: string;
  Type: string;
}

export interface UploadFileValue {
  InternalName: string;
  Values: string[];
}

interface ValuesModel {
  Author: string;
  Created: string;
  DocIcon: string;
  Editor: string;
  FileSizeDisplay: string;
  Information_x0020_Group: string;
  LinkFilename: string;
  Modified: string;
  Published: string;
  Service_x002f_Process: string;
  Viewing_x0020_rights: string;
}

export interface DocumentModel {
  Id: string;
  Name: string;
  Size: number;
  Values: ValuesModel;
  IsPublished: boolean;
}

export interface FolderModel {
  Id: string;
  Name: string;
  IsPublished: boolean | null;
  Values: ValuesModel;
  Url: string;
  Documents: DocumentModel[];
  Folders: FolderModel[];
}

export interface DocumentsListModel extends BaseResponseModel {
  FolderExists: boolean;
  HasFolder: boolean;
  Headers: AttributeHeaderModel[];
  Folder: FolderModel | null;
}

interface FileModel {
  FileDataUrl: string;
  FileName: string;
}

interface FileResModel extends BaseResponseModel {
  File: FileModel;
}

export interface MettadataAttributeModel {
  AvailableValues: string[];
  DisplayName: string;
  InternalName: string;
  Type: number;
  TypeString: string;
}

interface FormMettadataResponseModel extends BaseResponseModel {
  Attributes: MettadataAttributeModel[];
}

interface CreateFolderResponseModel extends BaseResponseModel {
  FolderId: string;
  FolderName: string;
}

export interface BaseCooperativeModel {
  Id: string;
  LatestClosedDate: string;
  Name: string;
}

export interface CommonCooperativeModel extends BaseCooperativeModel {
  Id: string;
  IsOwn: boolean;
  IsPMCompanyEmployee: boolean;
  LatestClosedDate: string;
  Name: string;
}

export interface ExtendedCooperativeModel extends BaseCooperativeModel {
  AuditingActualDate: string | null;
  AuditingPlannedDate: string | null;
  BoardMeetingActualDate: string | null;
  BoardMeetingPlannedDate: string | null;
  Comments: string | null;
  FiscalYearEndDate: string | null;
  FiscalYearId: string | null;
  FiscalYearStartDate: string | null;
  GeneralMeetingActualDate: string | null;
  GeneralMeetingPlannedDate: string | null;
  IsFinancialCalculationsAccepted: boolean | null;
  IsFiscalYearClosed: boolean | null;
}

interface BaseCooperativeListResponseModel extends BaseResponseModel {
  Cooperatives: CommonCooperativeModel[];
}

interface ExtendedCooperativesListRepsonseModel extends BaseResponseModel {
  Cooperatives: ExtendedCooperativeModel[];
}

export interface FiscalYearModel {
  Id: string;
  Name: string;
  IsClosed: boolean | null;
}

interface FiscalYearListResponseModel extends BaseResponseModel {
  FiscalYears: FiscalYearModel[];
}

export type SettledResponse = PromiseSettledResult<BaseResponseModel>[];

declare class DefaultService {
  public getCooperativesList(): Promise<BaseCooperativeListResponseModel>;
  public getCooperativesInformationList(
    cooperativesIds: string[],
    startDate: string,
    endDate: string
  ): Promise<ExtendedCooperativesListRepsonseModel>;
  public getCooperativeFiscalYearsList(
    cooperativeId: string
  ): Promise<FiscalYearListResponseModel>;
  public getDocumentsList(entityId: string): Promise<DocumentsListModel>;
  public documentDownload(documentId: string): Promise<FileResModel>;
  public getDocumentFormMetadata(): Promise<FormMettadataResponseModel>;
  public folderUpdate(
    folderId: string,
    folderName: string
  ): Promise<BaseResponseModel>;
  public folderCreate(
    parentFolderId: string,
    folderName: string
  ): Promise<CreateFolderResponseModel>;
  public folderUpdate(
    folderId: string,
    folderName: string
  ): Promise<BaseResponseModel>;
  public folderDelete(folderId: string): Promise<BaseResponseModel>;
  public documentCreate(
    parentFolderId: string,
    file: { FileName: string; FileDataUrl: string },
    values: UploadFileValue[],
    overwrite: boolean
  ): Promise<BaseResponseModel>;
  public documentUpdate(
    documentId: string,
    name: string,
    values: UploadFileValue[],
    newParentFolderId?: string | null,
    overwrite?: boolean
  ): Promise<BaseResponseModel>;
  public documentDelete(documentId: string): Promise<BaseResponseModel>;
  public documentPublish(
    documentId: string,
    publish: boolean
  ): Promise<BaseResponseModel>;
}

export default new DefaultService();
