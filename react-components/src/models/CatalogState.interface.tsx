import { Characters } from './Characters.interface';

export interface CatalogState {
  searchQuery: string;
  result: Characters;
}
