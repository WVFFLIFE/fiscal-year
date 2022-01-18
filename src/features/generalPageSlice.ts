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

export const fetchCooperativesList = createAsyncThunk(
  'generalPage/fetchCooperativesList',
  async (_, { getState }) => {
    const { generalPage } = getState() as { generalPage: GeneralPageState };
    const nextFiscalYear = generalPage.filters.fiscalYears.next;

    const startDate = nextFiscalYear?.StartDate
      ? serverFormat(new Date(nextFiscalYear.StartDate))
      : undefined;
    const endDate = nextFiscalYear?.EndDate
      ? serverFormat(new Date(nextFiscalYear.EndDate))
      : undefined;

    return await Services.getCooperativesList(startDate, endDate, true);
  }
);

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
  async (req: Request, { getState, rejectWithValue }) => {
    try {
      const { generalPage } = getState() as { generalPage: GeneralPageState };
      const cooperatives = generalPage.filters.cooperatives.list;

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

      const currentCooperative = findCooperative(req.coopId, cooperatives);

      if (!currentCooperative) {
        throw new Error('Cooperative is not found');
      }

      return {
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

export const refreshGeneralData = createAsyncThunk(
  'generalPage/refreshGeneralData',
  async (_, { rejectWithValue, getState, dispatch }) => {
    try {
      const res = await dispatch(fetchCooperativesList()).unwrap();

      if (!res.IsSuccess) throw new Error(res.Message);

      const { generalPage } = getState() as { generalPage: GeneralPageState };

      const coopId = generalPage.filters.cooperatives.current?.Id;
      const fyId = generalPage.filters.fiscalYears.current?.Id;

      if (coopId && fyId) {
        const generalDataRes = await dispatch(
          fetchGeneralData({ coopId, fyId })
        ).unwrap();

        return { cooperatives: res.Cooperatives, ...generalDataRes };
      } else {
        throw new Error(`
          Entity is missing (FiscalYearId = ${fyId}; CooperativeId = ${coopId})
        `);
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
    resetGeneralFiscalYear: (state) => {
      state.generalFiscalYear = null;
    },
    setCooperativesList: (
      state,
      action: PayloadAction<CommonCooperativeModel[]>
    ) => {
      state.filters.cooperatives.list = action.payload;
    },
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
        state.filters.cooperatives.next = action.payload.currentCooperative;
        state.filters.fiscalYears.list = action.payload.fiscalYears;
        state.filters.fiscalYears.next = action.payload.currentFiscalYear;
        state.filters.fiscalYears.current = action.payload.currentFiscalYear;
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

    builder
      .addCase(refreshGeneralData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshGeneralData.fulfilled, (state, action) => {
        const {
          currentFiscalYear,
          cooperatives,
          currentCooperative,
          fiscalYears,
        } = action.payload;

        state.filters.cooperatives.list = cooperatives;
        state.filters.cooperatives.current = currentCooperative;
        state.filters.fiscalYears.list = fiscalYears;
        state.filters.fiscalYears.current = currentFiscalYear;
        state.loading = false;
      })
      .addCase(refreshGeneralData.rejected, (state, action) => {
        state.loading = false;
        state.error = { messages: [String(action.error.message)] };
      });
  },
});

export default generalPageSlice.reducer;
export const {
  resetGeneralFiscalYear,
  setCooperativesList,
  setCurrentCooperative,
  setCurrentFiscalYear,
  setNextCooperative,
  setNextFiscalYear,
  setSearchTerm,
  resetError,
} = generalPageSlice.actions;
