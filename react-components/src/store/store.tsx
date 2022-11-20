import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from './slices/componentsSlice';
import formReducer from './slices/formSlice';
import { Item } from '../models/Item.interface';
import { Proposal } from '../models/Proposal.interface';

export interface State {
  components: {
    componentItems: Item[];
  };
  form: {
    proposals: Proposal[];
    form: Proposal;
  };
}

export default configureStore({
  reducer: {
    components: componentsReducer,
    form: formReducer,
  },
});
