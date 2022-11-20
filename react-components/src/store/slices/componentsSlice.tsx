import { createSlice } from '@reduxjs/toolkit';
import items from '../../assets/source/items.json';

const componentsSlice = createSlice({
  name: 'components',
  initialState: {
    componentItems: items,
  },
  reducers: {
    setComponents(state, action) {
      state.componentItems = action.payload;
    },
  },
});

export const { setComponents } = componentsSlice.actions;

export default componentsSlice.reducer;
