import React from 'react';
import styles from './ApiInfoPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../redux/store';
import { resetCharacter } from '../../../redux/slices/apiSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';

const ApiInfoPage = () => {
  const dispatch = useAppDispatch();
  const { selectedCharacter } = useAppSelector((state: RootState) => state.api);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
    dispatch(resetCharacter());
  };

  const episode: string[] | undefined = selectedCharacter?.episode.map((item: string) =>
    item.replace('https://rickandmortyapi.com/api/episode/', '')
  );

  return (
    <>
      {selectedCharacter && (
        <div data-testid="overlay">
          <div className={styles.modal} data-testid="modal">
            <button
              className={`button button_basic ${styles.button}`}
              data-testid="button"
              onClick={handleClick}
            >
              Back
            </button>
            <div className={styles.content}>
              <div className={styles.main}>
                <img
                  className={styles.image}
                  src={selectedCharacter.image}
                  alt={`${selectedCharacter.name}`}
                />
                <div className={styles['main__info']}>
                  <h2 className="header-text">{`${selectedCharacter.name}`}</h2>
                  <ul className={styles.info}>
                    <li className={styles.list}>
                      <span className="text">Status </span>
                      <span className="text feature-text">{`${selectedCharacter.status}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Type </span>
                      <span className="text feature-text">{`${
                        selectedCharacter.type || '-'
                      }`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Gender </span>
                      <span className="text feature-text">{`${selectedCharacter.gender}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Species </span>
                      <span className="text feature-text">{`${selectedCharacter.species}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Created</span>
                      <span className="text feature-text">{`${new Date(
                        selectedCharacter.created
                      )}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Origin</span>
                      <span className="text feature-text">{`${selectedCharacter.origin.name}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Location</span>
                      <span className="text feature-text">{`${selectedCharacter.location.name}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.info}>
                <ul className={styles.info}>
                  <li className={styles.list}>
                    <span className="text">{`${
                      episode && episode.length < 2 ? 'Episode' : 'Episodes'
                    }`}</span>
                    <span className="text feature-text">{`${episode?.join(', ')}`}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiInfoPage;
