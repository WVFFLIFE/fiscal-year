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
  FiscalYearModel as RawFiscalYear,
} from 'models';
import _get from 'lodash/get';

const dict = {
  [DocumentTypeCode.AccountStatement]: '#documenttype.accountstatement', // Account Statement
  [DocumentTypeCode.BankAccount]: 'Bank Account',
  [DocumentTypeCode.IncomingInvoice]: '#documenttype.incominginvoice', // Incoming Invoices
  [DocumentTypeCode.ManualEvent]: '#documenttype.manualevent', // Manual Event
  [DocumentTypeCode.MemoVoucher]: '#documenttype.manualevent',
  [DocumentTypeCode.OutgoingPayment]: 'Outgoing Payment',
  [DocumentTypeCode.Payment]: '#documenttype.payments', // Payments
  [DocumentTypeCode.PurchaseOrder]: '#documenttype.incominginvoice',
  [DocumentTypeCode.SalesInvoice]: '#documenttype.salesinvoices', // Sales Invoices
};

function get<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue: any = null
) {
  return _get(object, key, defaultValue);
}

interface PrevFiscalYearAccumulator {
  diff: number | null;
  prevFiscalYear: RawFiscalYear | null;
}

function isDateIntersectsWithFiscalYear(date: Date, fiscalYear: RawFiscalYear) {
  if (!fiscalYear.StartDate || !fiscalYear.EndDate) return false;

  let dateTime = date.getTime();
  let startDateTime = new Date(fiscalYear.StartDate).getTime();
  let endDateTime = new Date(fiscalYear.EndDate).getTime();

  return dateTime >= startDateTime && dateTime <= endDateTime;
}

export function getCurrentFiscalYear(fiscalYearsList: RawFiscalYear[]) {
  let todayDate = new Date();
  return (
    fiscalYearsList.find((fiscalYear) =>
      isDateIntersectsWithFiscalYear(todayDate, fiscalYear)
    ) ?? null
  );
}

export function getLastFiscalYear(
  fiscalYearsList: RawFiscalYear[]
): RawFiscalYear | null {
  let lastFiscalYear = null;

  for (let fiscalYear of fiscalYearsList) {
    if (!fiscalYear.EndDate) continue;

    if (!lastFiscalYear) {
      lastFiscalYear = { ...fiscalYear };
      continue;
    }

    let lastFiscalYearEndDateTime = new Date(
      lastFiscalYear.EndDate as string
    ).getTime();
    let nextFiscalYearEndDateTime = new Date(fiscalYear.EndDate).getTime();

    if (nextFiscalYearEndDateTime > lastFiscalYearEndDateTime) {
      lastFiscalYear = { ...fiscalYear };
    }
  }

  return lastFiscalYear;
}

export function getPrevFiscalYear(
  fiscalYearsList: RawFiscalYear[],
  baseFiscalYear?: RawFiscalYear
) {
  let currentFiscalYear =
    baseFiscalYear || getCurrentFiscalYear(fiscalYearsList);

  if (!currentFiscalYear || !currentFiscalYear.StartDate)
    return getLastFiscalYear(fiscalYearsList);

  let currentStartDateTime = new Date(currentFiscalYear.StartDate).getTime();

  const { prevFiscalYear } = fiscalYearsList.reduce(
    (acc, next) => {
      if (!next.EndDate) return acc;
      let nextEndDateTime = new Date(next.EndDate).getTime();
      let diff = currentStartDateTime - nextEndDateTime;

      if (diff < 0) return acc;

      if (!acc.diff) {
        acc.diff = diff;
        acc.prevFiscalYear = { ...next };

        return acc;
      }

      if (acc.diff && diff < acc.diff) {
        acc.diff = diff;
        acc.prevFiscalYear = { ...next };

        return acc;
      }

      return acc;
    },
    { diff: null, prevFiscalYear: null } as PrevFiscalYearAccumulator
  );

  return prevFiscalYear;
}

export interface CommonProductDataModel {
  productName: OptionalString;
  surplusDeficitPreviousFY: OptionalNumber;
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

export interface BalanceProductModel {
  id: number;
  isDisabled: boolean;
  isShow: boolean;
  productName: string;
  surplusDeficitPreviousFY: number;
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

  runningNumberSettings: GeneralFiscalYearModel['AdditionalSettings'];
}

export interface PartyModel {
  endDate: OptionalString;
  name: OptionalString;
  role: OptionalString;
  startDate: OptionalString;
}

export interface EventsModel {
  createAuditingLink: string | null;
  createBoardMeetingLink: string | null;
  createGeneralMeetingLink: string | null;
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
  events: EventsModel;
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

export function additionalSettingsAdapter(
  additionalSettings: GeneralFiscalYearModel['AdditionalSettings'],
  translate: Function
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
      documentTypeLabel: documentTypeCode && translate(dict[documentTypeCode]),
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
      runningNumberSettings: get(fiscalYearRes, 'AdditionalSettings', []),
    },
    balances: {
      products: fiscalYearRes.SpecialFinancialCalculations.map((item) => ({
        id: item.Id,
        isDisabled: item.IsDisabled,
        isShow: item.IsShow,
        productName: item.ProductName,
        surplusDeficitPreviousFY: item.SurplusDeficitPreviousFY,
      })),
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
    events: {
      createAuditingLink: fiscalYearRes.CreateAuditingLink,
      createBoardMeetingLink: fiscalYearRes.CreateBoardMeetingLink,
      createGeneralMeetingLink: fiscalYearRes.CreateGeneralMeetingLink,
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

export function getGeneralData(fiscalYear: FiscalYearModel) {
  return fiscalYear && fiscalYear.general;
}
