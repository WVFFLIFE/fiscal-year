import { CSSProperties } from 'react';
import {
  FolderModel as ServiceFolderModel,
  DocumentModel as ServiceDocumentModel,
} from 'services';
export type {
  BaseCooperativeModel,
  CommonCooperativeModel,
  ExtendedCooperativeModel,
  FiscalYearModel,
} from 'services';
export type { SortModel, SortParamsType } from 'hooks/useSort';
export type { CalendarYearOption } from 'components/SelectCalendarYear';

export interface FolderModel extends ServiceFolderModel {}
export interface DocumentModel extends ServiceDocumentModel {}
export interface BaseEntityModel {
  Id: string;
  Name: string;
}

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

export interface MockCooperative {
  Id: string;
  Name: string;
  ClosedPeriodEndDate: string;
}

export interface Column {
  label: string;
  field: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  style?: CSSProperties;
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
  | 'successDeleted';
