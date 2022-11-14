import { AppAction, AppState } from './AppState.interface';
import { Dispatch } from 'react';
import { Proposal } from './Proposal.interface';
import items from '../assets/source/items.json';
import { apiSorting } from './ApiSorting.enum';
import { Character } from './Character.interface';

export const INITIAL_STATE: AppState = {
  componentItems: items,
  proposals: [],
  form: {
    name: '',
    dateOfBirth: '',
    email: '',
    color: [],
    price: '',
    suctionPower: '',
    cleaningType: '',
    deliveryTerm: 'Not mentioned',
    image: '',
  },
  apiState: {
    apiSearchQuery: '',
    sorting: apiSorting.all,
    result: {
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
      results: [],
    },
    pagination: {
      cardPerPage: 20,
      count: 0,
      pages: 0,
      forcePage: 0,
    },
    selectedCharacter: null,
    isLoading: true,
    isError: false,
  },
};

export interface AppContext {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  addProposal: (proposal: Proposal) => void;
  filterComponentItems: (query: string) => void;
  addApiSearchQuery: (searchQuery: string) => void;
  selectCharacter: (character: Character) => void;
  resetCharacter: () => void;
  getCharacters: (url: string, segment?: number) => void;
}
