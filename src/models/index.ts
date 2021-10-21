import { CSSProperties } from 'react';

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

export interface FiscalYearModel {
  Id: string;
  Name: string;
  StartDate: string;
  EndDate: string;
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

export interface SortModel {
  order: 'asc' | 'desc';
  orderBy: string;
}
