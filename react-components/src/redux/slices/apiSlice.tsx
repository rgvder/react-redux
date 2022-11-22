import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSorting } from '../../models/ApiSorting.enum';
import { ApiState } from '../../models/ApiState.interface';
import { Characters } from '../../models/Characters.interface';
import { Character } from '../../models/Character.interface';

const initialState: ApiState = {
  isInitialLoading: true,
  apiSearchQuery: '',
  sorting: apiSorting.all,
  result: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
  pagination: {
    cardPerPage: 20,
    count: 0,
    pages: 0,
    forcePage: 0,
    segment: 1,
    apiPage: 1,
  },
  selectedCharacter: null,
  isLoading: true,
  isError: false,
};

export const fetchApi = createAsyncThunk('api/fetchApi', async (url: string) => {
  const response = await fetch(url);

  return await response.json();
});

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setError(state) {
      state.isError = true;
    },
    setNoError(state) {
      state.isError = false;
    },
    setLoading(state) {
      state.isLoading = true;
    },
    setNoLoading(state) {
      state.isLoading = false;
    },
    fetchSuccess(state, action: PayloadAction<Characters>) {
      const {
        info: { count },
      } = action.payload;
      state.result = action.payload;
      state.pagination.count = count;
      state.pagination.pages = Math.ceil(count / state.pagination.cardPerPage);
    },
    selectCharacter(state, action: PayloadAction<Character>) {
      state.selectedCharacter = action.payload;
    },
    resetCharacter(state) {
      state.selectedCharacter = null;
    },
    setSearchBarValue(state, action: PayloadAction<string>) {
      state.apiSearchQuery = action.payload;
      state.pagination.forcePage = 0;
      state.pagination.segment = 1;
      state.pagination.apiPage = 1;
    },
    setSortingValue(state, action: PayloadAction<apiSorting>) {
      state.sorting = action.payload;
      state.pagination.forcePage = 0;
      state.pagination.segment = 1;
      state.pagination.apiPage = 1;
    },
    setPages(state, action: PayloadAction<number>) {
      state.pagination.cardPerPage = action.payload;
      state.pagination.pages = Math.ceil(state.pagination.count / action.payload);
      state.pagination.forcePage = 0;
    },
    firstSetPages(state, action: PayloadAction<number>) {
      state.pagination.count = action.payload;
      state.pagination.pages = Math.ceil(action.payload / state.pagination.cardPerPage);
    },
    setForcePage(state, action: PayloadAction<number>) {
      state.pagination.forcePage = action.payload;
    },
    setSegment(state, action: PayloadAction<number>) {
      state.pagination.segment = action.payload;
    },
    setApiPage(state, action: PayloadAction<number>) {
      state.pagination.apiPage = action.payload;
    },
    setInitialLoading(state, action: PayloadAction<boolean>) {
      state.isInitialLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApi.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchApi.rejected, (state) => {
        state.isError = true;
      })
      .addCase(fetchApi.fulfilled, (state, action, characterPerPage?: number) => {
        const cardPerCurrentPage = characterPerPage
          ? characterPerPage
          : state.pagination.cardPerPage;
        state.isLoading = false;

        if (!action.payload.error) {
          if (!state.pagination.count) {
            state.pagination.count = action.payload.info.count;
            state.pagination.pages = Math.ceil(
              action.payload.info.count / state.pagination.cardPerPage
            );
          }

          if (state.pagination.segment) {
            state.result.results = action.payload.results.slice(
              state.pagination.segment * cardPerCurrentPage - cardPerCurrentPage,
              state.pagination.segment * cardPerCurrentPage
            );
          } else {
            state.result.results = action.payload;
          }
        } else {
          state.isError = true;
        }
      });
  },
});

export const {
  setError,
  setNoError,
  setLoading,
  setNoLoading,
  fetchSuccess,
  setApiPage,
  setForcePage,
  setPages,
  firstSetPages,
  setInitialLoading,
  setSegment,
  selectCharacter,
  resetCharacter,
  setSearchBarValue,
  setSortingValue,
} = apiSlice.actions;

export default apiSlice.reducer;
