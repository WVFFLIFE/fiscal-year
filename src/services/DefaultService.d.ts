interface BaseResponseModel {
  IsSuccess: boolean;
  Message: string;
}

interface AttributeHeaderModel {
  InternalName: string;
  DisplayName: string;
  Type: string;
}

interface UploadFileValue {
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
}

export interface FolderModel {
  Id: string;
  Name: string;
  Values: ValuesModel;
  Url: string;
  Documents: DocumentModel[];
  Folders: FolderModel[];
}

export interface DocumentsListModel extends BaseResponseModel {
  FolderExists: boolean;
  HasFolder: boolean;
  Headers: AttributeHeaderModel[];
  Folder: FolderModel;
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

export type SettledResponse = PromiseSettledResult<BaseResponseModel>[];

declare class DefaultService {
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
    values: UploadFileValue[]
  ): Promise<BaseResponseModel>;
  public documentDelete(documentId: string): Promise<BaseResponseModel>;
}

export default new DefaultService();
