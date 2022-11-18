import { createSlice } from '@reduxjs/toolkit';
import items from '../../assets/source/items.json';
import { Item } from '../../models/Item.interface';

const componentsSlice = createSlice({
  name: 'components',
  initialState: {
    componentItems: items,
  },
  reducers: {
    setComponents(state, action) {
      items.filter(
        (item: Item) =>
          !action.payload.value ||
          item.model.toLowerCase().includes(action.payload.value.toLowerCase())
      );
    },
  },
});

export const { setComponents } = componentsSlice.actions;

export default componentsSlice.reducer;
