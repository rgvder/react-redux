import { Characters } from './Characters.interface';
import { Character } from './Character.interface';

export interface CatalogState {
  searchQuery: string;
  result: Characters;
  selectedCharacter: Character | null;
  isLoading: boolean;
  isError: boolean;
}
