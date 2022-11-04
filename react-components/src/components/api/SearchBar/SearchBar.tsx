import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  SyntheticEvent,
  useRef,
  useState,
} from 'react';
import styles from './SearchBar.module.scss';

const useSearchBar = (
  props: { addSearchQuery: (searchQuery: string) => void },
  nameInput: React.RefObject<HTMLInputElement> | null
) => {
  const [value, setValue] = useState<string>('');

  const saveValueHandler: KeyboardEventHandler<HTMLInputElement> = (
    event: SyntheticEvent<HTMLInputElement, KeyboardEvent>
  ) => {
    event.preventDefault();

    if (!nameInput?.current) {
      return;
    }

    if (event.nativeEvent.code === 'Enter') {
      setValue(nameInput.current.value);
      props.addSearchQuery(nameInput.current.value);
    }
  };

  const removeInputValue: MouseEventHandler = () => {
    if (!nameInput || !nameInput.current || !nameInput.current.value) {
      return;
    }

    nameInput.current.value = '';
    setValue('');
    props.addSearchQuery('');
  };

  return { value, saveValueHandler, removeInputValue };
};

const SearchBar = (props: { addSearchQuery: (searchQuery: string) => void }) => {
  const nameInput = useRef(null);
  const { saveValueHandler, removeInputValue } = useSearchBar(props, nameInput);

  return (
    <div className={styles.search}>
      <input
        ref={nameInput}
        onKeyUp={saveValueHandler}
        className={styles['input-text']}
        type="text"
        placeholder="Enter the name of the character..."
        autoComplete="off"
        autoFocus
        data-testid="input"
      />
      <button
        className={styles.button}
        type="button"
        onClick={removeInputValue}
        data-testid="button"
      >
        <svg
          className={styles.icon}
          width="14"
          height="14"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7.99999 6.58578L14.2929 0.292893C14.6834 -0.0976313 15.3166 -0.0976307 15.7071 0.292894C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 7.99999L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L7.99999 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292894 15.7071C-0.0976307 15.3166 -0.0976313 14.6834 0.292893 14.2929L6.58578 7.99999L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
