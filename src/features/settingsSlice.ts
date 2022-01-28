import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { Language } from 'enums/responses';

import Services from 'services';

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const res = await Services.getSettings();

      if (!res.IsSuccess) throw new Error(res.Message);

      return res.Settings;
    } catch (err) {
      console.error(err);

      return rejectWithValue(err);
    }
  }
);

interface SettingsState {
  balance: {
    vatCalculationsProductNameMaxLength: number;
    propertyMaintenanceProductNameMaxLength: number;
    specFinCalcProductName1MaxLength: number;
    specFinCalcProductName2MaxLength: number;
    specFinCalcProductName3MaxLength: number;
    specFinCalcProductName4MaxLength: number;
    specFinCalcProductName5MaxLength: number;
  };
  annualReport: {
    annualGeneralMeetingsMaxLength: number;
    budgetComprasionMaxLength: number;
    boardsProposalOnThePLMaxLength: number;
    persistentStrainsAndMortgagesMaxLength: number;
    theBoardOfDirectorsConvenedDuringTheFYMaxLength: number;
    essentialEventsMaxLength: number;
    consumptionDataMaxLength: number;
    futureDevelopmentMaxLength: number;
    liquidityMaxLength: number;
  };
  appendexis: {
    accountingBasisMaxLength: number;
    personnelMaxLength: number;
    balanceSheetNotesMaxLength: number;
    loansMaturingOverFiveYearsMaxLength: number;
    accountingBooksMaxLength: number;
  };
  liabilities: {
    nameMaxLength: number;
    descriptionMaxLength: number;
    documentNumberMaxLength: number;
  };
  comments: {
    commentMaxLength: number;
  };
  /**
   * 1033 - English;
   * 1034 - Finnish
   */
  languageCode: Language;
}

const initialState: SettingsState = {
  balance: {
    propertyMaintenanceProductNameMaxLength: 100,
    specFinCalcProductName1MaxLength: 100,
    specFinCalcProductName2MaxLength: 100,
    specFinCalcProductName3MaxLength: 100,
    specFinCalcProductName4MaxLength: 100,
    specFinCalcProductName5MaxLength: 100,
    vatCalculationsProductNameMaxLength: 100,
  },
  annualReport: {
    annualGeneralMeetingsMaxLength: 0,
    boardsProposalOnThePLMaxLength: 0,
    budgetComprasionMaxLength: 0,
    consumptionDataMaxLength: 0,
    essentialEventsMaxLength: 0,
    futureDevelopmentMaxLength: 0,
    liquidityMaxLength: 0,
    persistentStrainsAndMortgagesMaxLength: 0,
    theBoardOfDirectorsConvenedDuringTheFYMaxLength: 0,
  },
  appendexis: {
    accountingBasisMaxLength: 0,
    accountingBooksMaxLength: 0,
    balanceSheetNotesMaxLength: 0,
    loansMaturingOverFiveYearsMaxLength: 0,
    personnelMaxLength: 0,
  },
  liabilities: {
    nameMaxLength: Infinity,
    descriptionMaxLength: Infinity,
    documentNumberMaxLength: Infinity,
  },
  comments: {
    commentMaxLength: Infinity,
  },
  languageCode: 1033,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDefaultSettings: (_, action: PayloadAction<SettingsState>) => {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (_, action) => {
      const settings = action.payload;

      return {
        balance: {
          propertyMaintenanceProductNameMaxLength:
            settings.PropertyMeintenanceProductNameMaxLength,
          specFinCalcProductName1MaxLength:
            settings.SpecFinCalcProductName1MaxLength,
          specFinCalcProductName2MaxLength:
            settings.SpecFinCalcProductName2MaxLength,
          specFinCalcProductName3MaxLength:
            settings.SpecFinCalcProductName3MaxLength,
          specFinCalcProductName4MaxLength:
            settings.SpecFinCalcProductName4MaxLength,
          specFinCalcProductName5MaxLength:
            settings.SpecFinCalcProductName5MaxLength,
          vatCalculationsProductNameMaxLength:
            settings.VATCalculationsProductNameMaxLength,
        },
        annualReport: {
          annualGeneralMeetingsMaxLength:
            settings.AnnualGeneralMeetingsMaxLength,
          boardsProposalOnThePLMaxLength:
            settings.BoardsProposalOnThePLMaxLength,
          budgetComprasionMaxLength: settings.BudgetComprasionMaxLength,
          consumptionDataMaxLength: settings.ConsumptionDataMaxLength,
          essentialEventsMaxLength: settings.EssentialEventsMaxLength,
          futureDevelopmentMaxLength: settings.FutureDevelopmentMaxLength,
          liquidityMaxLength: settings.LiquidityMaxLength,
          persistentStrainsAndMortgagesMaxLength:
            settings.PersistentStrainsAndMortgagesMaxLength,
          theBoardOfDirectorsConvenedDuringTheFYMaxLength:
            settings.TheBoardOfDirectorsConvenedDuringTheFYMaxLength,
        },
        appendexis: {
          accountingBasisMaxLength: settings.AccountingBasisMaxLength,
          accountingBooksMaxLength: settings.AccountingBooksMaxLength,
          balanceSheetNotesMaxLength: settings.BalanceSheetNotesMaxLength,
          loansMaturingOverFiveYearsMaxLength:
            settings.LoansMaturingOverFiveYearsMaxLength,
          personnelMaxLength: settings.PersonnelMaxLength,
        },
        liabilities: {
          nameMaxLength: settings.LiabilityName,
          descriptionMaxLength: settings.LiabilityDescription,
          documentNumberMaxLength: settings.LiabilityDocumentNumber,
        },
        comments: {
          commentMaxLength: settings.Comment,
        },
        languageCode: settings.LanguageCode,
      };
    });
  },
});

export default settingsSlice.reducer;
