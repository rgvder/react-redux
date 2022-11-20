import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'components',
  initialState: {
    proposals: [],
    form: {
      name: '',
      dateOfBirth: '',
      email: '',
      color: [],
      price: '',
      suctionPower: '',
      cleaningType: '',
      deliveryTerm: 'Not mentioned',
      image: '',
    },
  },
  reducers: {
    setFormValue(state, action) {
      state.form = action.payload;
    },
    setProposalValue(state, action) {
      state.proposals = action.payload;
    },
  },
});

export const { setFormValue, setProposalValue } = formSlice.actions;

export default formSlice.reducer;
