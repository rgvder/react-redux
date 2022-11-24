import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSorting } from '../../models/api/ApiSorting.enum';
import { ApiState } from '../../models/api/ApiState.interface';
import { Characters } from '../../models/api/Characters.interface';
import { Character } from '../../models/api/Character.interface';
import { API_COUNT } from '../../models/api/ApiConstants';
import { FetchApiArgs } from '../../models/api/FetchApiArgs.interface';

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

export const fetchApi = createAsyncThunk<Characters, FetchApiArgs>(
  'api/fetchApi',
  async (fetchApiArgs: FetchApiArgs) => {
    const cardPerCurrentPage = fetchApiArgs.characterPerPage
      ? fetchApiArgs.characterPerPage
      : fetchApiArgs.cardPerPage || API_COUNT;

    const response = await fetch(fetchApiArgs.url);

    return await response.json().then((result) => {
      if (!result.error) {
        if (fetchApiArgs.segment) {
          const newResults: Character[] = result.results.slice(
            fetchApiArgs.segment * cardPerCurrentPage - cardPerCurrentPage,
            fetchApiArgs.segment * cardPerCurrentPage
          );

          return { ...result, results: newResults };
        }
      }

      return result;
    });
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    selectCharacter(state, action: PayloadAction<Character | null>) {
      state.selectedCharacter = action.payload;
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
      .addCase(fetchApi.fulfilled, (state, action) => {
        const { count } = action.payload.info;

        state.isLoading = false;
        state.pagination.count = count;
        state.pagination.pages = Math.ceil(count / state.pagination.cardPerPage);
        state.result = action.payload;
      });
  },
});

export const {
  setApiPage,
  setForcePage,
  setPages,
  setInitialLoading,
  setSegment,
  selectCharacter,
  setSearchBarValue,
  setSortingValue,
} = apiSlice.actions;

export default apiSlice.reducer;
