import {
  TypeCode,
  ProductCode,
  UsageCode,
  GeneralTypeCode,
} from 'enums/liabilities';

export function getLiabilityGeneralTypeLabel(code: GeneralTypeCode | null) {
  switch (code) {
    case GeneralTypeCode.Encumberance:
      return '#liability.generaltype.encumberance';
    case GeneralTypeCode.Guarantee:
      return '#liability.generaltype.guarantee';
    default:
      return null;
  }
}

export function getLiabilityProductLabel(code: ProductCode | null) {
  switch (code) {
    case ProductCode.Pledge:
      return '#liability.product.pledge';
    case ProductCode.PledgeElectronic:
      return '#liability.product.pledgeelectronic';
    case ProductCode.Encumberance:
      return '#liability.product.encumberance';
    case ProductCode.Guarantee:
      return '#liability.product.guarantee';
    case ProductCode.Leasehold:
      return '#liability.product.leasehold';
    case ProductCode.SecurityDeposit:
      return '#liability.product.securitydeposit';
    default:
      return null;
  }
}

export function getLiabilityTypeLabel(code: TypeCode | null) {
  switch (code) {
    case TypeCode.BankDeposit:
      return '#liability.type.bankdeposit';
    case TypeCode.FinancialObligation:
      return '#liability.type.financialobligation';
    case TypeCode.FinancialObligationKelaOtherPayer:
      return '#liability.type.financialobligationkelaotherplayer';
    case TypeCode.FinancialSecurity:
      return '#liability.type.financialsecurity';
    default:
      return null;
  }
}

export function getLiabilityUsageLabel(code: UsageCode | null) {
  switch (code) {
    case UsageCode.AsSecurity:
      return '#liability.usage.assecurity';
    case UsageCode.NotInUse:
      return '#liability.usage.notinuse';
    default:
      return null;
  }
}
