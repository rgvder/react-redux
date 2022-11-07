import { AppAction, AppState } from './AppState.interface';
import { Dispatch } from 'react';
import { Proposal } from './Proposal.interface';
import items from '../assets/source/items.json';

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
};

export interface AppContext {
  state: AppState;
  dispatch: Dispatch<AppAction>;
  addProposal: (proposal: Proposal) => void;
  filterComponentItems: (query: string) => void;
}
