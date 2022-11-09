import { Proposal } from './Proposal.interface';
import { ReactNode } from 'react';
import { Item } from './Item.interface';
import { ApiState } from './ApiState.interface';
import { Characters } from './Characters.interface';
import { Character } from './Character.interface';
import { apiSorting } from './ApiSorting.enum';

export interface AppState {
  componentItems: Item[];
  proposals: Proposal[];
  form: Proposal;
  apiState: ApiState;
}

export interface AppProps {
  children: ReactNode;
}

export enum AppActionTypes {
  SET_FORM_VALUE = 'SET_FORM_VALUE',
  SET_COMPONENTS_VALUE = 'SET_COMPONENTS_VALUE',
  SET_PROPOSAL = 'SET_PROPOSAL',
  API_ERROR = 'API_ERROR',
  API_NO_ERROR = 'API_NO_ERROR',
  API_LOADING = 'API_LOADING',
  API_NO_LOADING = 'API_NO_LOADING',
  API_FETCH_SUCCESS = 'API_FETCH_SUCCESS',
  API_SELECT_CHARACTER = 'API_SELECT_CHARACTER',
  API_RESET_CHARACTER = 'API_RESET_CHARACTER',
  API_SET_SEARCHBAR_VALUE = 'API_SET_SEARCHBAR_VALUE',
  API_SET_SORTING_VALUE = 'API_SET_SORTING_VALUE',
}

export interface AppAction {
  type: AppActionTypes;
  payload?: Proposal | Proposal[] | Item[] | Characters | Character | string | apiSorting;
}
