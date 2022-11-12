import { Characters } from './Characters.interface';
import { Character } from './Character.interface';
import { apiSorting } from './ApiSorting.enum';
import { Pagination } from './Pagination.interface';

export interface ApiState {
  apiSearchQuery: string;
  sorting: apiSorting.all | apiSorting.alive | apiSorting.dead | apiSorting.unknown;
  result: Characters;
  pagination: Pagination;
  selectedCharacter: Character | null;
  isLoading: boolean;
  isError: boolean;
}
