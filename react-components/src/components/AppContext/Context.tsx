import { createContext, FC } from 'react';
import { AppContext, INITIAL_STATE } from '../../models/AppContext';
import useAppReducer from './useAppReducer';
import { AppProps } from '../../models/AppState.interface';

export const Context = createContext<AppContext>({
  state: INITIAL_STATE,
  dispatch: () => INITIAL_STATE,
  addProposal: () => {},
  filterComponentItems: () => {},
  addApiSearchQuery: () => {},
  selectCharacter: () => {},
  resetCharacter: () => {},
});

export const ContextProvider: FC<AppProps> = (props) => {
  const {
    state,
    dispatchState,
    addProposal,
    filterComponentItems,
    addApiSearchQuery,
    selectCharacter,
    resetCharacter,
  } = useAppReducer();

  return (
    <Context.Provider
      value={{
        state: state,
        dispatch: dispatchState,
        addProposal: addProposal,
        filterComponentItems: filterComponentItems,
        addApiSearchQuery: addApiSearchQuery,
        selectCharacter: selectCharacter,
        resetCharacter: resetCharacter,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
