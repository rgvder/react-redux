import { AppAction, AppActionTypes, AppState } from '../../models/AppState.interface';
import { Dispatch, useReducer } from 'react';
import { Proposal } from '../../models/Proposal.interface';
import { INITIAL_STATE } from '../../models/AppContext';
import { Item } from '../../models/Item.interface';

const useAppReducer: () => {
  state: AppState;
  dispatchState: Dispatch<AppAction>;
  addProposal: (proposal: Proposal) => void;
  filterComponentItems: (query: string) => void;
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

  return { state, dispatchState, addProposal, filterComponentItems };
};

export default useAppReducer;
