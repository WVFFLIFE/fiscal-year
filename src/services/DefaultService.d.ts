import { ResponseStatus } from 'models/response-status-model';
import {
  CopyFiscalYearCodes,
  LockFiscalYearCodes,
  UnlockFiscalYearCodes,
  DocumentTypeCode,
  PartyRoleType,
} from 'models';
import { AnnualReportModel } from 'models/AnnualReportModel';
import { BalancesModel } from 'models/BalancesModel';
import { ConsumptionModel } from 'models/ConsumptionModel';
import { GeneralModel } from 'models/GeneralModel';
import { BaseResponse, Services as S } from './s';

export interface BaseResponseModel {
  IsSuccess: boolean;
  Message: string;
}

interface ResponseWithCode<T> extends BaseResponseModel {
  ResponseCode: T | null;
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
  AuditDeliveryDate: string | null;
  AuditDoneDate: string | null;
  AuditMeetingLink: string | null;
  AuditMeetingType: string | null;
  AuditReturnNeededDate: string | null;
  BoardMeetingActualDate: string | null;
  BoardMeetingLink: string | null;
  BoardMeetingPlannedDate: string | null;
  BoardMeetingType: string | null;
  Comments: string | null;
  FiscalYearComments: string | null;
  FiscalYearEndDate: string | null;
  FiscalYearId: string | null;
  FiscalYearName: string | null;
  FiscalYearStartDate: string | null;
  GeneralMeetingActualDate: string | null;
  GeneralMeetingLink: string | null;
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

export interface AppendexisInput {
  AccountingBasis: string | null;
  AccountingBasisFormatted: string | null;
  AccountingBasisHtml: string | null;

  AccountingBooks: string | null;
  AccountingBooksFormatted: string | null;
  AccountingBooksHtml: string | null;

  BalanceSheetNotes: string | null;
  BalanceSheetNotesFormatted: string | null;
  BalanceSheetNotesHtml: string | null;

  LoansMaturingOverFiveYears: string | null;
  LoansMaturingOverFiveYearsFormatted: string | null;
  LoansMaturingOverFiveYearsHtml: string | null;

  Personnel: string | null;
  PersonnelFormatted: string | null;
  PersonnelHtml: string | null;
}

export interface AppendexisResponseModel extends AppendexisInput {}
export interface AppendexisRequestModel extends AppendexisInput {
  FiscalYearId: string;
}

export interface AdditionalSettingsItemModel {
  CreatedOn: string | null;
  CurrentNumber: number | null;
  DocumentTypeCode: DocumentTypeCode;
  Id: string;
  OwnerName: string | null;
  StartNumber: number | null;
}

interface AdditionalSettings {
  AdditionalSettings: AdditionalSettingsItemModel[];
}

export interface ResPartyModel {
  EndDate: string | null;
  Name: string | null;
  Role: string | null;
  StartDate: string | null;
}

export interface ResPartySectionModel {
  Items: ResPartyModel[];
  Type: PartyRoleType;
}

interface ResPartiesModel extends BaseResponseModel {
  Sections: ResPartySectionModel[];
}

export type GeneralFiscalYearModel = GeneralModel &
  AnnualReportModel &
  BalancesModel &
  ConsumptionModel &
  AppendexisResponseModel &
  AdditionalSettings;

interface GeneralFiscalYearModelRes extends BaseResponseModel {
  FiscalYear: GeneralFiscalYearModel;
}

interface CoverImageRes extends BaseResponseModel {
  Attachment: { Content: string | null } | null;
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

type FiscalYearValidationRes = (
  | {
      ValidationResult:
        | ResponseStatus.FiscalYearValidatingStatus.BadDates
        | ResponseStatus.FiscalYearValidatingStatus.NotFullYear
        | ResponseStatus.FiscalYearValidatingStatus.OK
        | null;
    }
  | {
      ValidationResult: ResponseStatus.FiscalYearValidatingStatus.YearIntersects;
      IntersectPeriodEndDate: string;
      IntersectPeriodStartDate: string;
    }
) &
  BaseResponse;

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

interface ConsumptionUpdateRequest {
  FiscalYearId: string;
  HeatEnergyOfHotWater: number | null;
  ConsumptionOfHotWater: number | null;
  Population: number | null;
  AddConsumptionReportToClosingTheBookReport: boolean;
}

export interface SettingsModel {
  AccountingBasisMaxLength: number;
  AccountingBooksMaxLength: number;
  AnnualGeneralMeetingsMaxLength: number;
  BalanceSheetNotesMaxLength: number;
  BoardsProposalOnThePLMaxLength: number;
  BudgetComprasionMaxLength: number;
  Comment: number;
  ConsumptionDataMaxLength: number;
  CooperativeCoverImageMaxLength: number;
  CooperativeCoverImageMaxSize: number;
  EssentialEventsMaxLength: number;
  FiscalYearConsumptionImageMaxLength: number;
  FiscalYearConsumptionImageMaxSize: number;
  FutureDevelopmentMaxLength: number;
  LanguageCode: number;
  LiabilityDescription: number;
  LiabilityDocumentNumber: number;
  LiabilityName: number;
  LiquidityMaxLength: number;
  LoansMaturingOverFiveYearsMaxLength: number;
  PersistentStrainsAndMortgagesMaxLength: number;
  PersonnelMaxLength: number;
  PropertyMeintenanceProductNameMaxLength: number;
  SpecFinCalcProductName1MaxLength: number;
  SpecFinCalcProductName2MaxLength: number;
  SpecFinCalcProductName3MaxLength: number;
  SpecFinCalcProductName4MaxLength: number;
  SpecFinCalcProductName5MaxLength: number;
  TheBoardOfDirectorsConvenedDuringTheFYMaxLength: number;
  VATCalculationsProductNameMaxLength: number;
}

interface SettingsResponse extends BaseResponseModel {
  Settings: SettingsModel;
}

declare class DefaultService {
  public get(fiscalYearId: string): Promise<S.Model.Comments.Get.Response>;
  public getSettings(): Promise<SettingsResponse>;
  public getLiabilities(fiscalYearId: string): Promise<BaseResponseModel>;
  public getCooperativeParties(
    coopId: string,
    fiscalYearId: string
  ): Promise<ResPartiesModel>;
  public fiscalYearAnnualReportUpdate(req: {
    [key: string]: string | null;
  }): Promise<BaseResponseModel>;
  public fiscalYearAppendexisUpdate(
    req: AppendexisRequestModel
  ): Promise<BaseResponseModel>;
  public fiscalYearConsumptionUpdate(
    req: ConsumptionUpdateRequest
  ): Promise<BaseResponseModel>;
  public getConsumptionImage(fiscalYearId: string): Promise<CoverImageRes>;
  public updateConsumptionImage(req: {
    FiscalYearId: string;
    Content: string | null;
  }): Promise<ResponseWithCode>;
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
  }): Promise<ResponseWithCode>;
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
