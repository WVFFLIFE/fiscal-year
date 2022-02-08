export interface SpecialFinancialCalculation {
  Id: number;
  ProductName: string;
  SurplusDeficitPreviousFY: number;
  IsShow: boolean;
  IsDisabled: boolean;
}

export interface BalancesModel {
  PropertyMeintenanceProductName: string | null;
  PropertyMeintenanceSurplusDeficitPreviousFY: number | null;

  SpecialFinancialCalculations: SpecialFinancialCalculation[];

  VATCalculationsProductName: string | null;
  VATCalculationsSurplusDeficitPreviousFY: number | null;
}
