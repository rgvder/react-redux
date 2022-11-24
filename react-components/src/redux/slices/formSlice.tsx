import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormState } from '../../models/form/FormState.interface';
import { Proposal } from '../../models/form/Proposal.interface';

const initialState: FormState = {
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
};

const formSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    setFormValue(state, action: PayloadAction<Proposal>) {
      state.form = action.payload;
    },
    setProposalValue(state, action: PayloadAction<Proposal[]>) {
      state.proposals = action.payload;
    },
  },
});

export const { setFormValue, setProposalValue } = formSlice.actions;

export default formSlice.reducer;
