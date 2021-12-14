import { ReactNode } from 'react';
import { OptionalNumber, OptionalString } from 'models';

export type Obj = { [key: string]: OptionalNumber | OptionalString };

export interface Column<T extends object> {
  label: string;
  field: keyof T;
  disabled?: boolean;
  editable?: boolean;
  type?: 'string' | 'int' | 'float';
  render?: (data: T) => ReactNode;
  onSave: (
    output: OptionalNumber | OptionalString,
    cb?: () => void
  ) => Promise<unknown>;
}
