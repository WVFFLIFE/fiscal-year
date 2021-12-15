import { DocumentTypeCode } from 'models';
import { dateTimeFormat, defaultFormat } from 'utils/dates';
import { toNumberFormat } from 'utils';

const dict = {
  [DocumentTypeCode.AccountStatement]: 'Account Statement',
  [DocumentTypeCode.BankAccount]: 'Bank Account',
  [DocumentTypeCode.IncomingInvoice]: 'Incoming Invoice',
  [DocumentTypeCode.ManualEvent]: 'Manual Event',
  [DocumentTypeCode.MemoVoucher]: 'Memo Voucher',
  [DocumentTypeCode.OutgoingPayment]: 'Outgoing Payment',
  [DocumentTypeCode.Payment]: 'Payment',
  [DocumentTypeCode.PurchaseOrder]: 'Purchase Order',
  [DocumentTypeCode.SalesInvoice]: 'Sales Invoice',
};

export function renderAs(
  data: any,
  type: 'string' | 'date' | 'datetime' | 'documentcode' | 'numeric' = 'string'
) {
  if (!data) return null;
  switch (type) {
    case 'string':
      return typeof data === 'string' ? data : String(data);
    case 'date':
      return typeof data === 'string' ? defaultFormat(new Date(data)) : null;
    case 'datetime':
      return typeof data === 'string' ? dateTimeFormat(new Date(data)) : null;
    case 'documentcode':
      return data ? dict[data as DocumentTypeCode] : null;
    case 'numeric':
      return data ? toNumberFormat(data) : null;
    default:
      return null;
  }
}
