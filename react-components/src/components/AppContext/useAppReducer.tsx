import { AppAction, AppActionTypes, AppState } from '../../models/AppState.interface';
import { Dispatch, useReducer } from 'react';
import { Proposal } from '../../models/Proposal.interface';
import { INITIAL_STATE } from '../../models/AppContext';
import { Item } from '../../models/Item.interface';
import { Characters } from '../../models/Characters.interface';
import { Character } from '../../models/Character.interface';
import { apiSorting } from '../../models/ApiSorting.enum';

const useAppReducer: () => {
  state: AppState;
  dispatchState: Dispatch<AppAction>;
  getCharacters: (url: string, segment?: number) => void;
} = () => {
  const appReducer: (currentState: AppState, action: AppAction) => AppState = (
    currentState: AppState,
    action: AppAction
  ) => {
    const {
      SET_COMPONENTS_VALUE,
      SET_FORM_VALUE,
      SET_PROPOSAL,
      API_ERROR,
      API_NO_ERROR,
      API_LOADING,
      API_NO_LOADING,
      API_FETCH_SUCCESS,
      API_SELECT_CHARACTER,
      API_RESET_CHARACTER,
      API_SET_SEARCHBAR_VALUE,
      API_SET_PAGES,
      API_FIRST_SET_PAGES,
      API_SET_FORCE_PAGE,
      API_SET_SORTING_VALUE,
      API_SET_SEGMENT,
      API_SET_PAGE,
    } = AppActionTypes;

    switch (action.type) {
      case SET_COMPONENTS_VALUE:
        return {
          ...currentState,
          componentItems: action.payload as Item[],
        };
      case SET_FORM_VALUE:
        return {
          ...currentState,
          form: action.payload as Proposal,
        };
      case SET_PROPOSAL:
        return {
          ...currentState,
          proposals: action.payload as Proposal[],
        };
      case API_ERROR:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isError: true,
          },
        };
      case API_NO_ERROR:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isError: false,
          },
        };
      case API_LOADING:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isLoading: true,
          },
        };
      case API_NO_LOADING:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isLoading: false,
          },
        };
      case API_FETCH_SUCCESS:
        const fetchPayload: Characters = action.payload as Characters;
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            result: fetchPayload,
            pagination: {
              ...currentState.apiState.pagination,
              count: fetchPayload.info.count as number,
              pages: Math.ceil(
                (fetchPayload.info.count as number) / currentState.apiState.pagination.cardPerPage
              ),
            },
          },
        };
      case API_SELECT_CHARACTER:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            selectedCharacter: action.payload as Character,
          },
        };
      case API_RESET_CHARACTER:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            selectedCharacter: null,
          },
        };
      case API_SET_SEARCHBAR_VALUE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            apiSearchQuery: action.payload as string,
            pagination: {
              ...currentState.apiState.pagination,
              forcePage: 0,
            },
          },
        };
      case API_SET_SORTING_VALUE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            sorting: action.payload as apiSorting,
            pagination: {
              ...currentState.apiState.pagination,
              forcePage: 0,
            },
          },
        };
      case API_SET_PAGES:
        const PaginationPayload: number = action.payload as number;

        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            pagination: {
              ...currentState.apiState.pagination,
              cardPerPage: PaginationPayload,
              pages: Math.ceil(currentState.apiState.pagination.count / PaginationPayload),
              forcePage: 0,
            },
          },
        };
      case API_FIRST_SET_PAGES:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            pagination: {
              ...currentState.apiState.pagination,
              count: action.payload as number,
              pages: Math.ceil(
                currentState.apiState.pagination.count /
                  currentState.apiState.pagination.cardPerPage
              ),
            },
          },
        };
      case API_SET_FORCE_PAGE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            pagination: {
              ...currentState.apiState.pagination,
              forcePage: action.payload as number,
            },
          },
        };
      case API_SET_SEGMENT:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            pagination: {
              ...currentState.apiState.pagination,
              segment: action.payload as number,
            },
          },
        };
      case API_SET_PAGE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            pagination: {
              ...currentState.apiState.pagination,
              apiPage: action.payload as number,
            },
          },
        };
      default:
        return currentState;
    }
  };

  const [state, dispatchState] = useReducer(appReducer, INITIAL_STATE);

  const getCharacters = (url: string, segment?: number) => {
    const { count } = state.apiState.pagination;

    dispatchState({ type: AppActionTypes.API_NO_ERROR });
    dispatchState({ type: AppActionTypes.API_LOADING });
    fetch(url)
      .then((res: Response) => res.json())
      .then((result) => {
        dispatchState({ type: AppActionTypes.API_NO_LOADING });

        if (!result.error) {
          if (!count) {
            dispatchState({ type: AppActionTypes.API_FIRST_SET_PAGES, payload: result.info.count });
          }

          if (segment) {
            const { cardPerPage } = state.apiState.pagination;
            const newResults: Character[] = result.results.slice(
              segment * cardPerPage - cardPerPage,
              segment * cardPerPage
            );

            dispatchState({
              type: AppActionTypes.API_FETCH_SUCCESS,
              payload: { ...result, results: newResults },
            });
          } else {
            dispatchState({ type: AppActionTypes.API_FETCH_SUCCESS, payload: result });
          }
        } else {
          dispatchState({ type: AppActionTypes.API_ERROR });
        }
      })
      .catch((error) => error);
  };

  return {
    state,
    dispatchState,
    getCharacters,
  };
};

export default useAppReducer;
