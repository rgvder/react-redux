import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import items from '../../assets/source/items.json';
import { ComponentsState } from '../../models/ComponentsState.interface';
import { Item } from '../../models/Item.interface';

const initialState: ComponentsState = {
  componentItems: items,
};

const componentsSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setComponents(state, action: PayloadAction<Item[]>) {
      state.componentItems = action.payload;
    },
  },
});

export const { setComponents } = componentsSlice.actions;

export default componentsSlice.reducer;
