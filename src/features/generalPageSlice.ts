import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { CommonCooperativeModel, FiscalYearModel, ErrorModel } from 'models';
import {
  makeFiscalYear,
  FiscalYearModel as GeneralFiscalYear,
} from 'utils/fiscalYear';

import Services from 'services';

import { serverFormat, isSameDay } from 'utils/dates';

function findFiscalYearById(
  defaultFYId: string,
  fiscalYearsList: FiscalYearModel[]
) {
  return (
    fiscalYearsList.find((fiscalYear) => {
      return fiscalYear.Id === defaultFYId;
    }) || null
  );
}

function findCooperative(
  defaultCooperativeId: string,
  commonCooperatives: CommonCooperativeModel[]
) {
  return (
    commonCooperatives.find((commonCoop) => {
      return commonCoop.Id === defaultCooperativeId;
    }) || null
  );
}

function findFiscalYearByDate(
  startDate: string,
  endDate: string,
  fiscalYears: FiscalYearModel[]
) {
  return (
    fiscalYears.find((fiscalYear) => {
      return (
        isSameDay(new Date(startDate), new Date(fiscalYear.StartDate)) &&
        isSameDay(new Date(endDate), new Date(fiscalYear.EndDate))
      );
    }) || null
  );
}

interface FiltersState {
  cooperatives: {
    list: CommonCooperativeModel[];
    next: CommonCooperativeModel | null;
    current: CommonCooperativeModel | null;
  };
  fiscalYears: {
    list: FiscalYearModel[];
    next: FiscalYearModel | null;
    current: FiscalYearModel | null;
  };
  searchTerm: string;
}

export interface GeneralPageState {
  generalFiscalYear: GeneralFiscalYear | null;
  loading: boolean;
  error: ErrorModel | null;
  filters: FiltersState;
}

const initialState: GeneralPageState = {
  generalFiscalYear: null,
  loading: false,
  error: null,
  filters: {
    cooperatives: {
      list: [],
      current: null,
      next: null,
    },
    fiscalYears: {
      list: [],
      current: null,
      next: null,
    },
    searchTerm: '',
  },
};

interface Request {
  coopId: string;
  fyId: string;
}

export const updateFiscalYearsList = createAsyncThunk(
  'generalPage/updateFiscalYearsList',
  async (coopId: string, { getState, rejectWithValue }) => {
    try {
      const res = await Services.getCooperativeFiscalYearsList(coopId);

      if (res.IsSuccess) {
        const { generalPage } = getState() as { generalPage: GeneralPageState };
        const nextFiscalYear = generalPage.filters.fiscalYears.next;

        return {
          list: res.FiscalYears,
          newFiscalYear:
            nextFiscalYear?.StartDate && nextFiscalYear?.EndDate
              ? findFiscalYearByDate(
                  nextFiscalYear.StartDate,
                  nextFiscalYear.EndDate,
                  res.FiscalYears
                )
              : null,
        };
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      return rejectWithValue(err);
    }
  }
);

export const fetchGeneralData = createAsyncThunk(
  'generalPage/fetchData',
  async (req: Request, { rejectWithValue }) => {
    try {
      const fiscalYearsRes = await Services.getCooperativeFiscalYearsList(
        req.coopId
      );

      if (!fiscalYearsRes.IsSuccess) {
        throw new Error(fiscalYearsRes.Message);
      }

      const currentFiscalYear = findFiscalYearById(
        req.fyId,
        fiscalYearsRes.FiscalYears
      );

      if (!currentFiscalYear) {
        throw new Error('Fiscal year is not found');
      }

      const cooperativesListRes = await Services.getCooperativesList(
        serverFormat(new Date(currentFiscalYear.StartDate)),
        serverFormat(new Date(currentFiscalYear.EndDate)),
        true
      );

      if (!cooperativesListRes.IsSuccess) {
        throw new Error(cooperativesListRes.Message);
      }

      const currentCooperative = findCooperative(
        req.coopId,
        cooperativesListRes.Cooperatives
      );

      if (!currentCooperative) {
        throw new Error('Cooperative is not found');
      }

      return {
        cooperatives: cooperativesListRes.Cooperatives,
        currentCooperative,
        fiscalYears: fiscalYearsRes.FiscalYears,
        currentFiscalYear,
      };
    } catch (err) {
      console.error(err);

      return rejectWithValue(err);
    }
  }
);

export const fetchGeneralFiscalYear = createAsyncThunk(
  'generalPage/fetchGeneralFiscalYear',
  async (fiscalYearId: string, { rejectWithValue }) => {
    try {
      const res = await Services.getFiscalYear(fiscalYearId);

      if (res.IsSuccess) {
        return makeFiscalYear(res.FiscalYear);
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      return rejectWithValue(err);
    }
  }
);

export const generalPageSlice = createSlice({
  name: 'generalPage',
  initialState,
  reducers: {
    setCurrentCooperative: (
      state,
      action: PayloadAction<CommonCooperativeModel | null>
    ) => {
      state.filters.cooperatives.current = action.payload;
    },
    setNextCooperative: (
      state,
      action: PayloadAction<CommonCooperativeModel | null>
    ) => {
      state.filters.cooperatives.next = action.payload;
    },
    setCurrentFiscalYear: (
      state,
      action: PayloadAction<FiscalYearModel | null>
    ) => {
      state.filters.fiscalYears.current = action.payload;
    },
    setNextFiscalYear: (
      state,
      action: PayloadAction<FiscalYearModel | null>
    ) => {
      state.filters.fiscalYears.next = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeneralData.fulfilled, (state, action) => {
        state.filters.cooperatives.list = action.payload.cooperatives;
        state.filters.cooperatives.next = action.payload.currentCooperative;
        state.filters.fiscalYears.list = action.payload.fiscalYears;
        state.filters.fiscalYears.next = action.payload.currentFiscalYear;
        state.loading = false;
      })
      .addCase(fetchGeneralData.rejected, (state, action) => {
        state.error = { messages: [String(action.error.message)] };
        state.loading = false;
      });

    builder
      .addCase(updateFiscalYearsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateFiscalYearsList.fulfilled, (state, action) => {
        state.filters.fiscalYears.list = action.payload.list;
        state.filters.fiscalYears.next = action.payload.newFiscalYear;
        state.loading = false;
      })
      .addCase(updateFiscalYearsList.rejected, (state, action) => {
        state.error = { messages: [String(action.error.message)] };
        state.loading = false;
      });

    builder
      .addCase(fetchGeneralFiscalYear.pending, (state) => {
        state.error = null;
        state.loading = true;
        state.filters.cooperatives.current = state.filters.cooperatives.next
          ? { ...state.filters.cooperatives.next }
          : null;
        state.filters.fiscalYears.current = state.filters.fiscalYears.next
          ? { ...state.filters.fiscalYears.next }
          : null;
      })
      .addCase(fetchGeneralFiscalYear.fulfilled, (state, action) => {
        state.generalFiscalYear = action.payload;
        state.loading = false;
      })
      .addCase(fetchGeneralFiscalYear.rejected, (state, action) => {
        state.loading = false;
        state.error = { messages: [String(action.error.message)] };
      });
  },
});

export default generalPageSlice.reducer;
export const {
  setCurrentCooperative,
  setCurrentFiscalYear,
  setNextCooperative,
  setNextFiscalYear,
  setSearchTerm,
  resetError,
} = generalPageSlice.actions;
