import { Item } from './Item.interface';

export interface ComponentsContext {
  items: Item[];
  filterItems: (query: string) => void;
}
