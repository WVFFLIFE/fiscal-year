import { TypeCode, ProductCode, UsageCode } from 'enums/liabilities';

export const liabilityProductCodeDict = {
  [ProductCode.Encumberance]: 'Encumberance',
  [ProductCode.Guarantee]: 'Guarantee',
  [ProductCode.Leasehold]: 'Leasehold',
  [ProductCode.Pledge]: 'Pledge',
  [ProductCode.PledgeElectronic]: 'Pledge Electronic',
  [ProductCode.SecurityDeposit]: 'Security Deposit',
};

export const liabilityTypeCodeDict = {
  [TypeCode.BankDeposit]: 'Bank Deposit',
  [TypeCode.FinancialObligation]: 'Financial Obligation',
  [TypeCode.FinancialObligationKelaOtherPayer]:
    'Financial Obligation Kela Other Payer',
  [TypeCode.FinancialSecurity]: 'Financial Security',
};

export const liabilityUsageCodeDict = {
  [UsageCode.AsSecurity]: 'As Security',
  [UsageCode.NotInUse]: 'Not In Use',
};
