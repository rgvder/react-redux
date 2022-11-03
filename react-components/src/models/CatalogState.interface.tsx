import { Characters } from './Characters.interface';
import { Character } from './Character.interface';

export interface CatalogState {
  searchQuery: string;
  result: Characters;
  selectedCharacter: Character | null;
  isLoading: boolean;
  isError: boolean;
}

export enum actionTypes {
  ERROR = 'ERROR',
  NO_ERROR = 'NO_ERROR',
  LOADING = 'LOADING',
  NO_LOADING = 'NO_LOADING',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  SELECT_CHARACTER = 'SELECT_CHARACTER',
  RESET_CHARACTER = 'RESET_CHARACTER',
}

export interface CatalogAction {
  type: actionTypes;
  payload?: Characters | Character;
}
