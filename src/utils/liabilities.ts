import { Liability } from 'services/s';
import {
  GeneralTypeCode,
  UsageCode,
  ProductCode,
  TypeCode,
} from 'enums/liabilities';
import {
  getLiabilityProductLabel,
  getLiabilityTypeLabel,
  getLiabilityUsageLabel,
} from 'configs/dictionaries';

export interface EnhancedLiability {
  id: string;
  name: string | null;
  partyId: string | null;
  partyName: string | null;
  startDate: string | null;
  endDate: string | null;
  documentNumber: string | null;
  liabilityGeneralTypeCode: GeneralTypeCode | null;
  liabilityUsageCode: UsageCode | null;
  liabilityUsageLabel: string | null;
  liabilityProductCode: ProductCode | null;
  liabilityProductLabel: string | null;
  liabilityTypeCode: TypeCode | null;
  liabilityTypeLabel: string | null;
  quantity: number | null;
  priceItemRate: number | null;
  currencyCode: string | null;
}

export function liabilitiesAdapter(
  liabilities: Liability[]
): EnhancedLiability[] {
  return liabilities.map((liability) => ({
    currencyCode: liability.CurrencyCode,
    documentNumber: liability.DocumentNumber,
    endDate: liability.EndDate,
    id: liability.Id,
    liabilityGeneralTypeCode: liability.GeneralType,
    liabilityProductCode: liability.Product,
    liabilityProductLabel:
      liability.Product && getLiabilityProductLabel(liability.Product),
    liabilityTypeCode: liability.Type,
    liabilityTypeLabel: liability.Type && getLiabilityTypeLabel(liability.Type),
    liabilityUsageCode: liability.Usage,
    liabilityUsageLabel:
      liability.Usage && getLiabilityUsageLabel(liability.Usage),
    name: liability.Name,
    partyId: liability.PartyId,
    partyName: liability.PartyName,
    priceItemRate: liability.PriceItemRate,
    quantity: liability.Quantity,
    startDate: liability.StartDate,
  }));
}
