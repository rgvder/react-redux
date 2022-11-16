import { createContext, FC } from 'react';
import { AppContext, INITIAL_STATE } from '../../models/AppContext';
import useAppReducer from './useAppReducer';
import { AppProps } from '../../models/AppState';

export const Context = createContext<AppContext>({
  state: INITIAL_STATE,
  dispatch: () => INITIAL_STATE,
  getCharacters: () => {},
});

export const ContextProvider: FC<AppProps> = (props) => {
  const { state, dispatchState, getCharacters } = useAppReducer();

  return (
    <Context.Provider
      value={{
        state: state,
        dispatch: dispatchState,
        getCharacters: getCharacters,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
