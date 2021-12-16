import {
  GeneralFiscalYearModel,
  ResPartySectionModel,
  ResPartyModel,
} from 'services';
import {
  OptionalNumber,
  OptionalString,
  DocumentTypeCode,
  PartyRoleType,
} from 'models';
import _get from 'lodash/get';

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

function get<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: any = null
) {
  return _get(object, key, defaultValue);
}

export interface AuditingModel {
  auditingDone: OptionalString;
  deliveryDate: OptionalString;
  id: string;
  link: OptionalString;
  returnNeededDate: OptionalString;
  type: OptionalString;
}

export interface MeetingModel {
  actualEndingDate: OptionalString;
  actualStartingDate: OptionalString;
  id: string;
  link: OptionalString;
  plannedEndingDate: OptionalString;
  plannedStartingDate: OptionalString;
  type: OptionalString;
}

export interface GeneralModel {
  auditings: AuditingModel[];
  cooperativeId: OptionalString;
  cooperativeName: OptionalString;
  cooperativeLink: OptionalString;
  endDate: OptionalString;
  meetings: MeetingModel[];
  startDate: OptionalString;
  isClosed: boolean;
  id: string;
}

export interface AnnualReportModel {
  annualGeneralMeetings: OptionalString;
  annualGeneralMeetingsFormatted: OptionalString;
  annualGeneralMeetingsHtml: OptionalString;

  boardsProposalOnThePL: OptionalString;
  boardsProposalOnThePLFormatted: OptionalString;
  boardsProposalOnThePLHtml: OptionalString;

  budgetComprasion: OptionalString;
  budgetComprasionFormatted: OptionalString;
  budgetComprasionHtml: OptionalString;

  consumptionData: OptionalString;
  consumptionDataFormatted: OptionalString;
  consumptionDataHtml: OptionalString;

  essentialEvents: OptionalString;
  essentialEventsFormatted: OptionalString;
  essentialEventsHtml: OptionalString;

  futureDevelopment: OptionalString;
  futureDevelopmentFormatted: OptionalString;
  futureDevelopmentHtml: OptionalString;

  liquidity: OptionalString;
  liquidityFormatted: OptionalString;
  liquidityHtml: OptionalString;

  persistentStrainsAndMortgages: OptionalString;
  persistentStrainsAndMortgagesFormatted: OptionalString;
  persistentStrainsAndMortgagesHtml: OptionalString;

  theBoardOfDirectorsConvenedDuringTheFY: OptionalString;
  theBoardOfDirectorsConvenedDuringTheFYFormatted: OptionalString;
  theBoardOfDirectorsConvenedDuringTheFYHtml: OptionalString;
}

export interface AppendexisModel {}

export interface CommonProductDataModel {
  productName: OptionalString;
  surplusDeficitPreviousFY: OptionalNumber;
}

export interface BalanceProductModel extends CommonProductDataModel {
  show: boolean;
  index: number;
  visible: boolean;
}

export interface BalancesModel {
  products: BalanceProductModel[];

  propertyMaintenanceProductName: OptionalString;
  propertyMaintenanceSurplusDeficitPreviousFY: OptionalNumber;

  vatCalculationsProductName: OptionalString;
  vatCalculationsSurplusDeficitPreviousFY: OptionalNumber;
}

export interface ConsumptionModel {
  addConsumptionReportToClosingTheBookReport: boolean;
  consumptionOfHotWater: OptionalNumber;
  heatEnergyOfHotWater: OptionalNumber;
  population: OptionalNumber;
}

export interface RunningNumberSettingsItem {
  createdOn: OptionalString;
  currentNumber: OptionalNumber;
  documentTypeCode: DocumentTypeCode | null;
  documentTypeLabel: OptionalString;
  id: string;
  ownerName: OptionalString;
  startNumber: OptionalNumber;
}

export interface AppendexisModel {
  accountingBasis: OptionalString;
  accountingBasisFormatted: OptionalString;
  accountingBasisHtml: OptionalString;

  accountingBooks: OptionalString;
  accountingBooksFormatted: OptionalString;
  accountingBooksHtml: OptionalString;

  balanceSheetNotes: OptionalString;
  balanceSheetNotesFormatted: OptionalString;
  balanceSheetNotesHtml: OptionalString;

  loansMaturingOverFiveYears: OptionalString;
  loansMaturingOverFiveYearsFormatted: OptionalString;
  loansMaturingOverFiveYearsHtml: OptionalString;

  personnel: OptionalString;
  personnelFormatted: OptionalString;
  personnelHtml: OptionalString;

  runningNumberSettings: RunningNumberSettingsItem[];
}

export interface PartyModel {
  endDate: OptionalString;
  name: OptionalString;
  role: OptionalString;
  startDate: OptionalString;
}

export interface PartySectionModel {
  list: PartyModel[];
  type: PartyRoleType;
}

export interface FiscalYearModel {
  annualReport: AnnualReportModel;
  appendexis: AppendexisModel;
  balances: BalancesModel;
  general: GeneralModel;
  consumption: ConsumptionModel;
  id: string;
  isClosed: boolean;
}

function partyAdapter(parties: ResPartyModel[]): PartyModel[] {
  return parties.map((party) => ({
    endDate: get(party, 'EndDate'),
    name: get(party, 'Name'),
    role: get(party, 'Role'),
    startDate: get(party, 'StartDate'),
  }));
}

export function partiesSectionsAdapter(
  sections: ResPartySectionModel[]
): PartySectionModel[] {
  return sections.map((section) => ({
    type: get(section, 'Type'),
    list: partyAdapter(section.Items),
  }));
}

function auditingsAdapter(
  res: GeneralFiscalYearModel['Auditings']
): AuditingModel[] {
  return res.map((item) => ({
    auditingDone: get(item, 'AuditingDone'),
    deliveryDate: get(item, 'DeliveryDate'),
    id: item.Id,
    link: get(item, 'Link'),
    returnNeededDate: get(item, 'ReturnNeededDate'),
    type: get(item, 'Type'),
  }));
}

function meetingsAdapter(
  res: GeneralFiscalYearModel['Meetings']
): MeetingModel[] {
  return res.map((item) => ({
    actualEndingDate: get(item, 'ActualEndingDate'),
    actualStartingDate: get(item, 'ActualStartingDate'),
    id: item.Id,
    link: get(item, 'Link'),
    plannedEndingDate: get(item, 'PlannedEndingDate'),
    plannedStartingDate: get(item, 'PlannedStartingDate'),
    type: get(item, 'Type'),
  }));
}

function additionalSettingsAdapter(
  additionalSettings: GeneralFiscalYearModel['AdditionalSettings']
): RunningNumberSettingsItem[] {
  return additionalSettings.map((item) => {
    const documentTypeCode: DocumentTypeCode | null = get(
      item,
      'DocumentTypeCode'
    );

    return {
      createdOn: get(item, 'CreatedOn'),
      currentNumber: get(item, 'CurrentNumber'),
      documentTypeCode: documentTypeCode,
      documentTypeLabel: documentTypeCode && dict[documentTypeCode],
      id: get(item, 'Id'),
      ownerName: get(item, 'OwnerName'),
      startNumber: get(item, 'StartNumber'),
    };
  });
}

export function makeFiscalYear(
  fiscalYearRes: GeneralFiscalYearModel
): FiscalYearModel {
  return {
    annualReport: {
      annualGeneralMeetings: get(fiscalYearRes, 'AnnualGeneralMeetings'),
      annualGeneralMeetingsFormatted: get(
        fiscalYearRes,
        'AnnualGeneralMeetingsFormatted'
      ),
      annualGeneralMeetingsHtml: get(
        fiscalYearRes,
        'AnnualGeneralMeetingsHtml'
      ),
      boardsProposalOnThePL: get(fiscalYearRes, 'BoardsProposalOnThePL'),
      boardsProposalOnThePLFormatted: get(
        fiscalYearRes,
        'BoardsProposalOnThePLFormatted'
      ),
      boardsProposalOnThePLHtml: get(
        fiscalYearRes,
        'BoardsProposalOnThePLHtml'
      ),
      budgetComprasion: get(fiscalYearRes, 'BudgetComprasion'),
      budgetComprasionFormatted: get(
        fiscalYearRes,
        'BudgetComprasionFormatted'
      ),
      budgetComprasionHtml: get(fiscalYearRes, 'BudgetComprasionHtml'),
      consumptionData: get(fiscalYearRes, 'ConsumptionData'),
      consumptionDataFormatted: get(fiscalYearRes, 'ConsumptionDataFormatted'),
      consumptionDataHtml: get(fiscalYearRes, 'ConsumptionDataHtml'),
      essentialEvents: get(fiscalYearRes, 'EssentialEvents'),
      essentialEventsFormatted: get(fiscalYearRes, 'EssentialEventsFormatted'),
      essentialEventsHtml: get(fiscalYearRes, 'EssentialEventsHtml'),
      futureDevelopment: get(fiscalYearRes, 'FutureDevelopment'),
      futureDevelopmentFormatted: get(
        fiscalYearRes,
        'FutureDevelopmentFormatted'
      ),
      futureDevelopmentHtml: get(fiscalYearRes, 'FutureDevelopmentHtml'),
      liquidity: get(fiscalYearRes, 'Liquidity'),
      liquidityFormatted: get(fiscalYearRes, 'LiquidityFormatted'),
      liquidityHtml: get(fiscalYearRes, 'LiquidityHtml'),
      persistentStrainsAndMortgages: get(
        fiscalYearRes,
        'PersistentStrainsAndMortgages'
      ),
      persistentStrainsAndMortgagesFormatted: get(
        fiscalYearRes,
        'PersistentStrainsAndMortgagesFormatted'
      ),
      persistentStrainsAndMortgagesHtml: get(
        fiscalYearRes,
        'PersistentStrainsAndMortgagesHtml'
      ),
      theBoardOfDirectorsConvenedDuringTheFY: get(
        fiscalYearRes,
        'TheBoardOfDirectorsConvenedDuringTheFY'
      ),
      theBoardOfDirectorsConvenedDuringTheFYFormatted: get(
        fiscalYearRes,
        'TheBoardOfDirectorsConvenedDuringTheFYFormatted'
      ),
      theBoardOfDirectorsConvenedDuringTheFYHtml: get(
        fiscalYearRes,
        'TheBoardOfDirectorsConvenedDuringTheFYHtml'
      ),
    },
    appendexis: {
      accountingBasis: get(fiscalYearRes, 'AccountingBasis'),
      accountingBasisFormatted: get(fiscalYearRes, 'AccountingBasisFormatted'),
      accountingBasisHtml: get(fiscalYearRes, 'AccountingBasisHtml'),
      accountingBooks: get(fiscalYearRes, 'AccountingBooks'),
      accountingBooksFormatted: get(fiscalYearRes, 'AccountingBooksFormatted'),
      accountingBooksHtml: get(fiscalYearRes, 'AccountingBooksHtml'),
      balanceSheetNotes: get(fiscalYearRes, 'BalanceSheetNotes'),
      balanceSheetNotesFormatted: get(
        fiscalYearRes,
        'BalanceSheetNotesFormatted'
      ),
      balanceSheetNotesHtml: get(fiscalYearRes, 'BalanceSheetNotesHtml'),
      loansMaturingOverFiveYears: get(
        fiscalYearRes,
        'LoansMaturingOverFiveYears'
      ),
      loansMaturingOverFiveYearsFormatted: get(
        fiscalYearRes,
        'LoansMaturingOverFiveYearsFormatted'
      ),
      loansMaturingOverFiveYearsHtml: get(
        fiscalYearRes,
        'LoansMaturingOverFiveYearsHtml'
      ),
      personnel: get(fiscalYearRes, 'Personnel'),
      personnelFormatted: get(fiscalYearRes, 'PersonnelFormatted'),
      personnelHtml: get(fiscalYearRes, 'PersonnelHtml'),
      runningNumberSettings: additionalSettingsAdapter(
        get(fiscalYearRes, 'AdditionalSettings', [])
      ),
    },
    balances: {
      products: [
        {
          index: 1,
          show: get(fiscalYearRes, 'Show1', false),
          productName: get(fiscalYearRes, 'SpecFinCalcProductName1'),
          surplusDeficitPreviousFY: get(
            fiscalYearRes,
            'SpecFinCalcSurplusDeficitPreviousFY1'
          ),
          visible:
            get(fiscalYearRes, 'Show1', false) &&
            !isProductEmpty(
              get(fiscalYearRes, 'SpecFinCalcProductName1'),
              get(fiscalYearRes, 'SpecFinCalcSurplusDeficitPreviousFY1')
            ),
        },
        {
          index: 2,
          show: get(fiscalYearRes, 'Show2', false),
          productName: get(fiscalYearRes, 'SpecFinCalcProductName2'),
          surplusDeficitPreviousFY: get(
            fiscalYearRes,
            'SpecFinCalcSurplusDeficitPreviousFY2'
          ),
          visible:
            get(fiscalYearRes, 'Show2', false) &&
            !isProductEmpty(
              get(fiscalYearRes, 'SpecFinCalcProductName2'),
              get(fiscalYearRes, 'SpecFinCalcSurplusDeficitPreviousFY2')
            ),
        },
        {
          index: 3,
          show: get(fiscalYearRes, 'Show3', false),
          productName: get(fiscalYearRes, 'SpecFinCalcProductName3'),
          surplusDeficitPreviousFY: get(
            fiscalYearRes,
            'SpecFinCalcSurplusDeficitPreviousFY3'
          ),
          visible:
            get(fiscalYearRes, 'Show3', false) &&
            !isProductEmpty(
              get(fiscalYearRes, 'SpecFinCalcProductName3'),
              get(fiscalYearRes, 'SpecFinCalcSurplusDeficitPreviousFY3')
            ),
        },
        {
          index: 4,
          show: get(fiscalYearRes, 'Show4', false),
          productName: get(fiscalYearRes, 'SpecFinCalcProductName4'),
          surplusDeficitPreviousFY: get(
            fiscalYearRes,
            'SpecFinCalcSurplusDeficitPreviousFY4'
          ),
          visible:
            get(fiscalYearRes, 'Show4', false) &&
            !isProductEmpty(
              get(fiscalYearRes, 'SpecFinCalcProductName4'),
              get(fiscalYearRes, 'SpecFinCalcSurplusDeficitPreviousFY4')
            ),
        },
        {
          index: 5,
          show: get(fiscalYearRes, 'Show5', false),
          productName: get(fiscalYearRes, 'SpecFinCalcProductName5'),
          surplusDeficitPreviousFY: get(
            fiscalYearRes,
            'SpecFinCalcSurplusDeficitPreviousFY5'
          ),
          visible:
            get(fiscalYearRes, 'Show5', false) &&
            !isProductEmpty(
              get(fiscalYearRes, 'SpecFinCalcProductName5'),
              get(fiscalYearRes, 'SpecFinCalcSurplusDeficitPreviousFY5')
            ),
        },
      ],
      propertyMaintenanceProductName: get(
        fiscalYearRes,
        'PropertyMeintenanceProductName'
      ),
      propertyMaintenanceSurplusDeficitPreviousFY: get(
        fiscalYearRes,
        'PropertyMeintenanceSurplusDeficitPreviousFY'
      ),
      vatCalculationsProductName: get(
        fiscalYearRes,
        'VATCalculationsProductName'
      ),
      vatCalculationsSurplusDeficitPreviousFY: get(
        fiscalYearRes,
        'VATCalculationsSurplusDeficitPreviousFY'
      ),
    },
    consumption: {
      addConsumptionReportToClosingTheBookReport: get(
        fiscalYearRes,
        'AddConsumptionReportToClosingTheBookReport',
        false
      ),
      consumptionOfHotWater: get(fiscalYearRes, 'ConsumptionOfHotWater'),
      heatEnergyOfHotWater: get(fiscalYearRes, 'HeatEnergyOfHotWater'),
      population: get(fiscalYearRes, 'Population'),
    },
    general: {
      auditings: auditingsAdapter(fiscalYearRes.Auditings),
      cooperativeId: get(fiscalYearRes, 'CooperativeId'),
      cooperativeLink: get(fiscalYearRes, 'CooperativeLink'),
      cooperativeName: get(fiscalYearRes, 'CooperativeName'),
      endDate: get(fiscalYearRes, 'EndDate'),
      meetings: meetingsAdapter(fiscalYearRes.Meetings),
      startDate: get(fiscalYearRes, 'StartDate'),
      isClosed: get(fiscalYearRes, 'IsClosed', false),
      id: fiscalYearRes.Id,
    },
    id: fiscalYearRes.Id,
    isClosed: get(fiscalYearRes, 'IsClosed', false),
  };
}

export function getAnnuaReportData(fiscalYear: FiscalYearModel | null) {
  return fiscalYear && fiscalYear.annualReport;
}

export function appendexisSelector(fiscalYear: FiscalYearModel | null) {
  return fiscalYear && fiscalYear.appendexis;
}
export function runningNumberSettingsSelector(
  fiscalYear: FiscalYearModel | null
) {
  return fiscalYear && fiscalYear.appendexis.runningNumberSettings;
}

export function getBalancesData(fiscalYear: FiscalYearModel | null) {
  return fiscalYear && fiscalYear.balances;
}

export function getConsumptionData(fiscalYear: FiscalYearModel | null) {
  return fiscalYear && fiscalYear.consumption;
}

export function getGeneralData(fiscalYear: FiscalYearModel) {
  return fiscalYear && fiscalYear.general;
}

export function getFiscalYearId(fiscalYear: FiscalYearModel | null) {
  return fiscalYear && fiscalYear.id;
}

export function getBalancesProducts(balanceData: BalancesModel) {
  return balanceData ? balanceData.products : [];
}

export function getPropertyMaintenanceData(
  balancesData: BalancesModel
): CommonProductDataModel {
  return {
    productName: balancesData.propertyMaintenanceProductName,
    surplusDeficitPreviousFY:
      balancesData.propertyMaintenanceSurplusDeficitPreviousFY,
  };
}

export function getVATCalculationData(
  balancesData: BalancesModel
): CommonProductDataModel {
  return {
    productName: balancesData.vatCalculationsProductName,
    surplusDeficitPreviousFY:
      balancesData.vatCalculationsSurplusDeficitPreviousFY,
  };
}

export function unzipProducts(products: BalanceProductModel[]) {
  return products.reduce((acc, next) => {
    acc[`show${next.index}`] = next.show;
    acc[`productName${next.index}`] = next.productName;
    acc[`surplusDeficitPreviousFY${next.index}`] =
      next.surplusDeficitPreviousFY;

    return acc;
  }, {} as { [key: string]: boolean | string | null | number });
}

export function isProductVisible(product: BalanceProductModel) {
  return product.show;
}

export function isProductEmpty(
  productName: OptionalString,
  surplusDeficit: OptionalNumber
) {
  return !productName && !surplusDeficit;
}

export function hasEmptyProduct(products: BalanceProductModel[]) {
  return products.some(
    (product) =>
      isProductEmpty(product.productName, product.surplusDeficitPreviousFY) &&
      isProductVisible(product)
  );
}
