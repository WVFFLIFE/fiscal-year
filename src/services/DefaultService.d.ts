import { ResponseStatus } from 'models/response-status-model';
import {
  CopyFiscalYearCodes,
  LockFiscalYearCodes,
  UnlockFiscalYearCodes,
} from 'models';

interface BaseResponseModel {
  IsSuccess: boolean;
  Message: string;
}

interface ResponseWithCode<T> extends BaseResponseModel {
  ResponseCode: T;
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

export interface FiscalYearModel {
  Id: string;
  Name: string;
  IsClosed: boolean | null;
  StartDate: string;
  EndDate: string;
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
  AuditMeetingType: string | null;
  AuditingPlannedDate: string | null;
  BoardMeetingActualDate: string | null;
  BoardMeetingPlannedDate: string | null;
  BoardMeetingType: string | null;
  Comments: string | null;
  FiscalYearComments: string | null;
  FiscalYearEndDate: string | null;
  FiscalYearId: string | null;
  FiscalYearName: string | null;
  FiscalYearStartDate: string | null;
  GeneralMeetingActualDate: string | null;
  GeneralMeetingPlannedDate: string | null;
  GeneralMeetingType: string | null;
  IsFinancialCalculationsAccepted: boolean | null;
  IsFiscalYearClosed: boolean | null;
  IsFiscalYearDoesNotMatchCalendar: boolean | null;
}

interface BaseCooperativeListResponseModel extends BaseResponseModel {
  Cooperatives: CommonCooperativeModel[];
}

interface ExtendedCooperativesListRepsonseModel extends BaseResponseModel {
  Cooperatives: ExtendedCooperativeModel[];
}

interface FiscalYearListResponseModel extends BaseResponseModel {
  FiscalYears: FiscalYearModel[];
}

export interface AuditingModel {
  ActualEndingDate: string | null;
  ActualStartingDate: string | null;
  Id: string;
  Link: string | null;
  PlannedEndingDate: string | null;
  PlannedStartingDate: string | null;
  Type: string | null;
}

export interface MeetingModel {
  ActualEndingDate: string | null;
  ActualStartingDate: string | null;
  Id: string;
  Link: string | null;
  PlannedEndingDate: string | null;
  PlannedStartingDate: string | null;
  Type: string | null;
}

export interface GeneralFiscalYearModel {
  AnnualGeneralMeetings: string | null;
  AnnualGeneralMeetingsFormatted: string | null;
  AnnualGeneralMeetingsHtml: string | null;
  Auditings: AuditingModel[];
  BoardsProposalOnThePL: string | null;
  BoardsProposalOnThePLFormatted: string | null;
  BoardsProposalOnThePLHtml: string | null;
  BudgetComprasion: string | null;
  BudgetComprasionFormatted: string | null;
  BudgetComprasionHtml: string | null;
  ConsumptionData: string | null;
  ConsumptionDataFormatted: string | null;
  ConsumptionDataHtml: string | null;
  CooperativeId: string;
  CooperativeName: string;
  CooperativeLink: string | null;
  EndDate: string | null;
  EssentialEvents: string | null;
  EssentialEventsFormatted: string | null;
  EssentialEventsHtml: string | null;
  FutureDevelopment: string | null;
  FutureDevelopmentFormatted: string | null;
  FutureDevelopmentHtml: string | null;
  Id: string;
  IsClosed: boolean | null;
  Liquidity: string | null;
  LiquidityFormatted: string | null;
  LiquidityHtml: string | null;
  Meetings: MeetingModel[];
  Name: string;
  PersistentStrainsAndMortgages: string | null;
  PersistentStrainsAndMortgagesFormatted: string | null;
  PersistentStrainsAndMortgagesHtml: string | null;
  PropertyMeintenanceProductName: string | null;
  PropertyMeintenanceSurplusDeficitPreviousFY: number | null;
  Show1: boolean;
  Show2: boolean;
  Show3: boolean;
  Show4: boolean;
  Show5: boolean;
  SpecFinCalcProductName1: string | null;
  SpecFinCalcProductName2: string | null;
  SpecFinCalcProductName3: string | null;
  SpecFinCalcProductName4: string | null;
  SpecFinCalcProductName5: string | null;
  SpecFinCalcSurplusDeficitPreviousFY1: number | null;
  SpecFinCalcSurplusDeficitPreviousFY2: number | null;
  SpecFinCalcSurplusDeficitPreviousFY3: number | null;
  SpecFinCalcSurplusDeficitPreviousFY4: number | null;
  SpecFinCalcSurplusDeficitPreviousFY5: number | null;
  StartDate: string | null;
  TheBoardOfDirectorsConvenedDuringTheFY: string | null;
  TheBoardOfDirectorsConvenedDuringTheFYFormatted: string | null;
  TheBoardOfDirectorsConvenedDuringTheFYHtml: string | null;
  VATCalculationsProductName: string | null;
  VATCalculationsSurplusDeficitPreviousFY: number | null;
}

interface GeneralFiscalYearModelRes extends BaseResponseModel {
  FiscalYear: GeneralFiscalYearModel;
}

interface CoverImageRes extends BaseResponseModel {
  Attachment: { Content: string | null };
}

interface FiscalYearGeneralUpdateRequestModel {
  FiscalYearId: string;
  StartDate: string;
  EndDate: string;
}

interface FiscalYearCommentsUpdateRequest {
  FiscalYearId: string;
  Comments: string;
}

interface FiscalYearValidationRes extends BaseResponseModel {
  ValidationResult: ResponseStatus.FiscalYearValidatingStatus | null;
}

export interface BalanceUpdateRequest {
  FiscalYearId: string;
  PropertyMeintenanceProductName: string | null;
  PropertyMeintenanceSurplusDeficitPreviousFY: number | null;
  VATCalculationsProductName: string | null;
  VATCalculationsSurplusDeficitPreviousFY: number | null;
  SpecFinCalcProductName1: string | null;
  SpecFinCalcSurplusDeficitPreviousFY1: number | null;
  SpecFinCalcProductName2: string | null;
  SpecFinCalcSurplusDeficitPreviousFY2: number | null;
  SpecFinCalcProductName3: string | null;
  SpecFinCalcSurplusDeficitPreviousFY3: number | null;
  SpecFinCalcProductName4: string | null;
  SpecFinCalcSurplusDeficitPreviousFY4: number | null;
  SpecFinCalcProductName5: string | null;
  SpecFinCalcSurplusDeficitPreviousFY5: number | null;
  Show1: boolean;
  Show2: boolean;
  Show3: boolean;
  Show4: boolean;
  Show5: boolean;
}

export type SettledResponse = PromiseSettledResult<BaseResponseModel>[];

declare class DefaultService {
  public fiscalYearBalancesUpdate(
    req: BalanceUpdateRequest
  ): Promise<BaseResponseModel>;
  public copyFiscalYear(
    fiscalYearId: string
  ): Promise<ResponseWithCode<CopyFiscalYearCodes>>;
  public lockFiscalYear(
    fiscalYearId: string
  ): Promise<ResponseWithCode<LockFiscalYearCodes>>;
  public unlockFiscalYear(
    fiscalYearId: string
  ): Promise<ResponseWithCode<UnlockFiscalYearCodes>>;
  public fiscalYearGeneralUpdate(
    request: FiscalYearGeneralUpdateRequestModel
  ): Promise<BaseResponseModel>;
  public validateFiscalYearChanges(
    cooperativeId: null,
    fiscalYearId: string,
    startDate: string,
    endDate: string
  ): Promise<FiscalYearValidationRes>;
  public validateFiscalYearChanges(
    cooperativeId: string,
    fiscalYearId: null,
    startDate: string,
    endDate: string
  ): Promise<BaseResponseModel>;
  public getCooperativeCover(coopId: string): Promise<CoverImageRes>;
  public updateCooperativeCover(request: {
    CooperativeId: string;
    Content: string | null;
  }): Promise<BaseResponseModel>;
  public getFiscalYear(
    fiscalYearId: string
  ): Promise<GeneralFiscalYearModelRes>;
  public fiscalYearCommentsUpdate(
    request: FiscalYearCommentsUpdateRequest
  ): Promise<BaseResponseModel>;
  public getCooperativesList(
    startDate?: string,
    endDate?: string,
    includeAll?: boolean
  ): Promise<BaseCooperativeListResponseModel>;
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
