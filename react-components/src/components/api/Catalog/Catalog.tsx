import React, { MouseEventHandler, useEffect, useReducer } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import Modal from '../Modal/Modal';
import { actionTypes, CatalogAction, CatalogState } from '../../../models/CatalogState.interface';
import { Character } from '../../../models/Character.interface';
import { Characters } from '../../../models/Characters.interface';
import { BASE_PATH, SEARCH_PATH } from '../../../pages/Api/Api';
import Preloader from '../Preloader/Preloader';

const useCatalog = (props: { searchQuery: string }) => {
  const INITIAL_STATE: CatalogState = {
    searchQuery: props.searchQuery || '',
    result: {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    },
    selectedCharacter: null,
    isLoading: true,
    isError: false,
  };

  const catalogReducer: (currentState: CatalogState, action: CatalogAction) => CatalogState = (
    currentState: CatalogState,
    action: CatalogAction
  ) => {
    switch (action.type) {
      case actionTypes.ERROR:
        return {
          ...currentState,
          isError: true,
        };
      case actionTypes.NO_ERROR:
        return {
          ...currentState,
          isError: false,
        };
      case actionTypes.LOADING:
        return {
          ...currentState,
          isLoading: true,
        };
      case actionTypes.NO_LOADING:
        return {
          ...currentState,
          isLoading: false,
        };
      case actionTypes.FETCH_SUCCESS:
        return {
          ...currentState,
          result: action.payload as Characters,
        };
      case actionTypes.SELECT_CHARACTER:
        return {
          ...currentState,
          selectedCharacter: action.payload as Character,
        };
      case actionTypes.RESET_CHARACTER:
        return {
          ...currentState,
          selectedCharacter: null,
        };
      default:
        return currentState;
    }
  };

  const [state, dispatchState] = useReducer(catalogReducer, INITIAL_STATE);

  const getCharacters = (url: string) => {
    dispatchState({ type: actionTypes.NO_ERROR });
    dispatchState({ type: actionTypes.LOADING });
    fetch(url)
      .then((res: Response) => res.json())
      .then((result) => {
        dispatchState({ type: actionTypes.NO_LOADING });

        if (!result.error) {
          dispatchState({ type: actionTypes.FETCH_SUCCESS, payload: result });
        } else {
          dispatchState({ type: actionTypes.ERROR });
        }
      })
      .catch((error) => error);
  };

  useEffect(() => {
    getCharacters(`${BASE_PATH}${SEARCH_PATH}${props.searchQuery}`);
  }, [props.searchQuery]);

  const selectCharacter = (character: Character) => {
    dispatchState({ type: actionTypes.SELECT_CHARACTER, payload: character });
  };

  const resetCharacter = () => {
    dispatchState({ type: actionTypes.RESET_CHARACTER });
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;

    if (!button.classList.contains('button')) {
      return;
    }

    const prev = state.result.info.prev;
    const next = state.result.info.next;

    if (prev && button.classList.contains('prev')) {
      getCharacters(prev);
    }

    if (next && button.classList.contains('next')) {
      getCharacters(next);
    }
  };

  return { state, handleClick, selectCharacter, resetCharacter };
};

const Catalog = (props: { searchQuery: string }) => {
  const { state, handleClick, selectCharacter, resetCharacter } = useCatalog(props);

  const currentState: Characters = state.result;
  const isLoading: boolean = state.isLoading;
  const isError: boolean = state.isError;

  return (
    <>
      <div className={styles.buttons}>
        <button
          className={`button button_basic prev ${styles.button}`}
          onClick={handleClick}
          disabled={!currentState?.info?.prev || isError || isLoading}
        >
          &#8592;
        </button>
        <button
          className={`button button_basic next ${styles.button}`}
          onClick={handleClick}
          disabled={!currentState?.info?.next || isError || isLoading}
        >
          &#8594;
        </button>
      </div>

      {isError ? (
        <h3 className="header-text">Sorry, the data is not found</h3>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <section className={styles.catalog}>
          {currentState.results &&
            currentState.results.map((item: Character) => (
              <Card selectCharacter={selectCharacter} key={item.id} character={item} />
            ))}
          {state.selectedCharacter && (
            <Modal character={state.selectedCharacter} resetCharacter={resetCharacter} />
          )}
        </section>
      )}
    </>
  );
};

export default Catalog;
