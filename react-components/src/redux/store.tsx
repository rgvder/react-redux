import { configureStore } from '@reduxjs/toolkit';
import componentsReducer from './slices/componentsSlice';
import formReducer from './slices/formSlice';
import apiReducer from './slices/apiSlice';

// export interface State {
//   components: {
//     componentItems: Item[];
//   };
//   form: {
//     proposals: Proposal[];
//     form: Proposal;
//   };
//   api: ApiState;
// }

const store = configureStore({
  reducer: {
    components: componentsReducer,
    form: formReducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.image'],
        ignoredPaths: ['form.form.image'],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
