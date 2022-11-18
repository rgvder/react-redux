import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from './slices/componentsSlice';
import { Item } from '../models/Item.interface';

export interface State {
  components: {
    componentItems: Item[];
  };
}

export default configureStore({
  reducer: {
    components: componentsReducer,
  },
});
