import React, { SyntheticEvent } from 'react';
import styles from './ApiInfoPage.module.scss';
import { Character } from '../../../models/Character.interface';

const ApiInfoPage = (props: { character: Character; resetCharacter: () => void }) => {
  const handleClick = (event: SyntheticEvent) => {
    if ((event.target as HTMLDivElement | HTMLButtonElement).classList.contains('close-modal')) {
      props.resetCharacter();
    }
  };

  const episode: string[] = props.character.episode.map((item: string) =>
    item.replace('https://rickandmortyapi.com/api/episode/', '')
  );

  return (
    <>
      {props.character && (
        <div
          className={`${styles.overlay} close-modal`}
          onClick={handleClick}
          data-testid="overlay"
        >
          <div className={styles.modal} data-testid="modal">
            <button className={`${styles.button} close-modal`} data-testid="button" />
            <div className={styles.content}>
              <div className={styles.main}>
                <img
                  className={styles.image}
                  src={props.character.image}
                  alt={`${props.character.name}`}
                />
                <div className={styles['main__info']}>
                  <h2 className="header-text">{`${props.character.name}`}</h2>
                  <ul className={styles.info}>
                    <li className={styles.list}>
                      <span className="text">Status </span>
                      <span className="text feature-text">{`${props.character.status}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Type </span>
                      <span className="text feature-text">{`${props.character.type || '-'}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Gender </span>
                      <span className="text feature-text">{`${props.character.gender}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Species </span>
                      <span className="text feature-text">{`${props.character.species}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Created</span>
                      <span className="text feature-text">{`${new Date(
                        props.character.created
                      )}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Origin</span>
                      <span className="text feature-text">{`${props.character.origin.name}`}</span>
                    </li>
                    <li className={styles.list}>
                      <span className="text">Location</span>
                      <span className="text feature-text">{`${props.character.location.name}`}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={styles.info}>
                <ul className={styles.info}>
                  <li className={styles.list}>
                    <span className="text">{`${episode.length < 2 ? 'Episode' : 'Episodes'}`}</span>
                    <span className="text feature-text">{`${episode.join(', ')}`}</span>
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
