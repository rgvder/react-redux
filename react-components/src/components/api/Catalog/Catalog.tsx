import React, { MouseEventHandler, useContext, useEffect } from 'react';
import styles from './Catalog.module.scss';
import Card from '../Card/Card';
import { Character } from '../../../models/Character.interface';
import { BASE_PATH, SEARCH_PATH, SORTING_PATH } from '../../../pages/Api/Api';
import Preloader from '../Preloader/Preloader';
import { Context } from '../../AppContext/Context';
import { AppActionTypes } from '../../../models/AppState.interface';
import ApiInfoPage from '../Modal/ApiInfoPage';
import Sorting from '../Sorting/Sorting';

const Catalog = () => {
  const {
    dispatch,
    state: {
      apiState: { result, isLoading, isError, apiSearchQuery, selectedCharacter, sorting },
    },
  } = useContext(Context);

  const getCharacters = (url: string) => {
    dispatch({ type: AppActionTypes.API_NO_ERROR });
    dispatch({ type: AppActionTypes.API_LOADING });
    fetch(url)
      .then((res: Response) => res.json())
      .then((result) => {
        dispatch({ type: AppActionTypes.API_NO_LOADING });

        if (!result.error) {
          dispatch({ type: AppActionTypes.API_FETCH_SUCCESS, payload: result });
        } else {
          dispatch({ type: AppActionTypes.API_ERROR });
        }
      })
      .catch((error) => error);
  };

  useEffect(() => {
    if (sorting) {
      getCharacters(`${BASE_PATH}${SEARCH_PATH}${apiSearchQuery}${SORTING_PATH}${sorting}`);
    } else {
      getCharacters(`${BASE_PATH}${SEARCH_PATH}${apiSearchQuery}`);
    }
  }, [apiSearchQuery, sorting]);

  const selectCharacter = (character: Character) => {
    dispatch({ type: AppActionTypes.API_SELECT_CHARACTER, payload: character });
  };

  const resetCharacter = () => {
    dispatch({ type: AppActionTypes.API_RESET_CHARACTER });
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const button: HTMLButtonElement = event.target as HTMLButtonElement;

    if (!button.classList.contains('button')) {
      return;
    }

    const prev = result.info.prev;
    const next = result.info.next;

    if (prev && button.classList.contains('prev')) {
      getCharacters(prev);
    }

    if (next && button.classList.contains('next')) {
      getCharacters(next);
    }
  };

  return (
    <>
      <div className={styles.buttons}>
        <button
          className={`button button_basic prev ${styles.button}`}
          onClick={handleClick}
          disabled={!result?.info?.prev || isError || isLoading}
        >
          &#8592;
        </button>
        <button
          className={`button button_basic next ${styles.button}`}
          onClick={handleClick}
          disabled={!result?.info?.next || isError || isLoading}
        >
          &#8594;
        </button>
      </div>

      <Sorting />

      {isError ? (
        <h3 className="header-text">Sorry, the data is not found</h3>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <section className={styles.catalog}>
          {result.results &&
            result.results.map((item: Character) => (
              <Card selectCharacter={selectCharacter} key={item.id} character={item} />
            ))}
          {selectedCharacter && (
            <ApiInfoPage character={selectedCharacter} resetCharacter={resetCharacter} />
          )}
        </section>
      )}
    </>
  );
};

export default Catalog;
