import { CSSProperties } from 'react';
import {
  FolderModel as ServiceFolderModel,
  DocumentModel as ServiceDocumentModel,
} from 'services';
export type {
  BaseCooperativeModel,
  CommonCooperativeModel,
  ExtendedCooperativeModel,
  MettadataAttributeModel,
  GeneralFiscalYearModel,
} from 'services';
export type { FiscalYear as FiscalYearModel } from 'services/s';
export type { SortModel, SortParamsType } from 'hooks/useSort';
export type { CalendarYearOption } from 'components/SelectCalendarYear';
export type { AuditingModel } from './AuditingModel';
export type { MeetingModel } from './MeetingModel';
export type { EditorData } from 'hooks/useEditor';

export enum LockFiscalYearCodes {
  OK,
  InsufficientPermission,
}

export enum UnlockFiscalYearCodes {
  OK,
  InsufficientPermission,
}

export enum CopyFiscalYearCodes {
  OK,
  PreviousFiscalYearNotFound,
  AmbiguityFiscalYearNotFound,
}

export enum PartyRoleType {
  BoardOfDirectors = 1,
  Auditing = 2,
  PropertyManagement = 3,
  BuildingMaintenanceAndCleaning = 4,
  OtherParties = 5,
}

export interface FolderModel extends ServiceFolderModel {}
export interface DocumentModel extends ServiceDocumentModel {}
export interface BaseEntityModel {
  Id: string;
  Name: string;
}

export type OptionalString = string | null;
export type OptionalNumber = number | null;

export interface BaseOptionSetModel {
  Value: number;
  Label: string;
}

export interface BaseResponseModel {
  Error: string;
  ErrorCode: number;
  IsSuccess: boolean;
}

export interface Status {
  Value: number | null;
  Label: string | null;
}

export enum EntityResponseCode {
  Ok = 1,
  Warrning = 2,
  Error = 3,
  Info = 4,
}

export enum DocumentTypeCode {
  MemoVoucher = 100000006,
  BankAccount = 100000005,
  AccountStatement = 100000000,
  PurchaseOrder = 100000001,
  Payment = 100000002,
  OutgoingPayment = 100000007,
  SalesInvoice = 100000003,
  IncomingInvoice = 100000004,
  ManualEvent = 752560000,
}

export interface MockCooperative {
  Id: string;
  Name: string;
  ClosedPeriodEndDate: string;
}

export interface Column<T extends object = { [key: string]: any }> {
  label: string;
  field: keyof T;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  style?: CSSProperties;
  bodyCellClassName?: string;
  type?: 'string' | 'date' | 'datetime' | 'documentcode' | 'int';
}

export interface AttributeHeaderModel {
  InternalName: string;
  DisplayName: string;
  Type: string;
}

export interface FiscalYearDocumentsListResponseModel {
  HasFolder: boolean;
  FolderExist: boolean;
  Headers: AttributeHeaderModel[];
  Folder: FolderModel;
}

export interface ErrorModel {
  messages: string[];
}

export interface SelectedAttributesModel {
  Viewing_x0020_rights: string[];
  Information_x0020_Group: string[];
  Service_x002f_Process: string[];
}

export interface EntityModel {
  id: string;
  type: 'doc' | 'folder';
}

export interface EntityPublishModel extends EntityModel {
  published: boolean;
}

export type SuccessType =
  | 'successUpdated'
  | 'successUploaded'
  | 'folderNameUpdated'
  | 'successPublished'
  | 'successUnpublished'
  | 'successDeleted'
  | 'successDocumentsUpdated';
