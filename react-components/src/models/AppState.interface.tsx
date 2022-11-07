import { Proposal } from './Proposal.interface';
import { ReactNode } from 'react';
import { Item } from './Item.interface';

export interface AppState {
  componentItems: Item[];
  proposals: Proposal[];
  form: Proposal;
}

export interface AppProps {
  children: ReactNode;
}

export enum AppActionTypes {
  SET_FORM_VALUE = 'SET_FORM_VALUE',
  SET_COMPONENTS_VALUE = 'SET_COMPONENTS_VALUE',
  SET_PROPOSAL = 'SET_PROPOSAL',
}

export interface AppAction {
  type: AppActionTypes;
  payload?: Proposal | Proposal[] | Item[];
}
