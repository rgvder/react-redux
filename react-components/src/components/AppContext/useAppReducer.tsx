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
  addProposal: (proposal: Proposal) => void;
  filterComponentItems: (query: string) => void;
  addApiSearchQuery: (searchQuery: string) => void;
} = () => {
  const appReducer: (currentState: AppState, action: AppAction) => AppState = (
    currentState: AppState,
    action: AppAction
  ) => {
    switch (action.type) {
      case AppActionTypes.SET_COMPONENTS_VALUE:
        return {
          ...currentState,
          componentItems: action.payload as Item[],
        };
      case AppActionTypes.SET_FORM_VALUE:
        return {
          ...currentState,
          form: action.payload as Proposal,
        };
      case AppActionTypes.SET_PROPOSAL:
        return {
          ...currentState,
          proposals: action.payload as Proposal[],
        };
      case AppActionTypes.API_ERROR:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isError: true,
          },
        };
      case AppActionTypes.API_NO_ERROR:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isError: false,
          },
        };
      case AppActionTypes.API_LOADING:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isLoading: true,
          },
        };
      case AppActionTypes.API_NO_LOADING:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            isLoading: false,
          },
        };
      case AppActionTypes.API_FETCH_SUCCESS:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            result: action.payload as Characters,
          },
        };
      case AppActionTypes.API_SELECT_CHARACTER:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            selectedCharacter: action.payload as Character,
          },
        };
      case AppActionTypes.API_RESET_CHARACTER:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            selectedCharacter: null,
          },
        };
      case AppActionTypes.API_SET_SEARCHBAR_VALUE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            apiSearchQuery: action.payload as string,
          },
        };
      case AppActionTypes.API_SET_SORTING_VALUE:
        return {
          ...currentState,
          apiState: {
            ...currentState.apiState,
            sorting: action.payload as apiSorting,
          },
        };
      default:
        return currentState;
    }
  };

  const [state, dispatchState] = useReducer(appReducer, INITIAL_STATE);

  const addProposal = (proposal: Proposal) => {
    dispatchState({
      type: AppActionTypes.SET_PROPOSAL,
      payload: [...state.proposals, { ...proposal, id: state.proposals.length }],
    });
  };

  const filterComponentItems = (query: string) => {
    dispatchState({
      type: AppActionTypes.SET_COMPONENTS_VALUE,
      payload: [
        ...state.componentItems.filter(
          (item: Item) => !query || item.model.toLowerCase().includes(query.toLowerCase())
        ),
      ],
    });
  };

  const addApiSearchQuery = (searchQuery: string) => {
    dispatchState({ type: AppActionTypes.API_SET_SEARCHBAR_VALUE, payload: searchQuery });
  };

  return { state, dispatchState, addProposal, filterComponentItems, addApiSearchQuery };
};

export default useAppReducer;
